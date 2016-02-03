<#assign id="new-user"/>

<script type="text/javascript">//<![CDATA[
new Alfresco.component.CreateUser("${id}");
//]]></script>


<@link href="${url.context}/res/components/com/flex-solution/css/formComponent.css" group="form"/>
<@script type="text/javascript" src="${url.context}/res/components/form/form.js" group="form"/>
<@script type="text/javascript" src="${url.context}/res/components/com/flex-solution/js/formComponent.js"/>


<div class="parent-block">

<div id="${id}" class="registration-block">

    <div id="${id}-form-container" class="form-container">
        <div id="comp-logo" class="theme-company-logo logo-com"></div>

        <div id="${id}-form-caption" class="caption"><span
                class="mandatory-indicator">*</span>Required Fields
        </div>

        <form id="${id}-form" method="post" accept-charset="utf-8"
              action="${url.context}/proxy/alfresco-noauth/com/flex-solution/createNewUser">



            <input id="${id}-form-redirect" name="alf_redirect" type="hidden" value="${url.context}"/>

            <div id="${id}-form-fields" class="form-fields">

                <div class="set">
                    <div class="form-field">

                        <label for="${id}_prop_fs-forms_firstName">First
                            name:<span class="mandatory-indicator">*</span></label>

                        <input id="${id}_prop_fs-forms_firstName" name="prop_fs-forms_firstName" tabindex="0" type="text" value=""
                               maxlength="1024"/>

                        <span class="help-icon">
                            <img id="${id}_prop_fs-forms_firstName-help-icon"
                                 src="${url.context}/res/components/form/images/help.png"
                                 title="Click to show and hide help text for the field." tabindex="0"/>
                        </span>

                        <div class="help-text"
                             id="${id}_prop_fs-forms_firstName-help">
                            ${msg("form.help.firstName")}
                        </div>
                    </div>

                    <div class="form-field">
                        <label for="${id}_prop_fs-forms_lastName">Last
                            name:</label>
                        <input id="${id}_prop_fs-forms_lastName" name="prop_fs-forms_lastName" tabindex="0" type="text" value=""
                               maxlength="1024"/>

                          <span class="help-icon">
                             <img id="${id}_prop_fs-forms_lastName-help-icon"
                                  src="${url.context}/res/components/form/images/help.png"
                                  title="Click to show and hide help text for the field."
                                  tabindex="0"/>
                          </span>

                        <div class="help-text"
                             id="${id}_prop_fs-forms_lastName-help">
                        ${msg("form.help.lastName")}
                        </div>

                    </div>

                    <div class="form-field">
                        <label for="${id}_prop_fs-forms_email">E-mail:<span class="mandatory-indicator">*</span></label>

                        <input id="${id}_prop_fs-forms_email" name="prop_fs-forms_email" tabindex="0" type="text" value=""
                               maxlength="1024"/>

                        <span class="help-icon">
                            <img id="${id}_prop_fs-forms_email-help-icon"
                                 src="${url.context}/res/components/form/images/help.png"
                                 title="Click to show and hide help text for the field."
                                 tabindex="0"/>
                        </span>

                        <div class="help-text"
                             id="${id}_prop_fs-forms_email-help">
                        ${msg("form.help.email")}
                        </div>
                    </div>


                </div>
            </div>

            <div id="${id}-form-buttons"
                 class="form-buttons">
                <input id="${id}-form-submit" type="submit"
                       value="Submit"/>&nbsp;
                <input id="${id}-form-cancel" type="button"
                       value="Cancel"/>
            </div>
        </form>
    </div>
</div>
</div>



