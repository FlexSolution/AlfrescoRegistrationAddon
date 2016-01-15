YUIEvent.onContentReady("but", function () {
    var onClickBut = function () {
        window.location = "/share/page/createUserPage";
    };

    var button = new YAHOO.widget.Button("but", {
        type: "button",
        disabled: false,
        usearia: true
    });
    YAHOO.util.Event.on("but", "click", onClickBut);
}, this);





