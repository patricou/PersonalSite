require.config({
    paths: {
        "pubnub": "https://cdn.pubnub.com/pubnub",
        "webrtc": "bower_components/webrtc/webrtc-v2",
        "firebase": "https://www.gstatic.com/firebasejs/3.6.10/firebase",
        "material": "https://code.getmdl.io/1.1.3/material.min",
        "angular": "bower_components/angular/angular",
        "jQuery": "bower_components/jquery/dist/jquery.min",
        "aos": "https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos",
        "bootstrap": "bower_components/bootstrap/dist/js/bootstrap",
        "angularfire": "https://cdn.firebase.com/libs/angularfire/2.0.1/angularfire.min",
        "angular-route": "bower_components/angular-route/angular-route",
        "angular-messages": "bower_components/angular-messages/angular-messages",
        "angular-cookies": "bower_components/angular-cookies/angular-cookies",
        "blueimp-gallery": "bower_components/blueimp-gallery/js/blueimp-gallery",
        "blueimp-helper": "bower_components/blueimp-gallery/js/blueimp-helper",
        "blueimp-fullscreen": "bower_components/blueimp-gallery/js/blueimp-gallery-fullscreen",
        "appconfig": "app/config/config",
        "appchatctrl": "app/controller/chatctrl",
        "apppat": "app/app"
            //"appconf"			: "app/config/config",
            //"appdata"			: "app/services/appdata",
            //"google-maps"       : "bower_components/js/index"
    },
    shim: {
        'webrtc': {
            exports: "webrtc",
            deps: ['pubnub']
        },
        'pubnub': {
            exports: "pubnub"
        },
        'appchatctrl': {
            exports: "appchatctrl",
            deps: ['firebase']
        },
        'firebase': {
            exports: "firebase",
            deps: ['material']
        },
        'material': {
            exports: "material"
        },
        'angular': {
            exports: "angular",
            deps: ['firebase']
        },
        'angularfire': {
            exports: "angularfire",
            deps: ['angular']
        },
        'angular-route': {
            exports: "ngRoute",
            deps: ['angular']
        },
        'angular-messages': {
            exports: "ngMessages",
            deps: ['angular']
        },
        'angular-cookies': {
            exports: "ngCookies",
            deps: ['angular']
        },
        // not needed to put jQuery in the shim part as it has been defined as AMD module
        'jQuery': {
            exports: '$'
        },
        'oas': {
            exports: 'aos',
            "deps": ['jQuery']
        },
        'bootstrap': {
            exports: 'bootstrap',
            "deps": ['jQuery']
        },
        'blueimp-gallery': {
            exports: 'blueimp',
            "deps": ['blueimp-helper']
        },
        'blueimp-helper': {
            exports: 'blueimphelper',
            "deps": ['jQuery']
        },
        'blueimp-fullscreen': {
            exports: 'blueimpfullscreen',
            "deps": ['blueimp-gallery']
        },
        'apppat': {
            exports: 'App',
            "deps": ['appconfig']
        },
        'appconfig': {
            exports: 'appconfig',
            "deps": ['angular']
        }
        //'google-maps':{
        //	exports: 'googlemaps'
        //}              
    },
    baseUrl: 'js'
});


require(['apppat'],
    function(App) {
        App.initialize();
    }
);