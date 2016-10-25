define([], function(){
	
	function messCtrl($rootScope, $scope, $http, $log, AppData, $location, $window){
        //log
        $log.info('Entered inside the controller messCtrl');        
        // Get params
        AppData.getCache().then(function(response){
            $scope.params = response.get('mainParams');
        });
        //Submit message
         $scope.postMail = function () {  
            $http({
                method  : 'POST',
                url     : 'postmessage',
                data    : $scope.patmessage, //forms user object
                //headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
            .success(function(data) {                                               
                //open the modal window
                $('#alertmessage').modal();
                $scope.messageclass = "alert alert-success";
                $scope.statusmessage = "Message succesfully sent ! " + data;
                //$location.path("#/");
            }).error(function(data, status){
                $('#alertmessage').modal();
                $scope.messageclass = "alert alert-danger";
                $scope.statusmessage = "Message not sent : "+ data+" "+status;
            });
        };
    }			
  
    messCtrl.$inject=['$rootScope','$scope', '$http', '$log', 'AppData', '$location', '$window'];

    return messCtrl;

});