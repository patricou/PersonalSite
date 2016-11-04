define([], function(){

	// function returned as a provider	--> with : this.$get
	function appData(){

		var cache = {};
		this.setprivatecache = function(field,data){		 			
		    cache[field] = data;
		};
		// Note : AppCache is also a provider, but not sure it can't be a service as $log
     	this.$get = function appData(AppCache, MainParams,$q,$timeout,$log) {  

		    var cacheFct = {
		    	getCache : function(){
		        	// Typicall promise exemple
		        	var deferred = $q.defer();
		        	// Get params
		        	if (AppCache.get('mainParams') === undefined ){
			            MainParams.getParams().then(function(reponse){                             
		                	AppCache.put('mainParams', reponse); 
		                	deferred.resolve(AppCache);
		            	});
		        	} else
		        	{
			            deferred.resolve(AppCache);
		        	}
		        	// send back only when resolved
		        	return deferred.promise;
		    	},		    	
		    	getprivatecache : function(){
		    		// $log.info('cache : ' + cache.loginurl );             
		    	 	return cache;
		    	},
		    	// to check if we really need to put his method twice ....
		    	setprivatecache : function(field,data){		 			
		  			cache[field] = data;
				}				
		    };

		    return cacheFct;
		};
	}

	// function returned unitl there
	// If I uncomment this line, it doesn't find appCache
	//appData.$inject=['AppCache', 'MainParams','$q','$timeout','$log'];
	//appData.$inject=['$log'];
    return appData;

});
