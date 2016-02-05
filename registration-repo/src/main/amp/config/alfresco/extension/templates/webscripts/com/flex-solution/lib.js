/**
 * Throw config error
 */
function throwConfigEcxeption(){
    throw "Config file exception. Check that you have only one config file newUserReviewingGroup.txt";
}

/**
 * Find config file
 * @returns ScriptNode of config file
 */
function getConfigFile() {
    //get all with cm:name == newUserReviewingGroup.txt
    var results =companyhome.childrenByXPath("./app:dictionary/cm:flex-solution.com/cm:registration_addon/cm:newUserReviewingGroup.txt");
    return results.length == 1? results[0]:results.length == 0? null:throwConfigEcxeption();
}

/**
 * Create config file
 * @returns ScriptNode of config file
 */
function createConfigFile() {
    //get config folder
    var results = companyhome.childrenByXPath("./app:dictionary/cm:flex-solution.com/cm:registration_addon");
    return results[0].createFile("newUserReviewingGroup.txt")
}