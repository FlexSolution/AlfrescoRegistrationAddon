(function isRegUsersDahsletAvailable() {
    var connector = remote.connect("alfresco");
    var jsonObject = "{\"userName\": \"" + user.name + "\"}";
    var data = connector.post("/com/flex-solution/dashletAvailability", jsonObject, "application/json");
    if (data == "false") {
        var dashletIndex;
        for (var index = 0; index < model.availableDashlets.length; index++) {
            if (model.availableDashlets[index].shortName.equals("Registered users")) {
                dashletIndex = index;
                break;
            }
        }
        model.availableDashlets.splice(dashletIndex, 1);
    }
})();







