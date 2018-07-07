define([], function() {

    function homeCtrl($scope, $http, $log, AppData) {
        $log.info('Entered inside the controller homeCtrl');
        // Get params
        AppData.getCache().then(function(response) {
            $scope.params = response.get('mainParams');
        });
        $scope.uploadmessage = '';
        $scope.chkVal1 = false;
        $scope.chkVal2 = "To be parsed";
        $("#chk1").on("change",
            function(){
                if ($scope.chkVal1 == true){
                    $scope.chkVal2 = "To be parsed";
                    $log.info("To be parsed");
                } else {
                    $scope.chkVal2 = "To not be parsed";
                    $log.info("To not be parsed");
                };
            });

        //upload file        
        $("#upload-file-form").on("change",
            function() {
                $scope.uploadmessage = "PLEASE, WAIT !!";
                $scope.alertload = "bg-info";
                var file = new FormData($("#upload-file-form")[0]);
                var request = {
                    method: 'POST',
                    url: "rest/uploadFile",
                    //data: {uploadfile:new FormData($("#upload-file-form")[0]), p2:$scope.chkVal1},
                    data: new FormData($("#upload-file-form")[0]),
                    headers: {
                        'Content-Type': undefined,
                        'to-be-parsed':$scope.chkVal1
                    }
                };
                // SEND THE FILES.
                $http(request)
                    .success(function(data) {
                        // Handle upload success
                        $scope.uploadmessage = "GOOD !!";
                        $scope.alertload = "bg-success";
                        setTimeout(function() {
                            $scope.uploadmessage = '';
                        }, 1000);
                    })
                    .error(function() {
                        // Handle upload error
                        $scope.uploadmessage = "ERROR !!";
                        $scope.alertload = "bg-danger";
                        setTimeout(function() {
                            $scope.uploadmessage = '';
                        }, 1000);
                        $log.info("File Upload issue");
                    });
            });
    }

    homeCtrl.$inject = ['$scope', '$http', '$log', 'AppData'];

    return homeCtrl;

});