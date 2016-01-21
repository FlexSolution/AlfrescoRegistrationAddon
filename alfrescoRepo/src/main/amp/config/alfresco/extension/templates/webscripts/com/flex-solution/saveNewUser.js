<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

(function register() {

    //get needed props from task form
    var prop_firstName = task.getVariable('fs-forms_firstName');
    var prop_lastName = task.getVariable('fs-forms_lastName');
    var prop_email = task.getVariable('fs-forms_email');
    var prop_isApprove = task.getVariable('fs-newUserRWF_doApprove');
    var prop_rejectReason = task.getVariable('fs-newUser_rejectReason');
    var password = passGenerator.genPass();
    var templateName;

    prepareUser(prop_firstName, prop_lastName, prop_email, password, prop_isApprove, prop_rejectReason);

    //choose email template
    prop_isApprove == true ? templateName = "cm:approved-user.ftl" : templateName = "cm:rejected-user.ftl"

    //send email
    sendMail(templateName, prepareTemplateProps(prop_firstName, prop_lastName, prop_email, password, prop_rejectReason), prop_email, userhome);
})();

//create new cm:person and set needed aspects and properties
function prepareUser(prop_firstName, prop_lastName, prop_email, password, prop_isApprove, prop_rejectReason) {
    var currentPerson = people.createPerson(prop_email, prop_firstName, prop_lastName, prop_email, password, prop_isApprove.booleanValue());
    currentPerson.addAspect("fs-newUser:newUserAspect");
    currentPerson.createAssociation(person, "fs-newUser:whoReviewed");
    if (prop_isApprove == false) {
        currentPerson.addAspect("fs-newUser:newRejectedUserAspect");
        currentPerson.properties["fs-newUser:rejectReason"] = prop_rejectReason;
    }
    currentPerson.properties["fs-newUser:answerDate"] = Date.now();
    currentPerson.save();
    return currentPerson;
}






