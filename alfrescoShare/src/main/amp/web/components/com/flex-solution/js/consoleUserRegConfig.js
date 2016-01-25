(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;


    Alfresco.ConsoleUserRegConfig = function (htmlId) {

        Alfresco.ConsoleUserRegConfig.superclass.constructor.call(this, htmlId);

        Alfresco.util.ComponentManager.register(this);
        Alfresco.util.YUILoaderHelper.require([], this.onReady, this);

        return this;
    };


    YAHOO.extend(Alfresco.ConsoleUserRegConfig, Alfresco.ConsoleTool,
        {
            setupFormConfigs: function (a, args) {

                var formRuntime = args[1].runtime;
                formRuntime.addValidation(formRuntime.formId.replace(/-form/g, "") + "_assoc_fs-forms_groupAssignee",
                    this.addCustomValidation, {checkbox: this.findCheckbox()}, "submit", Alfresco.util.message("valid.add.revGroup"));

                formRuntime.setSubmitAsJSON(true);
                formRuntime.setAJAXSubmit(true,

                    {
                        successCallback: {
                            fn: function () {
                                Alfresco.util.PopupManager.displayMessage({
                                    text: Alfresco.util.message("review.group.onchange")
                                });

                            },
                            scope: this
                        },

                        failureCallback: {
                            fn: function (obj) {
                                // todo: display prompt for any error
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


            onObjectFinderReady: function (a, args) {

                ////get objectFinder element
                var objFinder = args[1].eventGroup;

                if (objFinder.currentValueHtmlId.indexOf("fs-forms_groupAssignee") == -1) {
                    return;
                }

                //get YUI button group assignee
                var groupAssigneeButton = objFinder.widgets.addButton;

                //initially set disabled
                groupAssigneeButton.set("disabled", true);


                //get  user requires review checkbox
                var checkbox = this.findCheckbox();

                //add onchange event
                YAHOO.util.Event.on(checkbox.id, "click", this.onChangeCheckBox, objFinder);

                this.pullReviewingGroup(objFinder, checkbox);
            },


            //create custom validation
            addCustomValidation: function (field, args, event, form, silent, message) {
                return args.checkbox.checked ? Alfresco.forms.validation.mandatory(field, args, event, form, silent, message) : true;
            },


            //todo: are you sure that there is no better way to get checkbox?
            findCheckbox: function () {
                var inputs = document.getElementsByTagName("input");

                for (var index = 0; index < inputs.length; index++) {
                    if (inputs[index].type == "checkbox" && (inputs[index].id.indexOf("_prop_fs-forms_isRequired-entry") != -1)) {
                        return inputs[index];
                    }
                }

                return null;
            },


            onChangeCheckBox: function (scope, objFinder) {
                if (scope.currentTarget.checked) {
                    objFinder.widgets.addButton.set("disabled", false);
                    return;
                }
                //manually remove objectFinder value
                delete objFinder.selectedItems[objFinder.options.selectedValue];
                objFinder.singleSelectedItem = null;
                YAHOO.Bubbling.fire("renderCurrentValue",
                    {
                        eventGroup: objFinder
                    });

                objFinder.widgets.addButton.set("disabled", true);
            },


            pullReviewingGroup: function (objFinder, checkbox) {

                //set initially reviewing group from file
                Alfresco.util.Ajax.request({
                    url: Alfresco.constants.PROXY_URI + "com/flex-solution/getReviewingGroup",
                    method: Alfresco.util.Ajax.GET,
                    format: "json",

                    successCallback: {
                        fn: function (obj) {
                            if (obj.json.groupAssignee) {
                                objFinder.selectItems(obj.json.groupAssignee);
                                checkbox.checked = true;
                            }
                        },
                        scope: this
                    },

                    failureCallback: {
                        fn: function (obj) {
                        //    todo: why it is empty
                        },
                        scope: this
                    }
                });
            },


            onReady: function () {
                YAHOO.Bubbling.on("afterFormRuntimeInit", this.setupFormConfigs, this);

                ////listen objectFinderReady event
                YAHOO.Bubbling.on("objectFinderReady", this.onObjectFinderReady, this);
            }

        });
})();