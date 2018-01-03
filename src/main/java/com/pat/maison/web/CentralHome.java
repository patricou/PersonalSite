//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.pat.maison.web;

import com.pat.maison.config.MainConfig;
import com.pat.maison.model.CategoryLinksRepository;
import com.pat.maison.model.UrlLinksRepository;
import com.pat.maison.services.DirectoriesServices;
import com.pat.maison.services.SmtpMailSender;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping({"/"})
public class CentralHome {
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

    public CentralHome() {
    }

    @RequestMapping(
            value = {"/", "/site", "/home"},
            method = {RequestMethod.GET}
    )
    public String mainPage(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        model.addAttribute("params", this.mainConfig);
        return "index";
    }

    @CrossOrigin(
            origins = {"http://81.28.193.182:8765"}
    )
    @RequestMapping(
            value = {"/camera"},
            method = {RequestMethod.GET}
    )
    public String redirectToCamera(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        model.addAttribute("params", this.mainConfig);
       // return "redirect:http://" + this.mainConfig.getIPServer() + ":8765";
        return "redirect:https://" + this.mainConfig.getDomainName() + ":8003/webman/3rdparty/SurveillanceStation/";
    }

    @CrossOrigin(
            origins = {"http://81.28.193.182:8765"}
    )
    @RequestMapping(
            value = {"/synology"},
            method = {RequestMethod.GET}
    )
    public String redirectTosynology(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        model.addAttribute("params", this.mainConfig);
        // return "redirect:http://" + this.mainConfig.getIPServer() + ":8765";
        return "redirect:https://" + this.mainConfig.getDomainName() + ":8003";
    }

    @RequestMapping(
            value = {"/cv"},
            method = {RequestMethod.GET}
    )
    public String redirectToCV(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        return "redirect:https://" + this.mainConfig.getDomainName() + ":8001";
    }

    @RequestMapping(
            value = {"/ambar"},
            method = {RequestMethod.GET}
    )
    public String redirectToAmbar(HttpServletRequest request, Model model) {
        log.info("Connection ambar from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        //return "redirect:http://" + this.mainConfig.getIPServer() + ":8002";
        return "redirect:http://81.28.193.182:8004";
    }


    @RequestMapping(
            value = {"/wJsXAjZz"},
            method = {RequestMethod.GET}
    )
    public String godaddyDomaineCHeck(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        model.addAttribute("params", this.mainConfig);
        return "wJsXAjZz.html";
    }

    @RequestMapping(
            value = {"/callback"}
    )
    public String callbackFromFacebook(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURL());
        log.info("Params " + request.getParameter("access_token"));
       // model.addAttribute("params", this.mainConfig);
        return "index";
    }


    @RequestMapping(
            value = {"/google8a812a66a90f8b7a"},
            method = {RequestMethod.GET}
    )
    public String googleDomaineCHeck(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        model.addAttribute("params", this.mainConfig);
        return "google8a812a66a90f8b7a.html";
    }

}

