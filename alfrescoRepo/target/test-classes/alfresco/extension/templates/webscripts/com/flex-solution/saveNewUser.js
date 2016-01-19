<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

var firstName = task.getVariable('fs-forms_firstName');
var lastName = task.getVariable('fs-forms_lastName');
var email = task.getVariable('fs-forms_email');
var isApprove = task.getVariable('fs-newUserRWF_doApprove');
var rejectReason = task.getVariable('fs-newUser_rejectReason');
var password = passGenerator.genPass();

(function register() {
    prepareUser();
    var templateXPath;
    if (isApprove == true) {
        templateXPath = "./app:dictionary/app:email_templates/cm:registration-templates/cm:approved-user.ftl";
    } else {
        templateXPath = "./app:dictionary/app:email_templates/cm:registration-templates/cm:rejected-user.ftl";
    }
    sendMail(templateXPath, prepareTemplateProps(firstName, lastName, email, password, rejectReason), email, userhome);
})();

//create new cm:person and set needed aspects and properties
function prepareUser() {
    var currentPerson = people.createPerson(email, firstName, lastName, email, password, isApprove.booleanValue());
    currentPerson.addAspect("fs-newUser:newUserAspect");
    currentPerson.createAssociation(person, "fs-newUser:whoReviewed");
    currentPerson.properties["fs-newUser:answerDate"] = Date.now();
    currentPerson.save();
    if (isApprove == false) {
        currentPerson.addAspect("fs-newUser:newRejectedUserAspect");
        currentPerson.properties["fs-newUser:rejectReason"] = rejectReason;
    }
    currentPerson.save();
}






