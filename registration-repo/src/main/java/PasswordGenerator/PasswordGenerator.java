package PasswordGenerator;

import org.alfresco.repo.jscript.BaseScopableProcessorExtension;

import java.util.UUID;


public class PasswordGenerator extends BaseScopableProcessorExtension {
    public String genPass (){
        return UUID.randomUUID().toString();
    }
}
