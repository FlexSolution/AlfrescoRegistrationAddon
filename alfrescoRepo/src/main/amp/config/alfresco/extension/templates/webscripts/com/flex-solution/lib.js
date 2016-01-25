function throwConfigEcxeption(){
    throw "Config file exception. Check that you have only one config file newUserReviewingGroup.txt";
}

function getConfigFile() {
    //get all nodes from data dictionary with cm:name == newUserReviewingGroup.txt
    var results =companyhome.childrenByXPath("./app:dictionary/cm:newUserReviewingGroup.txt");
    return results.length == 1? results[0]:results.length == 0? null:throwConfigEcxeption();
}

function createConfigFile() {
    //get Data Dictionary
    //todo: move newUserReviewingGroup.txt into the folder /Data Dictionary/flex-solution.com/Registration Addon
    var results = companyhome.childrenByXPath("./app:dictionary");
    return results[0].createFile("newUserReviewingGroup.txt")
}