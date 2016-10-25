define([], function(){

	function loginCtrl($rootScope, $scope, $http, $location, $route, $log, AppData ) {
	    //log
	    $log.info('Entered inside the controller loginCtrl');     
	    // Get params
	    AppData.getCache().then(function(response){
	        $scope.params = response.get('mainParams');
	    });
	    //taken from : https://spring.io/guides/tutorials/spring-security-and-angular-js/
	    var self = this;
	    self.tab = function(route) {
	        return $route.current && route === $route.current.controller;
	        $log.info('Route inside the controller loginCtrl = ' + route);
	    };
	    var authenticate = function(credentials, callback) {
	        var headers = credentials ? {
	            authorization : "Basic "
	                    + btoa(credentials.username + ":"
	                            + credentials.password)
	        } : {};
	        $http.get('user', {
	            headers : headers
	        }).then(function(response) {
	            if (response.data.name) {
	                $rootScope.authenticated = true;
	            } else {
	                $rootScope.authenticated = false;
	            }
	            callback && callback($rootScope.authenticated);
	        }, function() {
	            $rootScope.authenticated = false;
	            callback && callback(false);
	        });
	    }
	    //authenticate();
	    self.credentials = {};
	    self.login = function() {
	        authenticate(self.credentials, function(authenticated) {
	            if (authenticated) {
	                console.log("Login succeeded. url :" + AppData.getprivatecache().loginurl);
	                $location.path( AppData.getprivatecache().loginurl);
	                self.error = false;
	                $rootScope.authenticated = true;
	            } else {
	                console.log("Login failed")
	                $location.path("/login");
	                self.error = true;
	                $rootScope.authenticated = false;
	            }
	        })
	    };
	}

    loginCtrl.$inject = ['$rootScope','$scope', '$http', '$location', '$route', '$log', 'AppData'];

    return loginCtrl;

});