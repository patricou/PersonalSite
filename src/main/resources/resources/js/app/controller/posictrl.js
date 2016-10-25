define([], function(){
	
	function posiCtrl($rootScope, $scope, $http, $log, AppData, $location, $window){
        //log
        $log.info('Entered inside the controller posiCtrl');        
        // Get params
        AppData.getCache().then(function(response){
            $scope.params = response.get('mainParams');
        });        

        $scope.checkboxGPS=true;
        //closures
        var mapOptions = {
            center : new google.maps.LatLng(48.853, 2.35),
            zoom : 16, 
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
             
        var map = new google.maps.Map($("#mappat")[0],mapOptions);
        $scope.countretry = 0;

        //display the map message
        function loadMap() {
            //show the alert bootstrap component
            $scope.alertpos = "alert alert-info";
            $('#alertposid').show();
            $scope.pos = {lat:0,lng:0};             
            $scope.countretry=$scope.countretry + 1;
             // Try HTML5 geolocation.
            if (navigator.geolocation) {                
                $scope.mespat = "Please wait the position to be get (20s max)";
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    $scope.alertpos = "alert alert-success";
                    $scope.pos =  pos;    
                    map.setCenter(pos);
                    $scope.mespat = "";
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: 'You are there.'
                    });
                }, function(error) {  
                    $scope.alertpos = "alert alert-danger";
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            $scope.mespat = "User denied the request for Geolocation."
                            break;
                        case error.POSITION_UNAVAILABLE:
                            $scope.mespat = "Location information is unavailable."
                            break;
                        case error.TIMEOUT:
                            $scope.mespat = "The request to get user location timed out."
                            break;
                        case error.UNKNOWN_ERROR:
                            $scope.mespat = "An unknown error occurred."
                            break;
                    }
                },
                //Options
                {
                    enableHighAccuracy: $scope.checkboxGPS,
                    timeout: 20000,
                    maximumAge: 0
                });
            } else {
                // Browser doesn't support Geolocation                
                $scope.mespat = "Browser doesn't support Geolocation";
            }

        };
        loadMap();
        $scope.restartPage=loadMap;
        // this is the only bootstrap cpmponent that has to be initialized ( tooltip )
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();  
    }			
  
    posiCtrl.$inject=['$rootScope','$scope', '$http', '$log', 'AppData', '$location', '$window'];

    return posiCtrl;

});