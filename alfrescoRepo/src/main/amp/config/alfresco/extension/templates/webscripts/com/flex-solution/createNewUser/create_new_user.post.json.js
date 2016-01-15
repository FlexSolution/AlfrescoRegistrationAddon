<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/extractReviewingGroups.js">
    <import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

var email = json.get("prop_frm_email");
var firstName = json.get("prop_frm_firstName");
var lastName = json.get("prop_frm_lastName");

        
try {
    function success(message) {
        status.code = 200;
        status.message = message;
        status.redirect = true;
    }

    function toRegistrate(password) {

        var currentPerson = people.createPerson(email, firstName,
            lastName, email, password, true);

        currentPerson.addAspect("fs:newUserAspect");
        currentPerson.properties["fs:answerDate"] = Date.now();
        currentPerson.save();
        return currentPerson;
    }


    //entry point.
    //additional server side form validation
    if (email == "" || firstName == "" ) {
        status.code = 400;
        status.message = "Bad credentials";
        status.redirect = true;
    } else {
        //if user not exist
        var existingUsers = search.query({
            query: "+TYPE: \"cm:person\" +@cm\\:email:\"" + email + "\" OR @cm\\:userName:\"" + email + "\"",
        });
        debugger;
        if (existingUsers.length == 0) {
            var currentReviewingGroups = extractReviewingGroups();

            //if reviewing group is present --> start workflow
            debugger;
            if (currentReviewingGroups.length != 0 && currentReviewingGroups[0].content != "") {
                var wFlow = workflow.getDefinitionByName("activiti$newUserReview");
                var wFlowParams = new Object();
                wFlowParams["initiator"] = people.getPerson("admin");
                wFlowParams["bpm:groupAssignee"] = search.findNode(currentReviewingGroups[0].content);
                wFlowParams["bpm_workflowDescription"] = "The new user requires review";
                wFlowParams["frm:firstName"] = firstName;
                wFlowParams["frm:lastName"] = lastName;
                wFlowParams["frm:email"] = email;
                wFlow.startWorkflow(workflow.createPackage(), wFlowParams);
                success("Success!. You will be notified by e-mail after account validation");
            } else {
                var password = passGenerator.genPass();
                var message = "Your login " + email + " and password " + password
                var nodeForMailAction = toRegistrate(password);
                sendMail(message, email, nodeForMailAction);
                success("Registration completed successfully. Credentials sent on e-mail");
            }
        } else {
            status.code = 400;
            status.message = "User exists already";
            status.redirect = true;
        }
    }
} catch (err) {
    status.code = 500;
    status.message = "Sorry. Internal error. Please, notify your administrator"
}




