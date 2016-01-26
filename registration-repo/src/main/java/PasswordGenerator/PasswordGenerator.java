package PasswordGenerator;

import org.alfresco.repo.jscript.BaseScopableProcessorExtension;

import java.security.SecureRandom;
import java.math.BigInteger;


public class PasswordGenerator extends BaseScopableProcessorExtension {

    public String genPass() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }
}


