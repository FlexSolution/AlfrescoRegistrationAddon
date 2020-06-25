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
                                id: "prop_fs-forms_userName"
                            }
                            ,
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
                                fieldId: this.id + "_prop_fs-forms_userName",
                                handler: Alfresco.forms.validation.repoRegexMatch,
                                params: {
                                    "requiresMatch": true,
                                    "expression": "^[^@]+$"
                                },
                                event: "change,mouseover",
                                message: Alfresco.util.message("userName.field.regex")
                            }
                            ,
                            {
                                fieldId: this.id + "_prop_fs-forms_userName",
                                handler: Alfresco.forms.validation.mandatory,
                                params: {},
                                event: "change",
                                message: Alfresco.util.message("form.field.mandatory")
                            }
                            ,
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
                                    "expression": ".+@.+"
                                },
                                event: "change,mouseover",
                                message: Alfresco.util.message("email.field.regex")
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
                var cancelBut = YAHOO.widget.Button.getButton(this.id + "-form-cancel");
                var submitBut = YAHOO.widget.Button.getButton(this.id + "-form-submit");


                cancelBut.set("onclick",
                    {
                        fn: function () {
                            window.location = window.location.origin + Alfresco.constants.URL_CONTEXT;
                        }
                    });

                submitBut.set("onclick",
                    {
                        fn: function () {
                            cancelBut.set("disabled", true);
                        }
                    });

                var runtime = args[1].runtime;
                runtime.setSubmitAsJSON(true);
                runtime.setAJAXSubmit(true,
                    {
                        successCallback: {
                            fn: function (obj) {
                                cancelBut.set("disabled", false);
                                if (obj.json.status.code == 200) {

                                    //redirect to home page on success
                                    function onClickBut() {
                                        window.location = window.location.origin + Alfresco.constants.URL_CONTEXT;
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

                                var errMessage;

                                // We do this because server response is something like 503004 Wrapped Exception with status error.outBound.
                                if(obj.json.message.includes('error.outbound')){
                                    errMessage = Alfresco.util.message("error.outbound");
                                }else{
                                    errMessage = obj.json.message;
                                }
                                cancelBut.set("disabled", false);
                                Alfresco.util.PopupManager.displayPrompt({
                                    text: !obj.json ? obj.serverResponse.statusText : errMessage,
                                });
                            },
                            scope: this
                        },
                    });
            },

            onReady: function () {
                YAHOO.Bubbling.on("afterFormRuntimeInit", this.setupCallback, this);
            }

        }
    )
})();


























