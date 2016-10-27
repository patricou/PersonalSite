package com.pat.maison.web;

import com.pat.maison.config.MainConfig;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller("error")
public class IndexController implements ErrorController{

    private static Logger log = Logger.getLogger(CentralHome.class);
    private static final String PATH = "/error";
    private final ErrorAttributes    errorAttributes;

    @Autowired
    MainConfig mainConfig;

    @Autowired
    public IndexController(ErrorAttributes errorAttributes) {
        Assert.notNull(errorAttributes, "ErrorAttributes must not be null");
        this.errorAttributes = errorAttributes;
    }

    @RequestMapping(value= PATH)
    public  String  error(HttpServletRequest request, Model model) {
        log.info("Connection from " + request.getRemoteAddr() + " to " + request.getRequestURI());
        model.addAttribute("params", this.mainConfig);

        Map<String, Object> body = getErrorAttributes(request,getTraceParameter(request));
        String trace = (String) body.get("trace");
        if(trace != null){
            String[] lines = trace.split("\n\t");
            body.put("trace", lines);
        }
        model.addAttribute("error", body );
        // return body;

        return "error";

    }

    @Override
    public String getErrorPath() {
        return PATH;
    }

    private boolean getTraceParameter(HttpServletRequest request) {
        String parameter = request.getParameter("trace");
        if (parameter == null) {
            return false;
        }
        return !"false".equals(parameter.toLowerCase());
    }

    private Map<String, Object> getErrorAttributes(HttpServletRequest aRequest, boolean includeStackTrace) {
        RequestAttributes requestAttributes = new ServletRequestAttributes(aRequest);
        return errorAttributes.getErrorAttributes(requestAttributes, includeStackTrace);
    }
}
