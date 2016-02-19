
(function getRegisteredUsers() {
//pull users with fs-newUser:newUserAspect
    model.users = search.query({
        query: "TYPE: \"cm:person\" AND =ASPECT: \"fs-newUser:newUserAspect\"",
        language:"fts-alfresco"
    });
})();
