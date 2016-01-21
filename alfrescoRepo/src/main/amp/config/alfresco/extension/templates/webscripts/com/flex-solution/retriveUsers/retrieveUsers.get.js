
(function getRegisteredUsers() {
//pull users with fs:myTaskAspect
    var users = search.query({
        query: "+TYPE: \"cm:person\" +ASPECT: \"fs-newUser:newUserAspect\"",
    });
    model.users = users;
})();




