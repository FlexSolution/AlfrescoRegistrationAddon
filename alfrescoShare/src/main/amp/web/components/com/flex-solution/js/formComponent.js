(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Selector = YAHOO.util.Selector;

    Alfresco.component.CreateUser = function (htmlId) {
        Alfresco.component.CreateUser.superclass.constructor.call(this, "Alfresco.component.CreateUser", htmlId);

        return this;
    };

    YAHOO.extend(Alfresco.component.CreateUser, Alfresco.component.Base,
        {
            onReady: function () {

                //create form-runtime
                new Alfresco.FormUI(this.id + "-form", this.id).setOptions(
                    {
                        mode: "create",
                        enctype: "",
                        fields: [
                            {
                                id: "prop_frm_lastName"
                            }
                            ,
                            {
                                id: "prop_frm_email"
                            }
                            ,
                            {
                                id: "prop_frm_firstName"
                            }

                        ],
                        fieldConstraints: [
                            {
                                fieldId: this.id + "_prop_frm_email",
                                handler: Alfresco.forms.validation.mandatory,
                                params: {},
                                event: "keyup,change",
                                message: "The value cannot be empty."
                            }
                            ,
                            {
                                fieldId: this.id + "_prop_frm_email",
                                handler: Alfresco.forms.validation.repoRegexMatch,
                                params: {
                                    "requiresMatch": true,
                                    "expression": "^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$"
                                },
                                event: "keyup",
                                message: "Value contains illegal characters."
                            }
                            ,
                            {
                                fieldId: this.id + "_prop_frm_firstName",
                                handler: Alfresco.forms.validation.mandatory,
                                params: {},
                                event: "keyup,change",
                                message: "The value cannot be empty."
                            }

                        ],
                        disableSubmitButton: false
                    });


                //get form-runtime
                var myForm = new Alfresco.forms.Form(this.id + "-form");

                //submit button id
                var okButton = this.id + "-form-submit";


                //add validation on form fields
                myForm.addValidation(this.id + "_prop_frm_firstName", Alfresco.forms.validation.mandatory);
                myForm.addValidation(this.id + "_prop_frm_email", Alfresco.forms.validation.mandatory);
                myForm.addValidation(this.id + "_prop_frm_email", Alfresco.forms.validation.repoRegexMatch,
                    {
                        "requiresMatch": true,
                        "expression": "^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$"
                    });
                myForm.setValidateAllOnSubmit(true);
                myForm.setSubmitElements(okButton);
                myForm.setSubmitAsJSON(true);
                myForm.setAJAXSubmit(true,

                    {
                        successCallback: {
                            fn: function (obj) {

                                if (obj.json.status.code == 200) {

                                    //redirect to home page on success
                                    function onClickBut() {
                                        window.location = "/share";
                                    }

                                    Alfresco.util.PopupManager.displayPrompt({
                                        text: obj.json.message,
                                        buttons: [{text: "Yes", handler: onClickBut, isDefault: true}]
                                    });
                                }

                            },
                            scope: this
                        },

                        failureCallback: {
                            fn: function (obj) {
                                if (obj.json.status.code == 400) {
                                    Alfresco.util.PopupManager.displayMessage({
                                        text: obj.json.message,
                                        displayTime: 5
                                    });
                                } else
                                    Alfresco.util.PopupManager.displayPrompt({
                                        text: obj.json.message
                                    })
                            },
                            scope: this
                        }
                    });

                myForm.init();


            }
        }
    )
})();


























