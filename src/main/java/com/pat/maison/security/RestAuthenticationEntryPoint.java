package com.pat.maison.security;

import com.pat.maison.config.MainConfig;
import com.pat.maison.services.SmtpMailSender;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by patricou on 09/06/2016.
 */
@Component( "restAuthenticationEntryPoint" )
    public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static org.apache.log4j.Logger log = Logger.getLogger(RestAuthenticationEntryPoint.class);

    @Autowired
    SmtpMailSender smtpMailSender;

    @Autowired
    MainConfig mainConfig;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException ) throws IOException {


        log.info("Connection from " + request.getRemoteAddr() + ", url : "
                                                         + request.getRequestURI()+ " Unauthorized, user : "
                                                         + (request.getUserPrincipal() == null ? "no user provided": request.getUserPrincipal().getName()));
        /*
        if (request.getRequestURI().contains("user") && request.getUserPrincipal() != null){
            //send the mail if connection NOK
            String subject = "Connection on Pat Site Not authorized from "+ request.getRemoteAddr();
            String body = "Connection on Pat Site Not authorized from "+ request.getRemoteAddr()+", user : "
                          + (request.getUserPrincipal() == null ? "no user provided": request.getUserPrincipal().getName())
                          + ", URI : "+ request.getRequestURI();
            smtpMailSender.sendMail(mainConfig.getSendailFrom(), mainConfig.getSendailTo(), subject, body);
        } */

        // return this if not authenticated
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");

    }

}
