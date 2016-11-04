package com.pat.maison.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.omg.CORBA.ServerRequest;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by patricou on 21/05/2016.
 */
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property="id", scope=ServerRequest.class)
@Entity
@Table(name = "categorylink")
public class CategoryLink {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="categorylink_id")
    private Long categorylinkId;

    @OneToMany(mappedBy = "categoryLink")
    private List<UrlLinks> urlLinks = new ArrayList<UrlLinks>();

    @Column(name="categoryname")
    private String categoryName;
    @Column(name="categorydescription")
    private String categoryDescription;

    public Long getCategorylinkId() {
        return categorylinkId;
    }

    public void setCategorylinkId(Long categorylinkId) {
        this.categorylinkId = categorylinkId;
    }

    public List<UrlLinks> getUrlLinks() {
        return urlLinks;
    }

    public void setUrlLinks(List<UrlLinks> urlLinks) {
        this.urlLinks = urlLinks;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public CategoryLink(String categoryName, String categoryDescription) {
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
    }

    private CategoryLink(){
    }

    @Override
    public String toString() {
        return getCategorylinkId() +  " : " + getCategoryName();
    }

}
