function sendMail(templateName, templateProps, email, subject, nodeForMailAction) {
    var TEMPLATES_PATH = "./app:dictionary/app:email_templates/cm:registration-templates/";
    var xpath = TEMPLATES_PATH + templateName;
    var children = companyhome.childrenByXPath(xpath);
    var mail = actions.create("mail");

    if(children.length != 1){
        throw "Template doesn't exist by the following xpath: " + xpath;
    }
    mail.parameters.template = children[0];
    mail.parameters.to = email;
    mail.parameters.subject = subject ? subject : "Alfresco registration";
    mail.parameters.template_model= templateProps;
    mail.execute(nodeForMailAction ? nodeForMailAction : userhome);
}

function prepareTemplateProps(firstName, lastName, email, password, rejectReason, reviewer){
    var templateProps = {};
    templateProps["creator"] = {firstname: reviewer.properties["firstName"], lastname: reviewer.properties["lastName"]};
    templateProps["username"] = email;
    templateProps["password"] = password;
    templateProps["firstname"] = firstName;
    templateProps["lastname"] = lastName;
    templateProps["rejectReason"] = rejectReason;
    return templateProps;
}
