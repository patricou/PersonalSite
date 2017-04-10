define(['blueimp-gallery', 'blueimp-fullscreen'], function(blueimp, blueimpfullscreen) {

    function mediaCtrl($scope, $window, $http, $log, dirSubFilesService, AppData) {
        //log
        $log.info('Entered inside the controller mediaCtrl ');
        // Get params
        AppData.getCache().then(function(response) {
            $scope.params = response.get('mainParams');
        });
        //Get the dirs and images from first drop down list. REST request
        $('#find-dirs-images').on('click', "li", function() {
            var d = $(this).text().trim();
            $scope.currentdir = d;
            // Rest call
            var promise = dirSubFilesService.getDirFiles(d);
            promise
                .then(function successCallback(reponse) {
                    $scope.allsubdir = reponse.data.directories;
                    $scope.allimage = reponse.data.files;
                    $scope.elementlength = "dir : " + reponse.data.directories.length + " / file : " + reponse.data.files.length;
                    if (reponse.data.directories.length == 0) {
                        $("#find-images1").hide();
                        $("#find-images2").hide();
                    } else {
                        $("#find-images1").show();
                    };
                    if (reponse.data.files.length == 0) {
                        $('#image-gallery-button').hide();
                    } else {
                        $('#image-gallery-button').show();
                    };
                }, function errorCallback(response) {
                    $window.location.href = "#/login";
                });
        });
        //Get the images from 2nd drop down list. REST request
        $('#find-images1').on('click', "li", function() {
            var d = $(this).text().trim();
            $scope.currentdir = d;
            // Rest call
            var promise = dirSubFilesService.getDirFiles(d);
            promise
                .then(function successCallback(reponse) {
                    $scope.allsubsubdir = reponse.data.directories;
                    $scope.allimage = reponse.data.files;
                    $scope.elementlength = "dir : " + reponse.data.directories.length + " / file : " + reponse.data.files.length;
                    if (reponse.data.directories.length == 0) {
                        $("#find-images2").hide();
                    } else {
                        $("#find-images2").show();
                    };
                    if (reponse.data.files.length == 0) {
                        $('#image-gallery-button').hide();
                    } else {
                        $('#image-gallery-button').show();
                    };
                }, function errorCallback(response) {
                    $window.location.href = "#/login";
                });
        });
        //Get the images from 2nd drop down list. REST request
        $('#find-images2').on('click', "li", function() {
            var d = $(this).text().trim();
            $scope.currentdir = d;
            // Rest call
            var promise = dirSubFilesService.getDirFiles(d);
            promise
                .then(function successCallback(reponse) {
                    //$scope.allsubdir2 = data.directories;
                    $scope.allimage = reponse.data.files;
                    $scope.elementlength = "dir : " + reponse.data.directories.length + " / file : " + reponse.data.files.length;
                    if (reponse.data.files.length == 0) {
                        $('#image-gallery-button').hide();
                    } else {
                        $('#image-gallery-button').show();
                    };
                }, function errorCallback(response) {
                    $window.location.href = "#/login";
                });
        });
        //Put in full screen
        $scope.currentfullscreen = true;
        $('#fullscreen').on('click', function() {
            $scope.currentfullscreen = $(this).is(':checked');
            //alert("currentfull : "+$scope.currentfullscreen);
            $('#blueimp-gallery').data('fullScreen', $(this).is(':checked'));
        });
        // launch gallery
        $('#image-gallery-button').on('click', function(event) {
            event.preventDefault();
            var options = {
                slideshowInterval: 500
            };
            blueimp($('#links a'), $('#blueimp-gallery').data());
            //blueimp.Gallery($('#links'), options);
        });
        // hide subirdir and subsubdirbutton and disable launch button
        $("#find-images1").hide();
        $("#find-images2").hide();
        $('#image-gallery-button').hide();
        // Get the list of directories from root
        dirSubFilesService.getDirFiles('')
            .success(function(data, status, headers, config) {
                $scope.alldir = data.directories;
                $scope.allimage = data.files;
            });
    }

    mediaCtrl.$inject = ['$scope', '$window', '$http', '$log', 'dirSubFilesService', 'AppData'];

    return mediaCtrl;

});