const TEMPLATES_PATH = "./app:dictionary/app:email_templates/cm:registration-templates/";

function sendMail(templateName, templateProps, email, nodeForMailAction) {

    var xpath = TEMPLATES_PATH + templateName;
    var children = companyhome.childrenByXPath(xpath);

    var mail = actions.create("mail");
    //todo: move "to" and "subject" after "if"
    mail.parameters.to = email;
    //todo: do you use the same subject for all emails?
    mail.parameters.subject = "Alfresco registration";
    if(children.length == 1){
        mail.parameters.template = children[0]
    }else{
        throw "Template doesn't exist by the following xpath: " + xpath;
    }
    mail.parameters.template_model= templateProps;
    mail.execute(nodeForMailAction);
}

function prepareTemplateProps(firstName, lastName, email, password, rejectReason){
    var templateProps = {};
    //todo: firstName is used twice
    templateProps["firstname"] = firstName;
    templateProps["creator"] = {firstname: person.properties["firstName"], lastname: person.properties["lastName"]};
    templateProps["username"] = email;
    templateProps["password"] = password;
    templateProps["firstname"] = firstName;
    templateProps["lastname"] = lastName;
    templateProps["rejectReason"] = rejectReason;
    return templateProps;
}
