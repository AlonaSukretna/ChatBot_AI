var builder = require('botbuilder');

var lib = new builder.Library('main_menu_feedback');

lib.dialog('/', [
    function (session) {
        session.send("Welcome to the Contoso hotel quick feedback system.");
        session.beginDialog('askForFeedback');
    }
]);

lib.dialog('askForFeedback', [
    function (session) {
        session.send("We hope you had a great experience with us today.");
        session.endDialog();
    }
]);

module.exports.createLibrary = function () {
    return lib.clone();
};

