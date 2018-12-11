var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', connector.listen());

var inMemoryStorage = new builder.MemoryBotStorage();

const LuisModelUrl = process.env.LUIS_MODEL_URL ||
    'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/?subscription-key=&spellCheck=true&bing-spell-check-subscription-key=&verbose=true&timezoneOffset=';

var recognizer = new builder.LuisRecognizer(LuisModelUrl);

var regExCheckin = new builder.RegExpRecognizer('Checkin', /^checkin$/i);
var regExAmenities = new builder.RegExpRecognizer('Amenities', /^amenities$/i);
var regExCheckout = new builder.RegExpRecognizer('Checkout', /^checkout$/i);

var intent = new builder.IntentDialog({ recognizers: [regExCheckin,
                                                      regExAmenities,
                                                      regExCheckout,
                                                      recognizer],
                                        recognizeOrder: 'series' })
	  .matches('Checkin',(session,args) => {
		session.beginDialog('main_menu_checkin:/');
    })
    .matches('Amenities',(session,args) => {
		session.beginDialog('main_menu_amenities:/');
    })
    .matches('Checkout',(session,args) => {
		session.beginDialog('main_menu_checkout:/');
    })
    .matches('Feedback',(session,args) => {
		session.beginDialog('main_menu_feedback:/');
	});


var bot = new builder.UniversalBot(connector);

bot.dialog('/', intent).onDefault((session) => {
    //session.send('Sorry, I did not understand you');
    session.beginDialog('welcome');
});

bot.library(require('./dialogs/checkin').createLibrary());
bot.library(require('./dialogs/amenities').createLibrary());
bot.library(require('./dialogs/checkout').createLibrary());
bot.library(require('./dialogs/feedback').createLibrary());

bot.dialog('welcome', [
        function (session) {
            var welcomeCard = new builder.HeroCard(session)
            .title('welcome_title')
            .subtitle('welcome_subtitle')
            .images([
                new builder.CardImage(session)
                    .url('#')
                    .alt('Contoso')
            ])
            .buttons([
                builder.CardAction.imBack(session, 'checkin', 'checkin'),
                builder.CardAction.imBack(session, 'amenities', 'amenities'),
                builder.CardAction.imBack(session, 'checkout', 'checkout')
            ]);

            session.send(new builder.Message(session)
            .addAttachment(welcomeCard));

            session.endDialog();
        }
    ]
);

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id == message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});
