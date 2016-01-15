
//pull users with fs:myTaskAspect

var users = search.query({
    query: "+TYPE: \"cm:person\" +ASPECT: \"fs:newUserAspect\"",
    //store: string,
    //language: string,
    //sort: [{
    //    column: "@{http://www.alfresco.org/model/content/1.0}firstName",
    //    ascending: true
    //}]
});
model.users = users;




