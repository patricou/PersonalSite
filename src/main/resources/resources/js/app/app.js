/**
 * Created by patricou on 11/06/2016.
 **/
'use strict';
// module loaded with requireJS
define(
    ["angular", "jQuery", "bootstrap", "angular-route", "angular-messages", "firebase", "angularfire", "material",
        "angular-cookies", "blueimp-helper", "pubnub", /*"blueimp-gallery", "blueimp-fullscreen", --> loaded only in the mediaCtrl*/
        "appconfig", "app/controller/mainctrl", "app/controller/homectrl", "app/controller/mediactrl",
        "app/controller/loginctrl", "app/controller/messctrl", "app/controller/posictrl", "app/controller/cameractrl", "appchatctrl",
        "app/services/XSRFInterceptor", "app/services/appdata", "app/services/mainparams", "app/services/dirsubfilesservice", "app/directives/usermessagedirective"
    ],

    function BaseManager(angular, $, bootstrap, ngRoute, ngMessages, firebase, angularfire, material, ngCookies, blueimphelper, pubnub, /* blueimp, blueimpfullscreen, */
        appconfig, mainCtrl, homeCtrl, mediaCtrl, loginCtrl, messCtrl, posiCtrl, cameraCtrl, appchatctrl, XSRFInterceptor, appdata, mainparams, dirsubfilesservice, userMessage) {

        var initialize = function() {
            /**
             * application routeApp declaration ( modules loaded with AngularJS ).
             */
            var routeApp = angular.module('myApp', [
                // Dépendances du "module"
                'ngRoute',
                'ngCookies',
                'ngMessages',
                'firebase'
            ]);
            // Main module configuration : routeApp ( modules loaded with AngularJS )
            routeApp.config(appconfig);
            //directives
            routeApp.directive('userMessage', userMessage);
            // Controllers 
            routeApp.controller('mainCtrl', mainCtrl);
            routeApp.controller('homeCtrl', homeCtrl);
            routeApp.controller('mediaCtrl', mediaCtrl);
            routeApp.controller('loginCtrl', loginCtrl);
            routeApp.controller('messCtrl', messCtrl);
            routeApp.controller('posiCtrl', posiCtrl);
            routeApp.controller('cameraCtrl', cameraCtrl);
            routeApp.controller('chatCtrl', appchatctrl);
            // Providers ( to be able to be used in config )
            routeApp.provider('AppCache',
                function() {
                    this.$get = function($cacheFactory) {
                        return $cacheFactory('AppCache', { capacity: 40 });
                    }
                }
            );
            routeApp.provider('AppData', appdata);
            // Services
            routeApp.factory('XSRFInterceptor', XSRFInterceptor);
            routeApp.factory('MainParams', mainparams);
            routeApp.factory('dirSubFilesService', dirsubfilesservice);
            // Filters
            routeApp
                .filter('reverseArray', function() {
                    return function(items) {
                        return items.slice().reverse();
                    };
                });

            angular.bootstrap(document, ["myApp"]);
        };

        return {
            initialize: initialize
        };
    });