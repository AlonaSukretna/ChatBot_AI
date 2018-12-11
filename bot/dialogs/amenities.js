var builder = require('botbuilder');

var lib = new builder.Library('main_menu_amenities');

lib.dialog('/', [
    function (session) {
        session.send("Welcome to the Contoso hotel quick service system.");
        session.beginDialog('askForAmenityOption');
    }
]);

lib.dialog('askForAmenityOption', function (session) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)
    msg.attachments([
        new builder.HeroCard(session)
            .title("Room Service")
            .subtitle("- Room Service -")
            .text("-- Room Service --")
            .images([builder.CardImage.create(session, '#')])
            .buttons([
                builder.CardAction.imBack(session, "room service option", "Select")
            ]),
        new builder.HeroCard(session)
            .title("Spa Treatment")
            .subtitle("- Spa Treatment -")
            .text("-- Spa Treatment --")
            .images([builder.CardImage.create(session, '#')])
            .buttons([
                builder.CardAction.imBack(session, "spa treatment option", "Select")
            ])
    ]);
    session.send(msg).endDialog();
});

lib.dialog('selectAmenityOption', [
    function (session, args) {
        session.send(`You have successfully selected ${args.intent.matched[0]}. <br/> Enjoy your stay!`);
        session.endDialog();
    }
])
.triggerAction({ 
    matches: /.*option/i 
});

module.exports.createLibrary = function () {
    return lib.clone();
};

