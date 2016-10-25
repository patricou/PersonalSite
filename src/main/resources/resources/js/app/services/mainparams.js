define([], function(){

    function MainParams($http, $q, $log){
    $log.info('Entered inside the Service MainParams ');             
    // Get the main params
    return{
        getParams : function(){
            return $http.get("rest/mainconfig",{ cache: true })
                .then(function(reponse) {                
                    $log.info('Entered inside the Service MainParams, set params ');   
                    return reponse.data;              
                });
            }          
        };
	}

	MainParams.$inject=['$http', '$q', '$log'];

    return MainParams;

});
