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
                                Alfresco.util.PopupManager.displayPrompt({
                                    text: !obj.json ? obj.serverResponse.statusText : obj.json.message,
                                });
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


                YAHOO.Bubbling.on("renderCurrentValue", this.onGroupPicked, this)
            },

            onGroupPicked: function (event, args) {
               var objFinder = args[1].eventGroup;
                if(objFinder.getSelectedItems().length == 0){
                    return;
                }

                Alfresco.util.Ajax.jsonPost({
                    url: Alfresco.constants.PROXY_URI  + "com/flex-solution/getUsersNumberInGroup",
                    dataObj: {
                        group: objFinder.getSelectedItems()[0],
                    },
                    successCallback: {
                        fn: function (resp) {
                            if(resp.json.usersNumber != 0){
                                return;
                            }
                            this.warning(objFinder);
                        },
                        scope: this
                    },

                    failureCallback: {
                        fn: function () {
                            Alfresco.util.PopupManager.displayPrompt({
                                text: obj.json ? obj.json.message : obj.serverResponse.statusText,
                            });
                        },
                        scope: this
                    }
                });
            },

            warning : function(objFinder){
                Alfresco.util.PopupManager.displayPrompt({
                    text: Alfresco.util.message("warning.reviewing.group"),
                    icon: YAHOO.widget.SimpleDialog.ICON_WARN
                });
            },


            //create custom validation
            addCustomValidation: function (field, args, event, form, silent, message) {
                return args.checkbox.checked ? Alfresco.forms.validation.mandatory(field, args, event, form, silent, message) : true;
            }
            ,


            findCheckbox: function () {

                function _checkElement(el) {
                    return el.type == "checkbox" && el.id.indexOf("_prop_fs-forms_isRequired-entry") != -1;
                }

                return YAHOO.util.Dom.getElementsBy(_checkElement, "input")[0];
            }
            ,


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
            }
            ,


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
                            Alfresco.util.PopupManager.displayPrompt({
                                text: !obj.json ? obj.serverResponse.statusText : obj.json.message,
                            });
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
})
();