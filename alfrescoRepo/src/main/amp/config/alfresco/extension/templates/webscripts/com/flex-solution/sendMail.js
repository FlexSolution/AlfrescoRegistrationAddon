
function sendMail(message, email, nodeForMailAction) {
    var mail = actions.create("mail");
    mail.parameters.to = email;
    mail.parameters.subject = "Flex-solution Alfresco registration";
    mail.parameters.text = message;
    mail.execute(nodeForMailAction);
}
