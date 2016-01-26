(function () {
    Alfresco.component.RegistrationButton = function (htmlId) {
        Alfresco.component.RegistrationButton.superclass.constructor.call(this, "Alfresco.component.RegistrationButton", htmlId);

        return this;
    };
    YAHOO.extend(Alfresco.component.RegistrationButton, Alfresco.component.Base,
        {

            onReady: function () {
                Alfresco.util.createYUIButton(this, this.id, this.onClick, {}, this.id);
            },

            onClick: function () {
                window.location = window.location.origin + Alfresco.constants.URL_PAGECONTEXT + "createUserPage";
            }
        }
    )
})();

































