(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Selector = YAHOO.util.Selector;

    Alfresco.showNewUsers = function (htmlId) {
        Alfresco.showNewUsers.superclass.constructor.call(this, "Alfresco.showNewUsers", htmlId);

        return this;
    };

    YAHOO.extend(Alfresco.showNewUsers, Alfresco.component.Base,
        {
            onReady: function () {


                //auto resize table on window resize  function
                function autoResizeTable(usersDataTable){
                    //function setPreferableColumnWidth(usersDataTable) {
                    var dashletWidth = YAHOO.util.Dom.get(Alfresco.util.ComponentManager.findFirst("Alfresco.showNewUsers").id).offsetWidth;

                    var count = 0;
                    //total width of all visible columns
                    var totalWidth = 0;

                    //visible columns number
                    var visibleColumns = 0;

                    var initialWidths = [];

                    usersDataTable.getColumnSet().keys.forEach(function (item, index, array) {
                        if (count == 0) {
                            initialWidths.push(array[index].getColEl().offsetWidth);
                        }
                        var currentColumnWidth = initialWidths[index];
                        usersDataTable.setColumnWidth(index, null);

                        //if column visible
                        if (!array[index].hidden) {
                            totalWidth = totalWidth + currentColumnWidth;
                            visibleColumns = visibleColumns + 1;
                        }
                    });

                    //set minWidth columns if total column width < dashlet width
                    if (totalWidth < dashletWidth) {
                        usersDataTable.getColumnSet().keys.forEach(function (item, index, array) {
                            usersDataTable.setColumnWidth(index, dashletWidth / visibleColumns - 23)
                        });
                    }
                    count++;
                }


                // todo: move all functions outside onReady
                //cell renderer for rejected users
                //oRecord == YUI Record object that prescribes table row, oData == data contained in current cell
                function customCellRenderer(innerDiv, oRecord, oColumn, oData) {
                    if (!oRecord._oData.prop_rejectReason) {
                        //set green background on table row
                        innerDiv.parentNode.parentNode.style.background = "rgba(0, 255, 0, 0.27)";
                    } else {
                        //set red background on table row
                        innerDiv.parentNode.parentNode.style.background = "rgba(255, 0, 0, 0.45)";
                    }
                    innerDiv.innerHTML = oData;
                }

                //custom sort function
                //a==first YUI Record object, b == second YUI Record object, desc == sorting direction (Boolean), field == field name that sort by
                var compareFunction = function (a, b, desc, field) {
                    //default YAHOO sort function
                    var comp = YAHOO.util.Sort.compare;
                    return comp(a.getData(field), b.getData(field), desc);
                };


                //todo: rename
                //entry point
                //set data source (XMLHttpRequest type  -->> alfresco side webscript that return JSON)
                var myDataSource = new YAHOO.util.XHRDataSource(Alfresco.constants.PROXY_URI + "com/flex-solution/retrieveUsers");

                //set response schema
                myDataSource.responseSchema = {
                    resultsList: "users",
                    fields: [
                        {key: "prop_userName", parser: "string"},
                        {key: "prop_firstName", parser: "string"},
                        {key: "prop_lastName", parser: "string"},
                        {key: "prop_email", parser: "string"},
                        {key: "prop_answerDate", parser: "string"},
                        {key: "prop_rejectReason", parser: "string"}
                    ]
                };

                //set response type
                myDataSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;


                // todo: create new function called getColumnDefinitions, also check do you really need all those configs,
                // todo: also get label from properties
                var dashletWidth = YAHOO.util.Dom.get(Alfresco.util.ComponentManager.findFirst("Alfresco.showNewUsers").id).offsetWidth;

                //set column definition (tables representation)
                var columnDefinitions = [
                    {
                        key: "prop_userName",
                        label: "User name",
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            field: "prop_userName",
                            sortFunction: compareFunction,
                            //Ascending
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        width: "auto",
                        //render as text
                        formatter: YAHOO.widget.DataTable.formatText
                    },

                    {
                        key: "prop_firstName",
                        label: "First name",
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            field: "prop_firstName",
                            sortFunction: compareFunction,
                            //Ascending
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        width: "auto",
                        //render as text
                        formatter: YAHOO.widget.DataTable.formatText
                    },

                    {
                        key: "prop_lastName",
                        label: "Last name",
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        width: "auto",
                        formatter: YAHOO.widget.DataTable.formatText
                    },
                    {
                        key: "prop_email",
                        label: "E-mail",
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        width: "auto",
                        formatter: YAHOO.widget.DataTable.formatText
                    },

                    {
                        key: "prop_answerDate",
                        label: "Answer date",
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        width: "auto",
                        //column renderer function
                        formatter: customCellRenderer,
                        //cells class of current column
                        className: "answerDate"
                    },

                    //this column need that pull data about reject reason
                    {
                        key: "prop_rejectReason",
                        label: "Reject reason",
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        formatter: YAHOO.widget.DataTable.formatText,
                        className: "rejectReason",
                        hidden: true
                    }
                ];

                //todo: rename
                //config object
                var myConfigs = {
                    //set tables paginator
                    paginator: new YAHOO.widget.Paginator({
                        rowsPerPage: 10
                    })
                };


                //create YAHOO table (table container, column definitions, data source, config object)
                var usersDataTable = new YAHOO.widget.DataTable("content", columnDefinitions, myDataSource, myConfigs);

                autoResizeTable(usersDataTable);


                window.addEventListener('resize', function(){
                    autoResizeTable(usersDataTable)
                });


                //add event listener to table
                //oArgs object that contains event object and event source (table cell element itself)
                usersDataTable.subscribe("cellMouseoverEvent", function (oArgs) {

                    //find DIV that is in each YAHOO table cell
                    var rejectReasonValue = oArgs.target.parentNode.querySelector(".rejectReason").querySelector("DIV").innerHTML;

                    //if cell contains class name "rejectedDate" && ...
                    if (oArgs.target.className.indexOf("answerDate") > -1 && rejectReasonValue != "") {
                        //set cell cursor style
                        oArgs.target.style.cursor = "pointer";


                        //display reject reason in tooltip balloon
                        //find parent of current cell (<tr>), and find child with class ".rejectReason" in it. Then find inner <div> in found cell.
                        var tooltip = Alfresco.util.createBalloon(oArgs.target.id, {
                            html: "<div style=\"width: auto; max-width: 30em; word-wrap:break-word; text-align: center\">" + rejectReasonValue + "</div>",
                            width: "auto"
                        });
                        tooltip.show();

                        usersDataTable.subscribe("cellMouseoutEvent", function (oArgs) {
                            tooltip.hide();
                        });
                    }
                });
            }
        }
    )
})();


























