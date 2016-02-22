<import resource="classpath:alfresco/extension/templates/webscripts/com/flex-solution/lib.js">

function getGroupUsers(){
    var currentGruop = search.findNode(json.get("group"));
    if(currentGruop == null){
        sendCallback(400, msg.get("bad.request"));
        return;
    }
    model.usersNumber = people.getMembers(currentGruop).length;
}

try{
    getGroupUsers();
}catch(err){
    sendCallback(500, msg.get("server.error"))
}