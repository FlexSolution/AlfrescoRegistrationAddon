var results;
//get all nodes from data dictionary with cm:name == myData.txt
function getConfigFile() {

    results = companyhome.childrenByXPath("./app:dictionary/cm:newUserReviewingGroup.txt");
    return results;
}