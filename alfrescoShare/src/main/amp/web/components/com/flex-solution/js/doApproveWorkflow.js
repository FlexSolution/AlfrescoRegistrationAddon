(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Selector = YAHOO.util.Selector;

    Alfresco.doApprove = function (fieldHtmlId) {
        Alfresco.doApprove.superclass.constructor.call(this, "Alfresco.doApprove", fieldHtmlId);
        return this;
    };

    YAHOO.extend(Alfresco.doApprove, Alfresco.component.Base,
        {
            onReady: function () {
                var checkbox = YAHOO.util.Dom.get(this.id + "-entry");

                //fire checkbox status event after form-runtime init
                YAHOO.Bubbling.on("afterFormRuntimeInit", onChangeChBox);

                function onChangeChBox(){
                    YAHOO.Bubbling.fire("approveUserChecked",
                        {
                            checked: checkbox.checked
                        });
                };

                YAHOO.util.Event.on(checkbox, "change", onChangeChBox);


            }
        }
    );
})();


























