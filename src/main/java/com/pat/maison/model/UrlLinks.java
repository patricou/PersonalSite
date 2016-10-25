package com.pat.maison.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.omg.CORBA.ServerRequest;

import javax.persistence.*;

/**
 * Created by patricou on 21/05/2016.
 */
@Entity
public class UrlLinks {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade=CascadeType.ALL)
    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id", scope=ServerRequest.class)
    private CategoryLink categoryLink;

    private String linkName;
    private String url;
    private String linkDescription;

    private UrlLinks(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CategoryLink getCategoryLink() {
        return categoryLink;
    }

    public void setCategoryLink(CategoryLink categoryLink) {
        this.categoryLink = categoryLink;
    }

    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLinkDescription() {
        return linkDescription;
    }

    public void setLinkDescription(String linkDescription) {
        this.linkDescription = linkDescription;
    }

    public UrlLinks(String linkName, String url, String linkDescription) {
        this.linkName = linkName;
        this.url = url;
        this.linkDescription = linkDescription;
    }

    public UrlLinks(CategoryLink categoryLink, String linkName, String url, String linkDescription) {
        this.categoryLink = categoryLink;
        this.linkName = linkName;
        this.url = url;
        this.linkDescription = linkDescription;
    }

    @Override
    public String toString() {
        return getId() + " : " + getLinkName() + " " +getUrl() + " " + getLinkDescription() + " " + getCategoryLink().toString() ;
    }
}
