<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

var firstName = task.getVariable('frm_firstName');
var lastName = task.getVariable('frm_lastName');
var email = task.getVariable('frm_email');
var isApprove = task.getVariable('fswf_doApprove');
var rejectReason = task.getVariable('fs_rejectReason');
var message;
var password = passGenerator.genPass();



(function register() {
    prepareUser();
    if (isApprove == true) {
        message = "Welcome to Alfresco. Your login " + email + " and password " + password;
        sendMail(message, email, userhome);
    } else {
        message = "Sorry. Administrator did not pass yor account";
        sendMail(message, email, userhome);
    }
})();

function prepareUser() {
    var currentPerson = people.createPerson(email, firstName, lastName, email, password, isApprove.booleanValue());
    currentPerson.addAspect("fs:newUserAspect");
    currentPerson.createAssociation(person, "fs:whoReviewed");
    currentPerson.properties["fs:answerDate"] = Date.now();
    currentPerson.save();
    if (isApprove == false) {
        currentPerson.addAspect("fs:newRejectedUserAspect");
        currentPerson.properties["fs:rejectReason"] = rejectReason;
    }
    execution.setVariable('password', password);
    currentPerson.save();
}




