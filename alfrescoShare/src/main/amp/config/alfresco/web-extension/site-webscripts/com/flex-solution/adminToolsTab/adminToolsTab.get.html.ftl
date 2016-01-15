<@markup id="css" >
    <@link href="${url.context}/res/components/com/flex-solution/css/formComponent.css" group="form"/>
</@>

<@markup id="js">
<#--&lt;#&ndash; JavaScript Dependencies &ndash;&gt;-->

    <@script src="${url.context}/res/components/console/consoletool.js" group="console"/>
    <@script src="${url.context}/res/components/com/flex-solution/js/consoleUserRegConfig.js" group="console"/>
    <@script src="${url.context}/res/modules/simple-dialog.js" group="console"/>
</@>


<@markup id="html">
    <@uniqueIdDiv>
        <#assign el=args.htmlid?html>
    <div class="customForm">
        <@region id="reviewUserForm" scope="page">
        </@>
    </div>


    <script type="text/javascript">

        YAHOO.Bubbling.on("afterFormRuntimeInit", function (a, b) {
            new Alfresco.ConsoleUserRegConfig("${el}");
        });
    </script>
    </@>
</@>

