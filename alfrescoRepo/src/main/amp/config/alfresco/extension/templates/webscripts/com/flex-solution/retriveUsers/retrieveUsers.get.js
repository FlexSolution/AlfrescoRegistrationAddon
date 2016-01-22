
(function getRegisteredUsers() {
//pull users with fs:myTaskAspect
    var users = search.query({
        query: "+TYPE: \"cm:person\" AND ASPECT: \"fs-newUser:newUserAspect\"",
        language:"fts-alfresco"
    });
    model.users = users;
})();




