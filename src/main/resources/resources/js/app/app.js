/**
    * Created by patricou on 11/06/2016.
**/
'use strict';
// module loaded with requireJS
define(
    ["angular","jQuery","bootstrap","angular-route","angular-messages",
     "angular-cookies","blueimp-helper","blueimp-gallery","blueimp-fullscreen",
     "app/config/config","app/controller/mainctrl","app/controller/homectrl","app/controller/mediactrl",
     "app/controller/loginctrl","app/controller/messctrl","app/controller/posictrl","app/controller/cameractrl",
     "app/services/XSRFInterceptor","app/services/appdata","app/services/mainparams","app/services/dirsubfilesservice"],

    function BaseManager(angular, $, bootstrap, ngRoute, ngMessages, ngCookies, blueimphelper, blueimp, blueimpfullscreen, 
    		config, mainCtrl, homeCtrl, mediaCtrl, loginCtrl, messCtrl, posiCtrl, cameraCtrl, XSRFInterceptor, appdata, mainparams, 
    		dirsubfilesservice ){

        var initialize = function () {

			/**
			 * application routeApp declaration ( modules loaded with AngularJS ).
			 */
			var routeApp = angular.module('myApp', [
			    // Dépendances du "module"
			    'ngRoute',
			    'ngCookies', 
			    'ngMessages'
			]);
			// Main module configuration : routeApp ( modules loaded with AngularJS )
			routeApp.config(config); 
			// Controllers 
			routeApp.controller('mainCtrl',   mainCtrl);			
			routeApp.controller('homeCtrl',   homeCtrl);
			routeApp.controller('mediaCtrl',  mediaCtrl);
			routeApp.controller('loginCtrl',  loginCtrl);			
			routeApp.controller('messCtrl',   messCtrl);
			routeApp.controller('posiCtrl',   posiCtrl);
			routeApp.controller('cameraCtrl', cameraCtrl);
			// Providers ( to be able to be used in config )
			routeApp.provider('AppCache',
				function(){
					this.$get = function ($cacheFactory) {  
			    		return $cacheFactory('AppCache', {capacity:40});
					}
				}
			);
			routeApp.provider('AppData', appdata);
			// Services
			routeApp.factory('XSRFInterceptor', XSRFInterceptor);			
			routeApp.factory('MainParams', mainparams);			
			routeApp.factory('dirSubFilesService', dirsubfilesservice);

			
		    angular.bootstrap(document,["myApp"]);
    	};

    return {
        initialize : initialize
    };
});