package com.flexsolution.script;

import org.alfresco.repo.jscript.BaseScopableProcessorExtension;

import java.util.UUID;


public class PasswordGenerator extends BaseScopableProcessorExtension {

    public String genPass() {
        String uuid = UUID.randomUUID().toString();
        return uuid.substring(0,7);
    }
}


