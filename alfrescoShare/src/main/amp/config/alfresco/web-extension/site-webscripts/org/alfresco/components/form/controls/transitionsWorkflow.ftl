<@script type="text/javascript" src="${url.context}/res/components/com/flex-solution/js/transitionsReviewNewUser.js"/>

<#if form.mode == "edit" >
<script type="text/javascript">//<![CDATA[
(function()
{
    new Alfresco.Transitions.reviewNewUser("${fieldHtmlId}").setOptions(
            {
                currentValue: "${field.value?js_string}"
            }).setMessages(
    ${messages}
    );
})();
//]]></script>

<div class="form-field suggested-actions" id="${fieldHtmlId}">
    <div id="${fieldHtmlId}-buttons">
    </div>
</div>
</#if>