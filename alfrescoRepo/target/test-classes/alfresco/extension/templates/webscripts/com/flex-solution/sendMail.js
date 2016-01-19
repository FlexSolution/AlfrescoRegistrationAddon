
function sendMail(templateXPath, templateProps, email, nodeForMailAction) {
    var children = companyhome.childrenByXPath(templateXPath);
    var mail = actions.create("mail");
    mail.parameters.to = email;
    mail.parameters.subject = "Alfresco registration";
    if(children.length == 1){
        mail.parameters.template = children[0]
    }else{
        throw "Template exception";
    }
    mail.parameters.template_model= templateProps;
    mail.execute(nodeForMailAction);
}

function prepareTemplateProps(firstName, lastName, email, password, rejectReason){
    debugger;
    var templateProps = new Object();
    templateProps["firstname"] = firstName;
    templateProps["creator"] = {firstname: person.properties["firstName"], lastname: person.properties["lastName"]};
    //templateProps["shareUrl"] = url.server.replaceAll(":8080", "") + "/share";
    templateProps["username"] = email;
    templateProps["password"] = password;
    templateProps["firstname"] = firstName;
    templateProps["lastname"] = lastName;
    templateProps["rejectReason"] = rejectReason;
    return templateProps;
}
