var builder = require('botbuilder');

var lib = new builder.Library('main_menu_checkin');

lib.dialog('/', [
    function (session) {
        session.send("Welcome to the Contoso hotel quick checkin system.");
        session.beginDialog('askForCustomerName');
    },
    function (session, results) {
        session.dialogData.customerName = results.response;

        session.send(`${session.dialogData.customerName}, you have successfully checked-in. <br/> Please pick up your keys at the quick serve desk!`);
        session.endDialog();
    }
]);

lib.dialog('askForCustomerName', [
    function (session) {
        builder.Prompts.text(session, "Hello! What is your name?");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

module.exports.createLibrary = function () {
    return lib.clone();
};

