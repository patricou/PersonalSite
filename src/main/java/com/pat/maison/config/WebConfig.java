package com.pat.maison.config;

import com.pat.maison.config.MainConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

/**
 * Created by patricou on 05/04/2016.
 */
@Configuration
@EnableAsync
@ComponentScan
public class WebConfig extends WebMvcConfigurerAdapter {

    @Autowired
    MainConfig mainConfig;

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //registry.addViewController("/").setViewName("mainpage");
        registry.addViewController("/login").setViewName("login");
        //registry.addViewController("/logout").setViewName("logoutSuccess");
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
            InternalResourceViewResolver resolver = new InternalResourceViewResolver();
            resolver.setPrefix("/WEB-INF/");
            resolver.setSuffix(".jsp");
            resolver.setViewClass(JstlView.class);
            registry.viewResolver(resolver);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String myExternalFilePath = "file:///"+mainConfig.getImagesDir();
        registry.addResourceHandler("/image/**").addResourceLocations(myExternalFilePath);

        super.addResourceHandlers(registry);
    }
}
