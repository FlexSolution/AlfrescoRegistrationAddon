package PasswordGenerator;

import org.alfresco.repo.jscript.BaseScopableProcessorExtension;

import java.util.UUID;

/**
 * Created by mykhail on 17.11.15.
 */
public class PasswordGenerator extends BaseScopableProcessorExtension {
    public String genPass (){
        return UUID.randomUUID().toString();
    }
}
