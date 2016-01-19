<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">

    var file;

    getConfigFile();
    if (results.length == 0) {

        //get Data Dictionary
        results = companyhome.childrenByXPath("./app:dictionary");
        file = results[0].createFile("newUserReviewingGroup.txt");
    } else {
        file = results[0];
    }
    file.content = json.get("assoc_fs-forms_groupAssignee_added");




