//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.pat.maison.web;

import com.pat.maison.config.MainConfig;
import com.pat.maison.model.CategoryLink;
import com.pat.maison.model.CategoryLinksRepository;
import com.pat.maison.model.Message;
import com.pat.maison.model.UrlLinksRepository;
import com.pat.maison.services.DirectoriesServices;
import com.pat.maison.services.SmtpMailSender;
import com.pat.maison.web.CentralHome;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.InetAddress;
import java.nio.file.Paths;
import java.security.Principal;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class RestCentralHome {
    @Autowired
    DirectoriesServices directoriesServices;
    @Autowired
    MainConfig mainConfig;
    @Autowired
    SmtpMailSender smtpMailSender;
    @Autowired
    UrlLinksRepository urlLinksRepository;
    @Autowired
    CategoryLinksRepository categoryLinksRepository;
    private static Logger log = Logger.getLogger(CentralHome.class);

    public RestCentralHome() {
    }

    @RequestMapping(
            value = {"/rest/links"},
            method = {RequestMethod.GET},
            produces = {"application/json"}
    )
    public List<CategoryLink> getLinks(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        List l = this.categoryLinksRepository.findAll();
        model.addAttribute("params", this.mainConfig);
        return l;
    }

    @RequestMapping(
            value = {"/rest/mainconfig"},
            method = {RequestMethod.GET},
            produces = {"application/json"}
    )
    public MainConfig getMainConfig(HttpServletRequest request) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        return this.mainConfig;
    }

    @PostConstruct
    private void sendMailAfterRestart() {
        try {
            String e = "Restart application " + this.mainConfig.getDisplayName() + " at " + new Time((new Date()).getTime()) + " from " + InetAddress.getLocalHost().getHostAddress();
            this.smtpMailSender.sendMail(this.mainConfig.getSendailFrom(), this.mainConfig.getSendailTo(), e, e);
        } catch (Exception var2) {
            log.info("Exception thrown with PostConstruct procedure in RestCentralHome class : " + var2.getMessage().toString());
        }
    }

    @RequestMapping(
            value = {"/login"},
            method = {RequestMethod.POST}
    )
    @ResponseStatus(HttpStatus.CREATED)
    public void logoutPage(HttpServletRequest request, HttpServletResponse response) {
        log.info("Logout from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null) {
            (new SecurityContextLogoutHandler()).logout(request, response, auth);
        }

    }

    @RequestMapping(
            value = {"/postmessage"},
            method = {RequestMethod.POST},
            consumes = {"application/json"}
    )
    @ResponseStatus(HttpStatus.CREATED)
    public void postMessage(@RequestBody Message message, HttpServletRequest request) {
        log.info("Post Message from " + request.getRemoteAddr() + " / Message from " + message.getEmail());
        String subject = "mail from " + message.getFirstName() + " " + message.getLastName() + ", email : " + message.getEmail();
        this.smtpMailSender.sendMail(message.getEmail(), this.mainConfig.getSendailTo(), subject, message.getMessage());
    }

    @RequestMapping(
            value = {"/user"},
            method = {RequestMethod.GET}
    )
    public Principal user(Principal user, HttpServletRequest request) {
        log.info("Connection with user " + (user == null?"not logged":user.getName()) + " from " + request.getRemoteAddr() + " to " + request.getRequestURI() + " OK.");
        if (user!= null ) {
            String subject = " Connection on Pat Site OK with user " + user.getName() + " from " + request.getRemoteAddr();
            this.smtpMailSender.sendMail(this.mainConfig.getSendailFrom(), this.mainConfig.getSendailTo(), subject, subject);
        }
        return user;
    }

    @RequestMapping(
            value = {"/rest/dirsublist", "/rest/dirsublist/{directory}", "/rest/dirsublist/{directory}/{subdir1}", "/rest/dirsublist/{directory}/{subdir1}/{subdir2}"},
            method = {RequestMethod.GET},
            produces = {"application/json"}
    )
    Map<String, List<String>> listSubDir(@PathVariable("directory") Optional<String> directory, @PathVariable("subdir1") Optional<String> subdir1, @PathVariable("subdir2") Optional<String> subdir2, HttpServletRequest request) {
        log.info("Connection from, IP : " + request.getRemoteAddr() + ", URI : " + request.getRequestURI());
        Map all = this.directoriesServices.getAll((directory.isPresent()?"/" + ((String)directory.get()).trim():"") + (subdir1.isPresent()?"/" + ((String)subdir1.get()).trim():"") + (subdir2.isPresent()?"/" + ((String)subdir2.get()).trim():""));
        return all;
    }

    @RequestMapping(
            value = {"/rest/uploadFile"},
            method = {RequestMethod.POST}
    )
    public ResponseEntity<?> uploadFile(@RequestParam("uploadfile") MultipartFile[] mulitplartFile, HttpServletRequest request) {
        try {
            MultipartFile[] e = mulitplartFile;
            int var4 = mulitplartFile.length;

            for(int var5 = 0; var5 < var4; ++var5) {
                MultipartFile uploadfile = e[var5];
                String filename = uploadfile.getOriginalFilename();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd");
                SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
                Date date = new Date();
                String directory = this.mainConfig.getUploadDir() + yearFormat.format(date) + "/" + dateFormat.format(date) + "_from_uploaded";
                File file = new File(directory);
                if(!file.exists() && file.mkdir()) {
                    log.info("Directory " + directory + " created !");
                }

                String filepath = Paths.get(directory, new String[]{filename}).toString();
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
                stream.write(uploadfile.getBytes());
                stream.close();
                String subject = " Image " + filename + " uploaded from " + request.getRemoteAddr();
                this.smtpMailSender.sendMail(this.mainConfig.getSendailFrom(), this.mainConfig.getSendailTo(), subject, filepath, filepath);
                log.info("Upload file " + filename + " from " + request.getRemoteAddr());
            }
        } catch (Exception var16) {
            log.info(var16.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
