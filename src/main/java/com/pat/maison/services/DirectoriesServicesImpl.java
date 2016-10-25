package com.pat.maison.services;

import com.pat.maison.config.MainConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

import org.apache.log4j.Logger;

/**
 * Created by patricou on 22/04/2016.
 */
@Component
class DirectoriesServiceImp implements DirectoriesServices {

    private static org.apache.log4j.Logger log = Logger.getLogger(DirectoriesServiceImp.class);

    @Autowired
    MainConfig mainConfig;

    public Map<String, List<String>> getAll(String rootDir){
        Map<String,List<String>> mapFileDir = new Hashtable<String,List<String>>();
        List<String> directories = new ArrayList<String>();
        List<String> files = new ArrayList<String>();

        DirectoryStream.Filter<Path> filter = new DirectoryStream.Filter<Path>() {
            public boolean accept(Path file) throws IOException {
                return (Files.isDirectory(file) || file.getFileName().toString().endsWith(".jpg")
                        || file.getFileName().toString().endsWith(".png")
                        || file.getFileName().toString().endsWith(".jpeg")
                        || file.getFileName().toString().endsWith(".gif")
                        || file.getFileName().toString().endsWith(".JPG")
                        || file.getFileName().toString().endsWith(".PNG")
                        || file.getFileName().toString().endsWith(".JPEG")
                        || file.getFileName().toString().endsWith(".GIF"));
            }
        };

        try {
            rootDir = StringUtils.isEmpty(rootDir)?"":rootDir;
            Path dir = Paths.get( mainConfig.getImagesDir() + rootDir ) ;
            DirectoryStream<Path> stream = Files.newDirectoryStream(dir,filter);
            for (Path path : stream) {
                if (!Files.isDirectory(path))
                    files.add(rootDir.toString()+"/"+path.getFileName().toString());
                else
                    directories.add(rootDir.toString()+"/"+path.getFileName().toString());
            }
            stream.close();
        }catch (IOException | DirectoryIteratorException ex) {
            ex.printStackTrace();
        };
        Collections.sort(directories);
        Collections.reverse(directories);
        Collections.sort(files);
        //Collections.reverse(files);
        mapFileDir.put("directories",directories);
        mapFileDir.put("files",files);
        return mapFileDir;
    }
}
