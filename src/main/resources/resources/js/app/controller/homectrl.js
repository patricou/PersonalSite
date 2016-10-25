define([], function(){

	function homeCtrl($scope, $http, $log, AppData ){    
        $log.info('Entered inside the controller homeCtrl');                     
        // Get params
        AppData.getCache().then(function(response){
            $scope.params = response.get('mainParams');
        });
        $scope.homelabel=true;
        $("#upload-file-input").on("enter",function(){$scope.homelabel=true;});
        //upload file        
        $("#upload-file-input").on("change",
            function() {
                $scope.uploadmessage="File(s) is(are) uploading .... please wait.";
                $scope.homelabel=true;
                $scope.alertload="bg-info";
                var request = {
                    method: 'POST',
                    url: "rest/uploadFile",
                    data: new FormData($("#upload-file-form")[0]),
                    headers: {
                        'Content-Type': undefined
                    }
                };  
                // SEND THE FILES.
                $http(request)
                    .success(function (data) {
                        // Handle upload success
                        $scope.uploadmessage="File succesfully uploaded.";
                        $scope.homelabel=false;
                        $scope.alertload="bg-success";
                    })
                    .error(function () {
                        // Handle upload error
                        $scope.uploadmessage="File not uploaded.";
                        $scope.homelabel=false;
                        $scope.alertload="bg-danger";
                    });           
            });
    }
  
    homeCtrl.$inject=['$scope', '$http', '$log', 'AppData'];

    return homeCtrl;

});