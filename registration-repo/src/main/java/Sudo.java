import org.alfresco.repo.jscript.BaseScopableProcessorExtension;
import org.alfresco.repo.security.authentication.AuthenticationUtil;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

public class Sudo extends BaseScopableProcessorExtension {


    public Object su(final Function func) {

        final Scriptable scope = getScope();

        return su(func, scope);
    }

    public Object su(final Function func, final Scriptable scope, final Object... objects) {

        final Context cx = Context.getCurrentContext();

        AuthenticationUtil.RunAsWork<Object> raw = new AuthenticationUtil.RunAsWork<Object>() {
            public Object doWork() throws Exception {
                return func.call(cx, ScriptableObject.getTopLevelScope(scope), scope, objects);
            }
        };

        return AuthenticationUtil.runAs(raw, AuthenticationUtil.getSystemUserName());
    }
}
