(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;

    Alfresco.ShowNewUsers = function (htmlId) {
        Alfresco.ShowNewUsers.superclass.constructor.call(this, "Alfresco.ShowNewUsers", htmlId);
        return this;
    };

    YAHOO.extend(Alfresco.ShowNewUsers, Alfresco.component.Base,
        {

            options: {
                background: {
                    approve: "rgba(0, 255, 0, 0.27)",
                    reject: "rgba(255, 0, 0, 0.45)"
                },
                rowsPerPage: 10
            },

            getDataSource: function () {
                //set data source (XMLHttpRequest type  -->> alfresco side webscript that return JSON)
                var dataSource = new YAHOO.util.XHRDataSource(Alfresco.constants.PROXY_URI + "com/flex-solution/retrieveUsers");

                //set response schema
                dataSource.responseSchema = {
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
                dataSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;
                return dataSource;
            },

            getColumnDefinition: function () {
                return [
                    {
                        key: "prop_userName",
                        label: this.msg("label.userName"),
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            field: "prop_userName",
                            sortFunction: this.compareFunction,
                            //Ascending
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        //render as text
                        formatter: YAHOO.widget.DataTable.formatText
                    },

                    {
                        key: "prop_firstName",
                        label: this.msg("label.firstName"),
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            field: "prop_firstName",
                            sortFunction: this.compareFunction,
                            //Ascending
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        //render as text
                        formatter: YAHOO.widget.DataTable.formatText
                    },

                    {
                        key: "prop_lastName",
                        label: this.msg("label.lastName"),
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: this.compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        formatter: YAHOO.widget.DataTable.formatText
                    },
                    {
                        key: "prop_email",
                        label: this.msg("label.email"),
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: this.compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        formatter: YAHOO.widget.DataTable.formatText
                    },

                    {
                        key: "prop_answerDate",
                        label: this.msg("label.answerDate"),
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: this.compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        //column renderer function
                        formatter: this.customCellRenderer,
                        //cells class of current column
                        className: "answerDate"
                    },

                    //this column need that pull data about reject reason
                    {
                        key: "prop_rejectReason",
                        label: this.msg("label.rejectReason"),
                        resizeable: true,
                        sortable: true,
                        sortOptions: {
                            sortFunction: this.compareFunction,
                            defaultDir: YAHOO.widget.DataTable.CLASS_ASC
                        },
                        formatter: YAHOO.widget.DataTable.formatText,
                        className: "rejectReason",
                        hidden: true
                    }
                ];
            },

            //cell renderer for rejected users
            //oRecord == YUI Record object that prescribes table row, oData == data contained in current cell
            customCellRenderer: function (innerDiv, oRecord, oColumn, oData) {
                var background = !oRecord._oData.prop_rejectReason ? this.configs.background.approve : this.configs.background.reject;
                Dom.setStyle(innerDiv.parentNode.parentNode, "background", background);
                innerDiv.innerHTML = oData;
            },


            //custom sort function
            //a==first YUI Record object, b == second YUI Record object, desc == sorting direction (Boolean), field == field name that sort by
            compareFunction: function (a, b, desc, field) {
                //default YAHOO sort function
                var comp = YAHOO.util.Sort.compare;
                return comp(a.getData(field), b.getData(field), desc);
            },


            addMouseListener: function (oArgs, usersDataTable) {

                //find DIV that is in each YAHOO table cell
                var rejectReasonValue = oArgs.target.parentNode.querySelector(".rejectReason").querySelector("DIV").innerHTML;

                //if cell contains class name "rejectedDate" && ...
                if (oArgs.target.className.indexOf("answerDate") > -1 && rejectReasonValue != "") {
                    //set cell cursor style
                    Dom.setStyle(oArgs.target, "cursor", "pointer");


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
            },


            //auto resize table on window resize  function
            autoResizeTable: function (event, usersDataTable) {

                //function setPreferableColumnWidth(usersDataTable) {
                var dashletWidth = Dom.get(this.id).offsetWidth;

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
                    usersDataTable.getColumnSet().keys.forEach(function (item, index) {
                        usersDataTable.setColumnWidth(index, dashletWidth / visibleColumns - 22.8)
                    });
                }
                count++;
            },


            onReady: function () {

                //create YAHOO table (table container, column definitions, data source, config object)
                var usersDataTable = new YAHOO.widget.DataTable(this.id + "-content", this.getColumnDefinition(), this.getDataSource(),
                    {
                        background: this.options.background,
                        paginator: new YAHOO.widget.Paginator({rowsPerPage: this.options.rowsPerPage})
                    });

                this.autoResizeTable(null, usersDataTable);

                Event.addListener(window, "resize", this.autoResizeTable, usersDataTable, this);

                //add event listener to table
                //oArgs object that contains event object and event source (table cell element itself)
                usersDataTable.subscribe("cellMouseoverEvent", this.addMouseListener, usersDataTable);
            }
        }
    )
})();


























