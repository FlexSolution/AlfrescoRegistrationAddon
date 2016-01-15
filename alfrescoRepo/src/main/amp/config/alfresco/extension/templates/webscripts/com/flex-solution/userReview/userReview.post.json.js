if (json.get("assoc_frm_groupAssignee_added")) {

    var file;
    var results = search.query({
        query: "PATH:\"/app:company_home/app:dictionary/*\" +@cm\\:name:\"newUserReviewingGroup.txt\""
    });

    if (results.length == 0) {

        //get Data Dictionary
        results = search.query({
            query: "PATH:\"/app:company_home/app:dictionary\""
        });
        file = results[0].createFile("newUserReviewingGroup.txt");
    } else {
        file = results[0];
    }
    file.content = json.get("assoc_frm_groupAssignee_added");
}




