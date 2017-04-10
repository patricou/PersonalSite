package com.pat.maison.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * Created by patricou on 21/05/2016.
 */
@RepositoryRestResource(collectionResourceRel = "link", path = "link")
public interface CategoryLinksRepository   extends JpaRepository<CategoryLink, Long> {
}

