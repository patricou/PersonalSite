package com.pat.maison.services;

import java.util.List;
import java.util.Map;

/**
 * Created by patricou on 22/04/2016.
 */
public interface DirectoriesServices {

    public Map<String, List<String>> getAll(String rootDir);

}
