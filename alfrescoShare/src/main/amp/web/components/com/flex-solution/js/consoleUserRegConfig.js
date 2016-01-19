(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;
    var thisObj = this;

    /**
     * Alfresco Slingshot aliases
     */

    /**
     * ConsoleTagManagement tool component constructor.
     *
     * @param {String} htmlId The HTML id of the parent element
     * @return {UserRegConfigPanelHandler} The new component instance
     * @constructor
     */



    Alfresco.ConsoleUserRegConfig = function (htmlId) {

        Alfresco.ConsoleUserRegConfig.superclass.constructor.call(this, htmlId);

        Alfresco.util.ComponentManager.register(this);
        Alfresco.util.YUILoaderHelper.require([], this.onComponentsLoaded, this);


        UserRegConfigPanelHandler = function myConsoleComponent_constructor() {
            UserRegConfigPanelHandler.superclass.constructor.call(this, "userConfigPanelHandler");
        };

        YAHOO.extend(UserRegConfigPanelHandler, Alfresco.ConsolePanelHandler);

        new UserRegConfigPanelHandler();
        return this;
    }


    YAHOO.extend(Alfresco.ConsoleUserRegConfig, Alfresco.ConsoleTool,
        {
            onComponentsLoaded: function () {

                //listen objectFinderReady event
                YAHOO.Bubbling.on("objectFinderReady", function () {


                    //create YUI form
                    var myForm = Alfresco.util.ComponentManager.findFirst("Alfresco.FormUI").formsRuntime;

                    //get objectFinder element
                    var objFinder = Alfresco.util.ComponentManager.findFirst("Alfresco.ObjectRenderer").objectFinder;

                    //get YUI button group assignee
                    var groupAssigneeButton = objFinder.widgets.addButton;

                    //initially set disabled
                    groupAssigneeButton._setDisabled(true);

                    //get  user requires review checkbox
                    var check = Dom.get(myForm.formId.replace(/-form/g, "") + "_prop_fs-forms_isRequired-entry");


                    function onChangeCheckBox() {
                        if (check.checked) {
                            groupAssigneeButton._setDisabled(false);
                        } else {
                            //manually remove objectFinder value
                            delete objFinder.selectedItems[objFinder.options.selectedValue];
                            objFinder.singleSelectedItem = null;
                            YAHOO.Bubbling.fire("renderCurrentValue",
                                {
                                    eventGroup: objFinder
                                });

                            groupAssigneeButton._setDisabled(true);
                        }
                    };

                    //add onchange event
                    YAHOO.util.Event.on(check.id, "click", onChangeCheckBox);

                    //create custom validation
                    Alfresco.forms.validation.custom = function mandatoryCustom(field, args, event, form, silent, message) {
                        return check.checked ? Alfresco.forms.validation.mandatory(field, args, event, form, silent, message) : true;
                    }

                    //add validation (check whether objectFinder value is present)
                    myForm.addValidation(myForm.formId.replace(/-form/g, "") + "_assoc_fs-forms_groupAssignee", Alfresco.forms.validation.custom, null, "submit", Alfresco.util.message("valid.add.revGroup"));
                    myForm.setValidateOnSubmit(true);
                    myForm.setSubmitElements(YAHOO.widget.Button.getButton(myForm.formId + "-submit"));
                    myForm.setSubmitAsJSON(true);


                    myForm.setAJAXSubmit(true,

                        {
                            successCallback: {
                                fn: function () {
                                    Alfresco.util.PopupManager.displayMessage({
                                        text: "Saved"
                                    });

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


                    //set initially reviewing group from file
                    Alfresco.util.Ajax.request({
                        url: Alfresco.constants.PROXY_URI + "com/flex-solution/getReviewingGroup",
                        method: Alfresco.util.Ajax.GET,
                        format: "json",

                        successCallback: {
                            fn: function (obj) {
                                if (obj.json.groupAssignee) {
                                    objFinder.selectItems(obj.json.groupAssignee);
                                    check.checked = true;
                                }
                            },
                            scope: this
                        },

                        failureCallback: {
                            fn: function (obj) {
                            },
                            scope: this
                        }
                    });
                });
            }
        }
    );
})();