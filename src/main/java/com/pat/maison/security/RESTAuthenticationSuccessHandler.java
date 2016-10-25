package com.pat.maison.security;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

/**
 * Created by patricou on 10/06/2016.
 */
@Component
public class RESTAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private static org.apache.log4j.Logger log = Logger.getLogger(RESTAuthenticationSuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        log.info("onAuthenticationSuccess  from " + request.getRemoteAddr() + ", Authentication" + authentication.getCredentials().toString());

        response.sendRedirect("home");
    }
}