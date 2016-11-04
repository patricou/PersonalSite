define([], function(){

	function loginCtrl($rootScope, $scope, $http, $location, $route, $log, AppData ) {
	    //log
	    $log.info('Entered inside the controller loginCtrl');     
	    // Get params
	    AppData.getCache().then(function(response){
	        $scope.params = response.get('mainParams');
	    });
	    //taken from : https://spring.io/guides/tutorials/spring-security-and-angular-js/
	    /*var self = this;
	    self.tab = function(route) {
	    	$log.info('Route inside the controller loginCtrl = ' + route);
	        return $route.current && route === $route.current.controller;
	    };*/
	    $scope.credentials = {};		   
	    // check the login on user methd on server side
	    $scope.authenticate = function(credentials) {
	        var headers = credentials ? {
	            authorization : "Basic "
	                    + btoa(credentials.username + ":"
	                            + credentials.password)
	        } : {};
	        $http({
	        	method : 'GET',
	        	url : 'user'  ,	        	
	            headers : headers
	        })
	        .then(
	        	function successCallback(response) {		            
		            console.log("Login succeeded. url :" + AppData.getprivatecache().loginurl);
	                $rootScope.authenticated = true;
	                $rootScope.userpatappli = response.data.principal.username;
	                $rootScope.messageboo = false;	                
	                $location.path( AppData.getprivatecache().loginurl);	           	            	
	        	},
	            function errorCallback(response) {
	        		console.log("Login failed")
	                $location.path("/login");
		            $rootScope.authenticated = false;		            
		            $rootScope.errorlogmessage = "Login failed ";
	                $rootScope.messageboo = true;	            	
	        	}
	  		);
	    };	      
	}

    loginCtrl.$inject = ['$rootScope','$scope', '$http', '$location', '$route', '$log', 'AppData'];

    return loginCtrl;

});