<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">


(function getRevGroup() {
    var file = getConfigFile();
    if (file == null) {
        file = createConfigFile();
    };
    file.content = json.get("assoc_fs-forms_groupAssignee_added");
})()





