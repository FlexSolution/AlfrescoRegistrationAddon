<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">

(function getRevGroup() {
    var file = getConfigFile();

    //if file present, put in to model file content(reviewing group nodeRef)
    model.revGroup = file == null ?  "" :  file.content;
})();


