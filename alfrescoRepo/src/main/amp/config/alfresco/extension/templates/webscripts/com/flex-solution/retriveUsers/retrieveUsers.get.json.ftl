{
    "users" :
        [
        <#list users  as user >

                {
                    <#--"nodeRef": "${user.nodeRef}",-->


                    <#--"aspects":-->
                        <#--[-->
                             <#--<#list user.aspects as aspect>-->
                                <#--{-->
                                    <#--"aspect": "${aspect}"-->
                                <#--}-->
                             <#--<#if aspect_has_next>,</#if>-->
                            <#--</#list>-->
                        <#--],-->


                    "prop_userName": "${user.properties["userName"]}",
                    "prop_firstName": "${user.properties["firstName"]}",
                    "prop_lastName": "${user.properties["lastName"]}",
                    "prop_email": "${user.properties["email"]}",
                    <#if user.properties["fs:answerDate"]??>
                            "prop_answerDate":"${user.properties["fs:answerDate"]?datetime?string("dd.MM.yyyy-HH:mm")}",
                    <#else>
                            "prop_answerDate": "",
                    </#if>

                    <#if user.properties["fs:rejectReason"]??>
                            "prop_rejectReason": "${user.properties["fs:rejectReason"]}"
                    <#else>
                            "prop_rejectReason": ""
                    </#if>

                }
                <#if user_has_next>,</#if>
        </#list>
        ]
}