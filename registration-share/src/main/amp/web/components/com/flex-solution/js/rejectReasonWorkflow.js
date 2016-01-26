(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Selector = YAHOO.util.Selector;

    Alfresco.RejectReason = function (fieldHtmlId) {
        Alfresco.RejectReason.superclass.constructor.call(this, "Alfresco.RejectReason", fieldHtmlId);
        return this;
    };

    YAHOO.extend(Alfresco.RejectReason, Alfresco.component.Base,
        {
            addValidation: function (scope) {

                var when = ["change", "keyup"];

                //add validations
                when.forEach(function (item) {
                    YAHOO.Bubbling.fire("registerValidationHandler",
                        {
                            fieldId: scope.id,
                            handler: Alfresco.forms.validation.mandatory,
                            when: item,
                            message: Alfresco.util.message("mandatory.reject.reason")
                        });
                });
            },


            onApproveChecked: function (layer, args) {
                //checkbox value
                var state = args[1].checked;

                if (!state) {
                    this.addValidation(this);
                    YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get(this.id).parentNode, "display", "block");
                    return;
                }

                //get form-runtime
                var formRuntime = args[1].runtime;

                //get length of form validations
                var index = formRuntime.validations.length;

                //iterate validations and remove textarea validations
                while (index > 0) {
                    index--;
                    if (formRuntime.validations[index].fieldId == this.id) {
                        formRuntime.validations.splice(index, 1);
                    }
                }
                YAHOO.util.Dom.setStyle(YAHOO.util.Dom.get(this.id).parentNode, "display", "none");
            },


            onReady: function () {

                //add or remove validation when approveUserChecked event fired
                YAHOO.Bubbling.on("approveUserChecked", this.onApproveChecked, this);
            }
        }
    );
})();


























