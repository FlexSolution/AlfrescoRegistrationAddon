function checkUserMembership() {
    var adminGroup = groups.getGroup("ALFRESCO_ADMINISTRATORS");
    var users = adminGroup.getAllUsers();
    for (var index = 0; index < users.length; index++) {
        if (users[index].userName.equals(json.get("userName"))) {
            return true;
        }
    }
    return false;
}
model.availability = checkUserMembership();