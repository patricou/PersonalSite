/**
 * Main module configuration : routeApp
 */
define([], function(){

    function config($routeProvider,$httpProvider, AppDataProvider,$sceDelegateProvider) {
        // To include files from another domain, add a whitelist of legal files and/or domains
        //$sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
        //    'self',
             // Allow loading from other domain.          
        //    'https://www.tutorialspoint.com/**'
        //]);
        // Push in the Header the X-XSRF-TOKEN token to not have CSRF issue
        $httpProvider.interceptors.push('XSRFInterceptor');
        // allow to call htm/login.html page when authentication error
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        // routing system
        $routeProvider
            .when('/', {
                templateUrl: 'htm/home.html',
                controller: 'homeCtrl',
                controllerAs: 'controller'
            })
            .when('/login', {
                templateUrl: 'htm/login.html',
                controller: 'loginCtrl',
                controllerAs: 'controller'
            })
            .when('/media', {
                templateUrl: 'htm/media.html',
                controller: 'mediaCtrl',
                controllerAs: 'controller'
            })
            .when('/message', {
                templateUrl: 'htm/message.html',
                controller: 'messCtrl',
                controllerAs: 'controller'
            })  
            .when('/position', {
                templateUrl: 'htm/position.html',
                controller: 'posiCtrl',
                controllerAs: 'controller'
            }) 
            .when('/camera', {
                templateUrl: 'htm/camera.html',
                controller: 'cameraCtrl',
                controllerAs: 'controller'
            }) 
            //.when('/rest/dirsublist/:directory?', {
            //    templateUrl: 'htm/media.html',
            //    controller: 'mediaCtrl',
            //    controllerAs: 'controller'
            //})
            .otherwise({
                redirectTo: '/'
            });
        /* Register error provider that shows message on failed requests or redirects to login page on
         * unauthenticated requests */
        $httpProvider.interceptors.push(function ($q, $rootScope, $location, $log) {
                return {
                    'responseError': function(rejection) {
                        var status = rejection.status;
                        var config = rejection.config;
                        var method = config.method;
                        var url = config.url;
                        // store the varaible to find the root after a login                        
                        //$log.info('Login request for url '+ url.split("/")[1].split(".")[0] );                                     
                        AppDataProvider.setprivatecache('loginurl','/'+ url.split("/")[1].split(".")[0] );
                        if (status == 401) {
                            $location.path( "/login" );
                        } else {
                            $rootScope.error = method + " on " + url + " failed with status " + status;
                        }
                        return $q.reject(rejection);
                    }
                };
            }
        );
    };

    config.$inject=['$routeProvider','$httpProvider','AppDataProvider','$sceDelegateProvider'];

    return config;

});