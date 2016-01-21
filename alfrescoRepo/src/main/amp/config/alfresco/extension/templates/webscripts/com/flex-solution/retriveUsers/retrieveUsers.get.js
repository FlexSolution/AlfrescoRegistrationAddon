
(function getRegisteredUsers() {
//pull users with fs:myTaskAspect
    model.users = search.query({
        query: "+TYPE: \"cm:person\" +ASPECT: \"fs-newUser:newUserAspect\""
    });
})();




