<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">

(function () {

    // get config file
    var file = getConfigFile();
    if (file == null) {
        //create config file
        file = createConfigFile();
    }

    // put name of reviewers group into content of config file
    file.content = json.get("assoc_fs-forms_groupAssignee_added");
})();





