<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">
    <import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

var email = json.get("prop_fs-forms_email");
var firstName = json.get("prop_fs-forms_firstName");
var lastName = json.get("prop_fs-forms_lastName");

        
try {
    function sendCallback(code, message) {
        status.code = code;
        status.message = message;
        status.redirect = true;
    }

    function toRegistrate(password) {

        var currentPerson = people.createPerson(email, firstName,
            lastName, email, password, true);

        currentPerson.addAspect("fs-newUser:newUserAspect");
        currentPerson.properties["fs-newUser:answerDate"] = Date.now();
        currentPerson.save();
        return currentPerson;
    }

    function findUser(email){
        var user = people.getPerson(email);

        if(user == null){
            var existingUsers = search.query({
                query: "+TYPE: \"cm:person\" +@cm\\:email:\"" + email + "\"",
            });
            return existingUsers.length < 1? null:existingUsers[0];
        }else{
            return user;
        }
    };


    function startWorkflow(){
        var wFlow = workflow.getDefinitionByName("activiti$newUserReview");
        var wFlowParams = new Object();
        wFlowParams["initiator"] = people.getPerson("admin");
        wFlowParams["bpm:groupAssignee"] = search.findNode(currentReviewingGroups[0].content);
        wFlowParams["bpm_workflowDescription"] = msg.get("workflow.desc");
        wFlowParams["fs-forms:firstName"] = firstName;
        wFlowParams["fs-forms:lastName"] = lastName;
        wFlowParams["fs-forms:email"] = email;
        wFlow.startWorkflow(workflow.createPackage(), wFlowParams);
    };


    //entry point.
    //additional server side form validation
    if (email == "" || firstName == "" ) {
        sendCallback(400, msg.get("bad.credentials"));
    } else {

        //if user not exist
        if (findUser(email)== null) {
            var currentReviewingGroups = getConfigFile();

            //if reviewing group is present --> start workflow
            if (currentReviewingGroups.length != 0 && currentReviewingGroups[0].content != "") {
                startWorkflow();
                sendCallback(200, msg.get("success.with.review"));
            } else {
                var password = passGenerator.genPass();

                var templateProps = prepareTemplateProps();
                templateXPath = "./app:dictionary/app:email_templates/cm:registration-templates/cm:approved-user.ftl";
                templateProps["username"] = email;
                templateProps["password"] = password;

                var nodeForMailAction = toRegistrate(password);

                sendMail(templateXPath, prepareTemplateProps(firstName, lastName, email, password, null), email, nodeForMailAction);
                sendCallback(200, msg.get("success.without.review"));
            }
        } else {
           sendCallback(400, msg.get("user.exists"));
        }
    }
} catch (err) {
    sendCallback(500, msg.get("server.error"));
}




