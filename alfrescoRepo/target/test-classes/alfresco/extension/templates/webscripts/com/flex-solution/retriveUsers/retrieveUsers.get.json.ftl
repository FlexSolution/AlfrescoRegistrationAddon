{
    "users" :
        [
        <#list users  as user >
                {
                    "prop_userName": "${user.properties["userName"]}",
                    "prop_firstName": "${user.properties["firstName"]}",
                    "prop_lastName": "${user.properties["lastName"]}",
                    "prop_email": "${user.properties["email"]}",
                    "prop_answerDate":"${user.properties["fs-newUser:answerDate"]?datetime?string("dd.MM.yyyy-HH:mm")!""}",
                    "prop_rejectReason":"${user.properties["fs-newUser:rejectReason"]!""}"
                }
                <#if user_has_next>,</#if>
        </#list>
        ]
}