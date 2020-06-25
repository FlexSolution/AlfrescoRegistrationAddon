/**
 * Send Email
 *
 * @param templateName - template name in xpath format
 * @param templateProps - template properties
 * @param email - email TO
 * @param subject - subgect of email
 * @param nodeForMailAction - any ScriptNode object
 */
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
    try {
        mail.execute(nodeForMailAction ? nodeForMailAction : userhome);
    }catch (err) {
        throw "error.outbound";
    }
}


/**
 * Define main properties for template
 *
 * @param firstName - first name of new user
 * @param lastName - last name of new user
 * @param email - email of new user
 * @param password - password of new user
 * @param rejectReason - reason of reject account
 * @param reviewer - ScriptNode object of reviewer
 * @returns Object of properties for email template
 */
function prepareTemplateProps(userName,firstName, lastName, email, password, rejectReason, reviewer){
    var templateProps = {};
    templateProps["creator"] = {firstname: reviewer.properties["firstName"], lastname: reviewer.properties["lastName"]};
    templateProps["username"] = userName;
    templateProps["password"] = password;
    templateProps["firstname"] = firstName;
    templateProps["lastname"] = lastName;
    templateProps["rejectReason"] = rejectReason;
    return templateProps;
}
