define([], function() {

    function userMessage($log) {
        //log
        $log.info('Entered inside the Directive userMessage');

        let storage = firebase.storage();

        return {
            restrict: "E",
            link: function($scope, element, param, $log) {
                // If the image is a Firebase Storage URI we fetch the URL                
                let imageUri = $scope.m.imageUrl;
                //console.log('Old img url : ' + imageUri);
                let id = $scope.m.$id;
                let url = '';
                $scope.lastId = id;
                console.log('From directive : Id ' + id);
                if (imageUri) {
                    if (imageUri && imageUri.startsWith('gs://')) {
                        // retrieve the image url 
                        storage.refFromURL(imageUri).getMetadata().then(function(metadata) {
                            url = metadata.downloadURLs[0];
                            //console.log('New img url : ' + newimg);
                            $scope.retImageUri = url;
                        });
                    } else {
                        $scope.retImageUri = imageUri;
                        url = imageUri;
                    };
                    //console.log('From directive : Image Id ' + id + ' / Url : ' + url);
                    // rescroll when image is loaded
                    setTimeout(function() {
                        $('#' + id).on('load', function() {
                            //console.log('From directive : Image Id ' + id + ' loaded  / Url: ' + url);
                            $scope.scrollMessages();
                        });
                    }, 1);
                } else {
                    setTimeout(function() {
                        //console.log('From directive : add message');
                        $scope.scrollMessages();
                    }, 1);
                };
            },
            templateUrl: 'htm/usermessagedrctv.html'
        };
    };

    userMessage.$inject = ['$log'];

    return userMessage;
});