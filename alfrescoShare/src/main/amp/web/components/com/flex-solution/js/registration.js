(function () {
    //todo: rename object
    Alfresco.component.regButton = function (htmlId) {
        Alfresco.component.regButton.superclass.constructor.call(this, "Alfresco.component.regButton", htmlId);

        return this;
    };
    YAHOO.extend(Alfresco.component.regButton, Alfresco.component.Base,
        {

            onReady: function () {
                Alfresco.util.createYUIButton(this, this.id, this.onClick, {type: "button"}, this.id);
            },

            onClick: function () {
                //todo: it will not work. Try 1) logout 2) go by the following link: http://localhost/share/page/repository
                window.location = window.location.pathname + "/createUserPage";
            }
        }
    )
})();

































