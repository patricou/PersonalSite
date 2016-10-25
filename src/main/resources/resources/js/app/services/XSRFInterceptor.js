define([], function(){

	function XSRFic ($cookies, $log) {
	    var XSRFInterceptor = {
	      request: function(config) {
	        var token = $cookies.get('XSRF-TOKEN');
	        if (token) {
	          config.headers['X-XSRF-TOKEN'] = token;
	          //$log.info("X-XSRF-TOKEN: " + token);
	        }
	        return config;
	      }
	    };
	    return XSRFInterceptor; 
	}

    XSRFic.$inject=['$cookies', '$log',];

    return XSRFic;

});