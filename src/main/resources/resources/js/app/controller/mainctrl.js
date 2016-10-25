define([], function(){
   
   function mainCtrl($rootScope, $scope, $http, $log, AppData, $location, $interval, $window){
        //log
        $log.info('Entered inside the controller mainCtrl');
        // Get params            
        AppData.getCache().then(function(response){
            $scope.params = response.get('mainParams');
        });      
        // Get the links menu items
        $http.get("rest/links")
            .success(function (data, status, headers, config) {
                var linkToDisplay="";
                var x = 0;
                for (x in data) {
                    linkToDisplay+="<li class='col-sm-3'><ul>";
                    linkToDisplay+="<li class='dropdown-header'>"+data[x].categoryName+"</li>";
                    var y=0;
                    for(y in data[x].urlLinks){
                       linkToDisplay+="<li><a href="+data[x].urlLinks[y].url+" title='"+data[x].urlLinks[y].linkDescription+"'>"+data[x].urlLinks[y].linkName+"</a></li>";
                       //linkToDisplay+="<li><a ng-href='#/siteExt' ng-click=displaySite('"+data[x].urlLinks[y].url.trim()+"') title='"+data[x].urlLinks[y].linkDescription+"'>"+data[x].urlLinks[y].linkName+"</a></li>";
                    }
                    linkToDisplay+="</ul></li>";
                    if ( ( x != 0 ) &&  ((x+1) % 2 == 0) ){
                        linkToDisplay+="<li class='clearfix visible-xs'></li>";
                    }
                }
                $("#linksurl").html(linkToDisplay);
        });        
        //logout function
        $('#logoutbut').on('click',  function(){        
           $http.post('login', {}).success(function() {
                $log.info('succesfully logout');  
                $rootScope.authenticated = false;
                $location.path("/home");
            }).error(function(data) {
                $log.info('Unsuccesfully logout' + data);  
                $rootScope.authenticated = true;
                $location.path("/home");
            });
        });   
        $scope.theTime = new Date().toLocaleTimeString();
        $interval(function () {
           $scope.theTime = new Date().toLocaleTimeString();
        }, 1000);
        //unclopase function for the navbar menu ( as it is not done automatically by bootstrap)
        $('li').click(function(){            
            if (this.id != 'drm'){
                $('#myNavbar').collapse('hide');
            }
        });
    }

    mainCtrl.$inject=['$rootScope','$scope', '$http', '$log', 'AppData', '$location', '$interval', '$window'];

    return mainCtrl;

});