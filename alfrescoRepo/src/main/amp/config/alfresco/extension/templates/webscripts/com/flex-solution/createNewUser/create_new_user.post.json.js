<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">
<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">


function sendCallback(code, message) {
    status.code = code;
    status.message = message;
    status.redirect = true;
};

function toRegistrate(firstName, lastName, email, password) {

    var currentPerson = people.createPerson(email, firstName,
        lastName, email, password, true);

    currentPerson.addAspect("fs-newUser:newUserAspect");
    currentPerson.properties["fs-newUser:answerDate"] = Date.now();
    currentPerson.save();
    return currentPerson;
}

function findUser(email) {
    var user = people.getPerson(email);

    if (user == null) {
        var existingUsers = search.query({
            query: "+TYPE: \"cm:person\" AND @cm\\:email:\"" + email + "\"",
            language:"fts-alfresco"
        });
        return existingUsers.length < 1 ? null : existingUsers[0];
    } else {
        return user;
    }
};


function startWorkflow(firstName, lastName, email, configFile) {
    var wFlow = workflow.getDefinitionByName("activiti$newUserReview");
    var wFlowParams = {};
    wFlowParams["initiator"] = people.getPerson("admin");
    wFlowParams["bpm:groupAssignee"] = search.findNode(configFile.content);
    wFlowParams["bpm:workflowDescription"] = msg.get("workflow.desc");
    wFlowParams["fs-forms:firstName"] = firstName;
    wFlowParams["fs-forms:lastName"] = lastName;
    wFlowParams["fs-forms:email"] = email;
    wFlow.startWorkflow(workflow.createPackage(), wFlowParams);
};


function main() {
    var email = json.get("prop_fs-forms_email");
    var firstName = json.get("prop_fs-forms_firstName");
    var lastName = json.get("prop_fs-forms_lastName");

    //additional server side form validation
    if (email == "" || firstName == "") {
        sendCallback(400, msg.get("bad.credentials"));
        return;
    }

    //if user not exist
    if (findUser(email) != null) {
        sendCallback(400, msg.get("user.exists"));
        return;
    }

    var configFile = getConfigFile();

    //if reviewing group is present --> start workflow
    if (configFile != null && configFile.content != "") {
        startWorkflow(firstName, lastName, email, configFile);
        sendCallback(200, msg.get("success.with.review"));
        return;
    }
    
    var password = passGenerator.genPass();
    var templateProps = prepareTemplateProps();
    var templateName = "cm:approved-user.ftl";
    var nodeForMailAction = toRegistrate(firstName, lastName, email, password);
    
    templateProps["username"] = email;
    templateProps["password"] = password;

    sendMail(templateName, prepareTemplateProps(firstName, lastName, email, password, null), email, nodeForMailAction);
    sendCallback(200, msg.get("success.without.review"));
}

try {
    //entry point.
    main();
} catch (err) {
    sendCallback(500, msg.get("server.error"));
}
