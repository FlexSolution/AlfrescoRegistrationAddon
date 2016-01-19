<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">


    getConfigFile();

if (results.length == 0) {
    model.revGroup = "";
} else {
    //if file present, put in to model file content(reviewing group nodeRef)
    model.revGroup = results[0].content;
}
