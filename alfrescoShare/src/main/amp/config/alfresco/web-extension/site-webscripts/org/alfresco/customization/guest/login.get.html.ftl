<#--todo: move this file by the following path: com/flex-solution/guest-->
<@markup id="login-page-JS" target="js" action="after">
    <@script type="text/javascript" src="${url.context}/res/components/com/flex-solution/js/registration.js"/>

<script type="text/javascript">
    new Alfresco.component.regButton("reg-button");
</script>
</@markup>

<@markup id="login-page-CSS" >
<#-- CSS Dependencies -->
    <@link href="${url.context}/res/components/com/flex-solution/css/login-page.css" group="login"/>
</@>

<@markup id="registration" target="buttons" action="after" scope="page">
    <div class="form-field">
        <input type="button" id="reg-button" value="${msg("button.registration")}"</div>
</@markup>


