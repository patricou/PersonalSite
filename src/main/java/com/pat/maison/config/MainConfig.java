package com.pat.maison.config;

import org.apache.log4j.Logger;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by patricou on 08/05/2016.
 */
@Component
@ConfigurationProperties(prefix = "appli")
public class MainConfig {

    private static Logger log = Logger.getLogger(MainConfig.class);
    private String imagesDir;
    private String uploadDir;
    private String displayName;
    private String displayNameCopyright;
    private String mainPageImage;
    private String mainPageVideo;
    private String sendailTo;
    private String sendailFrom;
    private String IPServer;
    private String domainName;

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getIPServer() {
        return IPServer;
    }

    public void setIPServer(String IPServer) {
        this.IPServer = IPServer;
    }

    public void setImagesDir(String imagesDir) {
        this.imagesDir = imagesDir;
    }

    public String getImagesDir() {
        return imagesDir;
    }

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

    public static Logger getLog() {
        return log;
    }

    public static void setLog(Logger log) {
        MainConfig.log = log;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayNameCopyright() {
        return displayNameCopyright;
    }

    public void setDisplayNameCopyright(String displayNameCopyright) {
        this.displayNameCopyright = displayNameCopyright;
    }

    public String getMainPageImage() {
        return mainPageImage;
    }

    public void setMainPageImage(String mainPageImage) {
        this.mainPageImage = mainPageImage;
    }

    public String getSendailTo() {
        return sendailTo;
    }

    public void setSendailTo(String sendailTo) {
        this.sendailTo = sendailTo;
    }

    public String getSendailFrom() {
        return sendailFrom;
    }

    public void setSendailFrom(String sendailFrom) {
        this.sendailFrom = sendailFrom;
    }

    public String getMainPageVideo() {
        return mainPageVideo;
    }

    public void setMainPageVideo(String mainPageVideo) {
        this.mainPageVideo = mainPageVideo;
    }
}
