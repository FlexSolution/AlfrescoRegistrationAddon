<#--&lt;#&ndash; JavaScript Dependencies &ndash;&gt;-->

<@markup id="js">
    <@script src="${url.context}/res/components/console/consoletool.js" group="console"/>
    <@script src="${url.context}/res/components/com/flex-solution/js/consoleUserRegConfig.js" group="console"/>
    <@script src="${url.context}/res/modules/simple-dialog.js" group="console"/>
</@>


<@markup id="html">
    <@uniqueIdDiv>
        <#assign el=args.htmlid?html>
    <div class="application">
            <@region id="reviewUserForm" scope="page">
        </@>
    </div>


    <script type="text/javascript">

        YAHOO.Bubbling.on("afterFormRuntimeInit", function () {
            new Alfresco.ConsoleUserRegConfig("${el}");
        });
    </script>
    </@>
</@>

