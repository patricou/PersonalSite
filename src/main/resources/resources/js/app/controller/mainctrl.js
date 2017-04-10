define(['aos'], function(aos) {

    function mainCtrl($rootScope, $scope, $http, $log, AppData, $location, $interval, $window, $templateCache) {
        //log
        $log.info('Entered inside the controller mainCtrl');
        //init animation
        aos.init({ disable: 'mobile' });
        $('[data-bs-hover-animate]')
            .mouseenter(function() {
                var elem = $(this);
                elem.addClass('animated ' + elem.attr('data-bs-hover-animate'))
            })
            .mouseleave(function() {
                var elem = $(this);
                elem.removeClass('animated ' + elem.attr('data-bs-hover-animate'))
            });
        // Get params            
        AppData.getCache().then(function(response) {
            $scope.params = response.get('mainParams');
        });
        // Get the links menu items
        $http.get("rest/links")
            .success(function(data, status, headers, config) {
                var linkToDisplay = "";
                var x = 0;
                for (x in data) {
                    linkToDisplay += "<li class='col-sm-3'><ul class='mega-dropdown-element'>";
                    linkToDisplay += "<li>" + data[x].categoryName + "</li>";
                    var y = 0;
                    for (y in data[x].urlLinks) {
                        linkToDisplay += "<li class='dropdown-element'><a href=" + data[x].urlLinks[y].url + " title='" + data[x].urlLinks[y].linkDescription + "'>" + data[x].urlLinks[y].linkName + "</a></li>";
                        //linkToDisplay+="<li><a ng-href='#/siteExt' ng-click=displaySite('"+data[x].urlLinks[y].url.trim()+"') title='"+data[x].urlLinks[y].linkDescription+"'>"+data[x].urlLinks[y].linkName+"</a></li>";
                    }
                    linkToDisplay += "</ul></li>";
                    if ((x != 0) && ((x + 1) % 2 == 0)) {
                        linkToDisplay += "<li class='clearfix visible-xs'></li>";
                    }
                }
                $("#linksurl").html(linkToDisplay);
            });
        //logout function
        $('#logoutbut').on('click', function() {
            $http.post('login', {}).success(function() {
                $log.info('succesfully logout');
                $rootScope.authenticated = false;
                $location.path("/home");
                // remove cache with html page when logout
                $templateCache.removeAll();
            }).error(function(data) {
                $log.info('Unsuccesfully logout' + data);
                $rootScope.authenticated = true;
                $location.path("/home");
            });
        });
        $scope.theTime = new Date().toLocaleTimeString();
        $interval(function() {
            $scope.theTime = new Date().toLocaleTimeString();
        }, 1000);
        //unclopase function for the navbar menu ( as it is not done automatically by bootstrap)
        $('.closemenu').click(function() {
            if (this.id != 'drm') {
                $('#myNavbar').collapse('hide');
            }
        });
        //for the initialisation of the login button ( in case if a refresh is done on the browser page is done by the user)
        $http({
                method: 'GET',
                url: 'user'
                    //headers : headers
            })
            .then(
                function successCallback(response) {
                    $log.info("ALready logged");
                    $rootScope.userpatappli = response.data.principal.username;
                    $rootScope.authenticated = true;
                    //$location.path("/home");
                },
                function errorCallback(response) {
                    $log.info("Not Already logged. Come from " + $location.path());
                    //$location.path("/home");
                    $rootScope.authenticated = false;
                }
            );
    }

    mainCtrl.$inject = ['$rootScope', '$scope', '$http', '$log', 'AppData', '$location', '$interval', '$window', '$templateCache'];

    return mainCtrl;

});