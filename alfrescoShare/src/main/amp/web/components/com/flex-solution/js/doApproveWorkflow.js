(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Selector = YAHOO.util.Selector;

    Alfresco.DoApprove = function (fieldHtmlId) {
        Alfresco.DoApprove.superclass.constructor.call(this, "Alfresco.DoApprove", fieldHtmlId);
        return this;
    };

    YAHOO.extend(Alfresco.DoApprove, Alfresco.component.Base,
        {

            onChangeChBox: function (event, variables) {
                YAHOO.Bubbling.fire("approveUserChecked",
                    {
                        checked: variables.checkbox.checked,
                        runtime: variables.runtime
                    });
            },

            onReady: function () {

                var variables =
                {
                    checkbox: YAHOO.util.Dom.get(this.id + "-entry")
                };


                //fire checkbox status event after form-runtime init
                YAHOO.Bubbling.on("afterFormRuntimeInit", function (event, args, scope) {
                    variables.runtime = args[1].runtime;
                    this.onChangeChBox(event, variables)
                }, this);

                YAHOO.util.Event.on(variables.checkbox, "change", this.onChangeChBox, variables);
            }
        }
    );
})();


























