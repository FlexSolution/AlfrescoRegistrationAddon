<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">
<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/sendMail.js">


/**
 * Create new user
 *
 * @param userName - username of user
 * @param firstName - first name of user
 * @param lastName - last name of user
 * @param email - email of user
 * @param password - password
 *
 * @returns ScriptNode of user
 */
function createUser(userName,firstName, lastName, email, password, state) {

    var currentPerson = people.createPerson(userName, firstName,
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
 * @param userName -  username of user
 * @returns ScriptNode of found user
 */
function findUser(userName,email) {
    var user = people.getPerson(userName);

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
 * @param userName - username of new user
 * @param firstName - first name of new user
 * @param lastName - last name of new user
 * @param email - email of new user
 * @param configFile - ScriptNode of config file
 */
function startWorkflow(userName,firstName, lastName, email, configFile) {
    var wFlow = workflow.getDefinitionByName("activiti$newUserReview");
    var wFlowParams = {};
    wFlowParams["initiator"] = person;
    wFlowParams["bpm:groupAssignee"] = search.findNode(configFile.content);
    wFlowParams["bpm:workflowDescription"] = msg.get("workflow.desc");
    wFlowParams["fs-forms:userName"] = userName;
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
    var userName = json.get("prop_fs-forms_userName"),
        email = json.get("prop_fs-forms_email"),
        firstName = json.get("prop_fs-forms_firstName"),
        lastName = json.get("prop_fs-forms_lastName");

    //additional server side form validation
    if (userName == "" || email == "" || firstName == "") {
        sendCallback(400, msg.get("bad.credentials"));
        return;
    }

    var email = email.replaceAll("\\s","");

    //if user not exist
    if (findUser(userName,email) != null) {
        sendCallback(400, msg.get("user.exists"));
        return;
    }

    // generate password
    var password = passGenerator.genPass();

    // get config file
    var configFile = getConfigFile();

    //if reviewing group is present --> start workflow
    if (configFile != null && configFile.content != "") {
        createUser(userName,firstName, lastName, email, password, false)
        startWorkflow(userName,firstName, lastName, email, configFile);
        sendCallback(200, msg.get("success.with.review"));
        return;
    }

        //create new user
    var nodeForMailAction = createUser(userName,firstName, lastName, email, password, true),
        //define template name
        templateName = "cm:approved-user.ftl",
        //define subject
        subject = "Alfresco registration",
        //define email properties
        templateProps = prepareTemplateProps(userName,firstName, lastName, email, password, null, person);

    // send email
    sendMail(templateName, templateProps, email, subject, nodeForMailAction);

    sendCallback(200, msg.get("success.without.review"));
}

// try {
    main();
// } catch (err) {
//     sendCallback(500, msg.get("server.error"));
// }
