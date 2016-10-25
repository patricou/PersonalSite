define([], function(){    
	
    function  dirsubfilesservice ($http, $log) {
	    $log.info('Entered inside the Service dirSubFilesService');             
	    return {
	        getDirFiles : function (dir) {
	            $log.info('Entered inside the Service dirSubFilesService, search contains of '+ dir );   
	            return $http({method: 'GET', url: 'rest/dirsublist' + dir });           
	        }
	    }
	}

    dirsubfilesservice.$inject=['$http', '$log',];

    return dirsubfilesservice;

});			