package com.pat.maison.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by patricou on 21/05/2016.
 */
@Repository
public interface UrlLinksRepository  extends JpaRepository<UrlLinks, Long> {
}
