(function () {
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
                // todo: remove /share
                window.location = "/share/page/createUserPage";
            }
        }
    )
})();

































