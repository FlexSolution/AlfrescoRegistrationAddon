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

            onComponentsLoaded: function () {

                var form = new Alfresco.FormUI(this.id + "-form", this.id).setOptions(
                    {
                        mode: "create",
                        enctype: "",
                        fields: [
                            {
                                id: "prop_fs-forms_lastName"
                            }
                            ,
                            {
                                id: "prop_fs-forms_email"
                            }
                            ,
                            {
                                id: "prop_fs-forms_firstName"
                            }

                        ],
                        fieldConstraints: [
                            {
                                fieldId: this.id + "_prop_fs-forms_email",
                                handler: Alfresco.forms.validation.mandatory,
                                params: {},
                                event: "change",
                                message: Alfresco.util.message("form.field.mandatory")
                            }
                            ,
                            {
                                fieldId: this.id + "_prop_fs-forms_email",
                                handler: Alfresco.forms.validation.repoRegexMatch,
                                params: {
                                    "requiresMatch": true,
                                    "expression": "^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+)*)\\.([A-Za-z]{2,})$"
                                },
                                event: "change,mouseover",
                                message: Alfresco.util.message("form.field.regex")
                            }
                            ,
                            {
                                fieldId: this.id + "_prop_fs-forms_firstName",
                                handler: Alfresco.forms.validation.mandatory,
                                params: {},
                                event: "change",
                                message: Alfresco.util.message("form.field.mandatory")
                            }

                        ]
                    });

                if (this.id !== "null") {
                    YUIEvent.onContentReady(this.id, this.onReadyWrapper, this, true);
                }
            },


            setupCallback: function (a, args) {
                var cancelBut = YAHOO.widget.Button.getButton(this.id+ "-form-cancel");
                cancelBut._setOnClick({
                    fn: function () {
                        window.location = "/share";
                    }
                });


                args[1].runtime.setSubmitAsJSON(true);
                args[1].runtime.setAJAXSubmit(true,
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
                                        buttons: [{text: "Ok", handler: onClickBut}]
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
            },

            onReady: function () {
                objectId = this.id;
                YAHOO.Bubbling.on("afterFormRuntimeInit", this.setupCallback, this);
            }

        }
    )
})();


























