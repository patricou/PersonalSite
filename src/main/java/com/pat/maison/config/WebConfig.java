package com.pat.maison.config;

import com.pat.maison.config.MainConfig;
import org.h2.server.web.WebServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import java.util.concurrent.TimeUnit;

/**
 * Created by patricou on 05/04/2016 web configuration class in which we can configure a lot of think :
 * see the book : Spring Boot Cookbook
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

    //Configuring custom static path mappings
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String myExternalFilePath = "file:///"+mainConfig.getImagesDir();
        registry.addResourceHandler("/image/**").addResourceLocations(myExternalFilePath);

        super.addResourceHandlers(registry);
    }

    @Bean
    ServletRegistrationBean h2servletRegistration(){
        ServletRegistrationBean registrationBean = new ServletRegistrationBean( new WebServlet());
        registrationBean.addUrlMappings("/console/*");
        registrationBean .addInitParameter("webAllowOthers", "true");
        return registrationBean;
    }
    /* set session time out to 10 minutes ( could have been done in application.properties
    *   but done here for demonstration, no impact for security
    */
    @Bean
    public EmbeddedServletContainerCustomizer
    embeddedServletContainerCustomizer() {
        return new EmbeddedServletContainerCustomizer() {
            @Override
            public void
            customize(ConfigurableEmbeddedServletContainer
                              container) {
                container.setSessionTimeout(10, TimeUnit.SECONDS);
            }
        };
    }

}
