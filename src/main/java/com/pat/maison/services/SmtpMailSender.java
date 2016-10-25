package com.pat.maison.services;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by patricou on 01/06/2016.
 */
@Component
public class SmtpMailSender {

    @Autowired
    private JavaMailSender javaMailSender;

    private static org.apache.log4j.Logger log = Logger.getLogger(SmtpMailSender.class);

    @Async
    public void sendMail(String from,String to, String subject, String body){
        MimeMessage mail = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(to);
            helper.setReplyTo(from);
            helper.setFrom(from);
            helper.setSubject(subject);
            helper.setText(body);
        } catch (MessagingException e) {
            e.printStackTrace();
        } finally {}
        javaMailSender.send(mail);
        //return helper;
    }
    @Async
    public void sendMail(String from,String to, String subject, String body, String attachement){
        MimeMessage mail = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(to);
            helper.setReplyTo(from);
            helper.setFrom(from);
            helper.setSubject(subject);
            helper.setText(body);
            helper.addAttachment(attachement, new FileSystemResource(new File(attachement)));

            log.info("Mail sent for Image " + attachement );

        } catch (MessagingException e) {
            e.printStackTrace();
        } finally {}
        javaMailSender.send(mail);
        //return helper;
    }

}
