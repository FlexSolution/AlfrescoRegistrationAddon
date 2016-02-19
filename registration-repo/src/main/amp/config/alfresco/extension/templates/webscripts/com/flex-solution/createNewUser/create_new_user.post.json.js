<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">
<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">

/**
 * Used to configure response
 *
 * @param code - HTTP code
 * @param message - response message
 */
function sendCallback(code, message) {
    status.code = code;
    status.message = message;
    status.redirect = true;
};

/**
 * Create new user
 *
 * @param firstName - first name of user
 * @param lastName - last name of user
 * @param email - email of user
 * @param password - password
 *
 * @returns ScriptNode of user
 */
function createUser(firstName, lastName, email, password, state) {

    var currentPerson = people.createPerson(email, firstName,
        lastName, email, password, state);

    currentPerson.addAspect("fs-newUser:newUserAspect");
    if(state == true){
        currentPerson.properties["fs-newUser:answerDate"] = Date.now();
    }
    currentPerson.save();
    return currentPerson;
}

/**
 * Find user by email or userName
 *
 * @param email - email or username of user
 * @returns ScriptNode of found user
 */
function findUser(email) {
    var user = people.getPerson(email);

    if (user == null) {
        var existingUsers = search.query({
            query: "TYPE:\"cm:person\" AND =cm:email:" + email,
            language:"fts-alfresco"
        });
        return existingUsers.length < 1 ? null : existingUsers[0];
    } else {
        return user;
    }
};

/**
 * Start Workflow
 *
 * @param firstName - first name of new user
 * @param lastName - last name of new user
 * @param email - email of new user
 * @param configFile - ScriptNode of config file
 */
function startWorkflow(firstName, lastName, email, configFile) {
    var wFlow = workflow.getDefinitionByName("activiti$newUserReview");
    var wFlowParams = {};
    wFlowParams["initiator"] = person;
    wFlowParams["bpm:groupAssignee"] = search.findNode(configFile.content);
    wFlowParams["bpm:workflowDescription"] = msg.get("workflow.desc");
    wFlowParams["fs-forms:firstName"] = firstName;
    wFlowParams["fs-forms:lastName"] = lastName;
    wFlowParams["fs-forms:email"] = email;
    wFlow.startWorkflow(workflow.createPackage(), wFlowParams);
};

/**
 * Main function
 */
function main() {
    // get properties from json
    var email = json.get("prop_fs-forms_email"),
        firstName = json.get("prop_fs-forms_firstName"),
        lastName = json.get("prop_fs-forms_lastName");

    //additional server side form validation
    if (email == "" || firstName == "") {
        sendCallback(400, msg.get("bad.credentials"));
        return;
    }
    debugger;

    var email = email.replaceAll("\\s","");

    //if user not exist
    if (findUser(email) != null) {
        sendCallback(400, msg.get("user.exists"));
        return;
    }

    // generate password
    var password = passGenerator.genPass();

    // get config file
    var configFile = getConfigFile();

    //if reviewing group is present --> start workflow
    if (configFile != null && configFile.content != "") {
        createUser(firstName, lastName, email, password, false)
        startWorkflow(firstName, lastName, email, configFile);
        sendCallback(200, msg.get("success.with.review"));
        return;
    }

        //create new user
    var nodeForMailAction = createUser(firstName, lastName, email, password, true),
        //define template name
        templateName = "cm:approved-user.ftl",
        //define subject
        subject = "Alfresco registration",
        //define email properties
        templateProps = prepareTemplateProps(firstName, lastName, email, password, null, person);

    // send email
    sendMail(templateName, templateProps, email, subject, nodeForMailAction);

    sendCallback(200, msg.get("success.without.review"));
}

try {
    main();
} catch (err) {
    sendCallback(500, msg.get("server.error"));
}
