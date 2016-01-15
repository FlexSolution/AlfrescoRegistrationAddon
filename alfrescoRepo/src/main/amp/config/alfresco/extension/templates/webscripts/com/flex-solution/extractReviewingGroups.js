var results;
//get all nodes from data dictionary with cm:name == myData.txt
function extractReviewingGroups() {
    results = search.query({
        query: "PATH:\"/app:company_home/app:dictionary/*\" +@cm\\:name:\"newUserReviewingGroup.txt\""
    });
    return results;
}