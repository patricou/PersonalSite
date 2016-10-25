define([], function(){

	function cameraCtrl($rootScope, $scope, $http, $location, $route, $log, AppData ){
	    //log
	    $log.info('Entered inside the controller cameraCtrl');     
	    // Get params
	    AppData.getCache().then(function(response){
	        $scope.params = response.get('mainParams');
		});
		
	}
		    
    cameraCtrl.$inject = ['$rootScope','$scope', '$http', '$location', '$route', '$log','AppData'];

    return cameraCtrl;
});