var builder = require('botbuilder');

var lib = new builder.Library('main_menu_checkout');

lib.dialog('/', [
    function (session) {
        session.send("Welcome to the Contoso hotel quick checkout system.");
        session.beginDialog('askForRoomNumber');
    },
    function (session, results) {
        session.dialogData.roomNumber = results.response;

        session.send(`Room number #${session.dialogData.roomNumber} has been successfully checked-out. <br/> Please visit us again soon!`);
        session.endDialog();
    }
]);

lib.dialog('askForRoomNumber', [
    function (session) {
        builder.Prompts.number(session, "Hello! What is your room number?");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

module.exports.createLibrary = function () {
    return lib.clone();
};

