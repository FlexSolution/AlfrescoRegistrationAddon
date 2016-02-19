<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

var register = function() {

    //get needed props from task form
    var prop_firstName = task.getVariable('fs-forms_firstName');
    var prop_lastName = task.getVariable('fs-forms_lastName');
    var prop_email = task.getVariable('fs-forms_email');
    var prop_isApprove = task.getVariable('fs-newUserRWF_doApprove');
    var prop_rejectReason = task.getVariable('fs-newUser_rejectReason');
    var password = passGenerator.genPass();
    var templateName = (prop_isApprove == true) ? "cm:approved-user.ftl" : "cm:rejected-user.ftl";
    var subject = "Alfresco registration";
    var reviewer = person;

    afterPropertiesSet(prop_email, password, prop_isApprove, prop_rejectReason, reviewer);

    //debugger;
    //send email
    sendMail(templateName, prepareTemplateProps(prop_firstName, prop_lastName, prop_email, password, prop_rejectReason, reviewer), prop_email, subject, reviewer);
};

// set needed aspects and properties
function afterPropertiesSet(prop_email, password, prop_isApprove, prop_rejectReason, reviewer) {

    var newUser = people.getPerson(prop_email);

    newUser.createAssociation(reviewer, "fs-newUser:whoReviewed");

    if (prop_isApprove == false) {
        newUser.addAspect("fs-newUser:newRejectedUserAspect");
        newUser.properties["fs-newUser:rejectReason"] = prop_rejectReason;
    }else{
        people.enableAccount(prop_email);
    }

    newUser.properties["fs-newUser:answerDate"] = Date.now();
    newUser.save();
    people.setPassword(prop_email, password);

    return newUser;
}

function getAssignees() {
    var members = people.getMembers(bpm_groupAssignee);

    if(workflow.maxGroupReviewers > 0 && members.length > workflow.maxGroupReviewers)
    {
        throw new Error("Number of reviewers exceeds the maximum: " + members.length + "(max is " + workflow.maxGroupReviewers + ")");
    }
    var memberNames = new java.util.ArrayList();

    for(var i in members)
    {
        memberNames.add(members[i].properties.userName);
    }

    return memberNames;
}

function StartWorkflow() {
    execution.setVariable('wf_groupMembers', getAssignees());
}

function ReviewTaskCreate() {

    var assigneeProps = people.getPerson(task.assignee).properties;

    var templateProps = {
        firstName: assigneeProps.firstName,
        email: execution.getVariable('fs-forms_email'),
        newFirstName: execution.getVariable('fs-forms_firstName'),
        newLastName: execution.getVariable('fs-forms_lastName'),
        workflowId:  task.id
    };

    sendMail("cm:for-reviewers.ftl", templateProps, assigneeProps.email, "Review New User", person);
}

function ReviewTaskComplete() {
    sudo.su(register);
}





