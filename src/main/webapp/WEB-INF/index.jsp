<%--
  Created by IntelliJ IDEA.
  User: patricou.
  Date: 11/06/2016
  Time: 12:05
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<html lang="en" > <!-- ng-app="myApp" ng-cloak > -->
<head >
    <!--[if IE]>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <![endif]-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="generator" content="Codeply">
    <META NAME="description" CONTENT="Personal site de Patrick Deschamps ( Patricou )">
    <META NAME="keywords" CONTENT="patrick deschamps, web, java, developper, spring, spring boot, spring mvc, rest, javascript, angularjs, jquery, requirejs, bootstrap">
    <META NAME="robots" CONTENT="all"> 
    <META NAME="Content-language" CONTENT="english">
    <META NAME="Author" CONTENT="Patrick Deschamps">
    <META HTTP-EQUIV="Reply-to" CONTENT="https://182-193-28-81.ftth.cust.kwaoo.net/#/message">
    <META NAME="Distribution" CONTENT="global">
    <META NAME="Rating" CONTENT="General">
    <title>
         Patrick Deschamps (patricou) Personal Site. 
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="js/bower_components/bootstrap/dist/css/bootstrap.css">    
    <link rel="stylesheet" href="js/bower_components/bootstrap/dist/css//bootstrap-theme.css" >
    <link rel="stylesheet" href="js/bower_components/blueimp-gallery/css/blueimp-gallery.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.1.1/animate.min.css"/>  
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">           
    <link rel="stylesheet" href="css/pat-style.css" >
</head>
<header ng-controller="mainCtrl">
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" aria-expanded="false" aria-controls="navbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>               
                <div ng-cloak>                    
                    <a class="navbar-brand active" href="#/"> {{params.displayName}} Site </a>
                </div>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="dropdown mega-dropdown" id="drm">
                        <a href="/" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-link logo-small"></span>&nbsp;Links</a>
                        <ul class="dropdown-menu mega-dropdown-menu"  id="drmm">
                            <div id="linksurl"></div>
                        </ul>
                    </li>
                    <li>
                        <a href="#/media" aria-expanded="true"><span class="glyphicon glyphicon-picture logo-small"></span>&nbsp;Media</a>
                    </li>
                    <li>
                        <a href="#/message"><span class="glyphicon glyphicon-envelope logo-small"></span>&nbsp;Message</a>
                    </li>
                    <li>
                        <a href="#/position"><span class="glyphicon glyphicon-map-marker logo-small"></span>&nbsp;Position</a>
                    </li>                                                     
                     <li>
                        <a href="#/camera"><span class="glyphicon glyphicon-facetime-video logo-small"></span>&nbsp;Camera</a>
                    </li>                      
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a id="logoutbut" ng-show="authenticated" href="" >
                        <span class="glyphicon glyphicon-log-out logo-small"></span>&nbsp;Logout {{userpatappli}}</a>
                    </li>
                    <li>
                        <a href="#/login" ng-show="!authenticated"><span class="glyphicon glyphicon-log-in logo-small"></span>&nbsp;Login </a>
                    </li>
                    <li><a href="http://www.timeanddate.com/worldclock/?sort=1">{{theTime}}</a></li>   
                </ul>
            </div>
        </div>
    </div>
</header>
<body class="ng-cloak" style="padding-top: 40px;">
    <div ng-view></div>    
</body>
<script src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC_JpzTMxi3FTB2jSl2XMe6E8tRQswbJNU"></script>
<script data-main="js/app/main" src="js/bower_components/requirejs/require.js"></script>

