<html>
<head>
    <style type="text/css"><!--
    body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #4c4c4c;
    }

    a, a:visited {
        color: #0072cf;
    }

    --></style>
</head>

<body bgcolor="#dddddd">
<table width="100%" cellpadding="20" cellspacing="0" border="0" bgcolor="#dddddd">
    <tr>
        <td width="100%" align="center">
            <table width="70%" cellpadding="0" cellspacing="0" bgcolor="white"
                   style="background-color: white; border: 1px solid #aaaaaa;">
                <tr>
                    <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding: 10px 30px 0px;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td>
                                                <table cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        <td>
                                                            <img src="${shareUrl}/res/components/images/no-user-photo-64.png"
                                                                 alt="" width="64" height="64" border="0"
                                                                 style="padding-right: 20px;"/>
                                                        </td>
                                                        <td>
                                                            <div style="font-size: 22px; padding-bottom: 4px;">
                                                                Review account task
                                                            </div>
                                                            <div style="font-size: 13px;">
                                                            ${date?datetime?string.full}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <div style="font-size: 14px; margin: 12px 0px 24px 0px; padding-top: 10px; border-top: 1px solid #aaaaaa;">
                                                    <p>Hi ${firstName},</p>

                                                    <p>New user wants to be registered in the system, please review the following data:</p>

                                                    <p><b>Email:<b> ${email!"not provided"}</p>
                                                    <p><b>First Name:<b> ${newFirstName!"not provided"}</p>
                                                    <p><b>Last Name:<b> ${newLastName!"not provided"}</p>

                                                    <p>Click this link to view the task:</p>
                                                    <p><a href="${shareUrl}/page/task-details?taskId=activiti$${workflowId}">${shareUrl}/page/task-details?taskId=activiti$${workflowId}</a>

                                                    <p>Sincerely,<br/>
                                                        Alfresco ${productName!""}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="border-top: 1px solid #aaaaaa;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px 30px; font-size: 13px;">
                                    To find out more about Alfresco ${productName!""} visit <a
                                        href="http://www.alfresco.com">http://www.alfresco.com</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="border-bottom: 1px solid #aaaaaa;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 30px;">
                                    <img src="${shareUrl}/themes/default/images/app-logo.png" alt="" width="117"
                                         height="48" border="0"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>