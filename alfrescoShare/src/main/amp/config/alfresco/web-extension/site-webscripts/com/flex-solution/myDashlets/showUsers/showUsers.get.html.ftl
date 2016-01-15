<@link href="${url.context}/res/components/com/flex-solution/css/dashlets/showUsers.css"/>


<@markup id="widgets">
    <@createWidgets group="dashlets"/>
</@>

<@markup id="html">
    <@uniqueIdDiv>
        <#assign el=args.htmlid?html>
    <div class="dashlet" id="${el}-users-dashlet">
        <div class="title">${msg("title")}</div>
        <div id="content" class="body scrollableList" <#if args.height??>style="height: ${args.height?html}px;"</#if>>
        </div>
    </div>
    </@>
</@>





<@script type="text/javascript" src="${url.context}/res/components/com/flex-solution/js/showUsersDashlet.js"/>
<script type="text/javascript">
    var dash = new Alfresco.widget.DashletResizer("${args.htmlid}", "${instance.object.id}").setOptions({});

    debugger;
    new Alfresco.widget.DashletTitleBarActions("${args.htmlid}").setOptions(
            {
                actions:
                        [
                            {
                                cssClass: "help",
                                bubbleOnClick:
                                {
                                    message: "Information about user which registered"
                                },
                                tooltip: "Display help for this dashlet"
                            }
                        ]
            });
    new Alfresco.showNewUsers("${args.htmlid}");
</script>

