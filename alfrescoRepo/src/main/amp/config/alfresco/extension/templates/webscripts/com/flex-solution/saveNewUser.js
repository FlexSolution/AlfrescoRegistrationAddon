<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

(function register() {

    //get needed props from task form
    var prop_firstName = task.getVariable('fs-forms_firstName');
    var prop_lastName = task.getVariable('fs-forms_lastName');
    var prop_email = task.getVariable('fs-forms_email');
    var prop_isApprove = task.getVariable('fs-newUserRWF_doApprove');
    var prop_rejectReason = task.getVariable('fs-newUser_rejectReason');
    var password = passGenerator.genPass();
    var templateName = (prop_isApprove == true) ? "cm:approved-user.ftl" : "cm:rejected-user.ftl";

    createUser(prop_firstName, prop_lastName, prop_email, password, prop_isApprove, prop_rejectReason);

    //send email
    sendMail(templateName, prepareTemplateProps(prop_firstName, prop_lastName, prop_email, password, prop_rejectReason), prop_email, userhome);
})();

//create new cm:person and set needed aspects and properties
function createUser(prop_firstName, prop_lastName, prop_email, password, prop_isApprove, prop_rejectReason) {

    var newUser = people.createPerson(prop_email, prop_firstName, prop_lastName, prop_email, password, prop_isApprove.booleanValue());

    newUser.addAspect("fs-newUser:newUserAspect");

    newUser.createAssociation(person, "fs-newUser:whoReviewed");

    if (prop_isApprove == false) {
        newUser.addAspect("fs-newUser:newRejectedUserAspect");
        newUser.properties["fs-newUser:rejectReason"] = prop_rejectReason;
    }

    newUser.properties["fs-newUser:answerDate"] = Date.now();

    newUser.save();

    return newUser;
}






