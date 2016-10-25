require.config({
	paths : {
		"angular"           : "bower_components/angular/angular",
		"jQuery"            : "bower_components/jquery/dist/jquery",
		"bootstrap"         : "bower_components/bootstrap/dist/js/bootstrap",
		"angular-route"     : "bower_components/angular-route/angular-route",
		"angular-messages"  : "bower_components/angular-messages/angular-messages",
		"angular-cookies"   : "bower_components/angular-cookies/angular-cookies",
		"blueimp-gallery"   : "bower_components/blueimp-gallery/js/blueimp-gallery",
		"blueimp-helper"    : "bower_components/blueimp-gallery/js/blueimp-helper",		
		"blueimp-fullscreen": "bower_components/blueimp-gallery/js/blueimp-gallery-fullscreen",
		"apppat"			: "app/app"
		//"appconf"			: "app/config/config",
		//"appdata"			: "app/services/appdata",
		//"google-maps"       : "bower_components/js/index"
	},
	shim : {
		'angular'  : {
			exports : "angular"
		},
		'angular-route'  : {
			exports : "ngRoute",
			deps: ['angular']
		},
		'angular-messages'  : {
			exports : "ngMessages",
			deps: ['angular']
		},
		'angular-cookies'  : {
			exports : "ngCookies",
			deps: ['angular']
		},
		// not needed to put jQuery in the shim part as it has been defined as AMD module
		//'jQuery': {
        //    exports: '$'
        //},
		'bootstrap': {
            exports: 'bootstrap',
            "deps" : ['jQuery']
        },
		'blueimp-gallery': {
            exports: 'blueimp',
            "deps" : ['blueimp-helper']
        },
		'blueimp-helper': {
            exports: 'blueimphelper',
            "deps" : ['jQuery']
        } ,
		'blueimp-fullscreen': {
            exports: 'blueimpfullscreen',
            "deps" : ['blueimp-gallery']
        },
        'apppat':{
        	exports: 'App' 
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