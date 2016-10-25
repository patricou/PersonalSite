define([], function(){

	function homeCtrl($scope, $http, $log, AppData ){    
        $log.info('Entered inside the controller homeCtrl');                     
        // Get params
        AppData.getCache().then(function(response){
            $scope.params = response.get('mainParams');
        });
        //upload file        
        $("#upload-file-input").on("change",
            function() {
                $("#upload-file-message").text("File(s) is(are) uploading .... please wait.");
                $("#upload-file-input").hide();        
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
                        $("#upload-file-message").text("File succesfully uploaded.");
                        $("#upload-file-input").show();
                    })
                    .error(function () {
                        // Handle upload error
                        $("#upload-file-message").text("File not uploaded.");
                        $("#upload-file-input").show();
                    });           
            });
    }
  
    homeCtrl.$inject=['$scope', '$http', '$log', 'AppData'];

    return homeCtrl;

});