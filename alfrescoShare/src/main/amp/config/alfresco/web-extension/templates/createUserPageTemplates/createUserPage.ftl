<#include "/org/alfresco/include/alfresco-template.ftl" />

<@templateHeader></@templateHeader>
<@templateBody>
    <@markup id="alf-hd">
    <div id="alf-hd">
        <@region scope="global" id="share-header" chromeless="true"/>
    </div>
    </@markup>
    <@markup id="bd">
    <div id="bd">
        <@region id="customForm" scope="template" />

    </div>
    </@markup>
</@templateBody>
<@templateFooter>
    <@markup id="alf-ft">
    <div id="alf-ft">
        <@region id="footer" scope="global"/>
    </div>
    </@markup>
</@templateFooter>