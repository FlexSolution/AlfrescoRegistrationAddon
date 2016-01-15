(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Selector = YAHOO.util.Selector;

    Alfresco.rejectedReason = function (fieldHtmlId) {
        Alfresco.rejectedReason.superclass.constructor.call(this, "Alfresco.rejectedReason", fieldHtmlId);
        return this;
    };

    YAHOO.extend(Alfresco.rejectedReason, Alfresco.component.Base,
        {
            onReady: function () {
                var textareaId = this.id;

                function addValidation() {
                    //add onChange validation
                    var when = "change";
                    for (var i = 0; i < 2; i++) {
                        YAHOO.Bubbling.fire("registerValidationHandler",
                            {
                                fieldId: textareaId,
                                handler: Alfresco.forms.validation.mandatory,
                                when: when,
                                message: "Please, populate reject reason field"
                            });
                        //onKeyup validation
                        when = "keyup";
                    }
                };

                //add or remove validation when approveUserChecked event fired
                YAHOO.Bubbling.on("approveUserChecked", function (layer, args) {
                    //checkbox value
                    var state = args[1].checked;
                    if (!state) {
                        addValidation();
                        YAHOO.util.Dom.get(textareaId).parentNode.style.display = "block";
                    } else {
                        //get form-runtime
                        var thisFormRuntime = Alfresco.util.ComponentManager.findFirst("Alfresco.FormUI").formsRuntime;

                        //get length of form validations
                        var index = thisFormRuntime.validations.length;

                        //iterate validations and remove textarea validations
                        while (index > 0) {
                            index--;
                            if (thisFormRuntime.validations[index].fieldId == textareaId) {
                                thisFormRuntime.validations.splice(index, 1);
                            }
                        }
                        YAHOO.util.Dom.get(textareaId).parentNode.style.display = "none";
                    }
                });


                //YAHOO.Bubbling.on("afterFormRuntimeInit", addValidation);
            }
        }
    );
})();


























