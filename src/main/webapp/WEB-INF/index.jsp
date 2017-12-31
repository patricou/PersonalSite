<%--
  Created by IntelliJ IDEA.
  User: patricou.
  Date: 11/06/2016
  Time: 12:05
  To change this template use File | Settings | File Templates.
--%>
    <!DOCTYPE html>
    <html lang="en">
    <!-- ng-app="myApp" ng-cloak > -->

    <head>
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
        <link rel="stylesheet" href="js/bower_components/bootstrap/dist/css//bootstrap-theme.css">
        <link rel="stylesheet" href="js/bower_components/blueimp-gallery/css/blueimp-gallery.css">
        <link rel="stylesheet" href="css/aos/Features-Boxed.css">
        <link rel="stylesheet" href="css/aos/Footer-Basic.css">
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.css">
        <!-- social button -->
        <link rel="stylesheet" href="css/bootstrap-social.css">
        <!-- for the chat -->
        <!-- Material Design Lite -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <!--<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.orange-indigo.min.css">-->
        <!-- App Styling -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
        <!-- Pat style -->
        <link rel="stylesheet" href="css/pat-style.css">
        <!-- Favicon-->
        <link rel="shortcut icon" type="image/jpg" href="img/favicon/pat.jpg">
    </head>
    <header ng-controller="mainCtrl" ng-cloak>
        <nav class="navbar navbar-inverse navbar-fixed-top" data-aos="fade-down">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" aria-expanded="false" aria-controls="navbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                    <div>
                        <a class="navbar-brand navbar-link" href="#/" data-bs-hover-animate="swing"> {{params.displayName}} Site </a>
                    </div>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        <li class="dropdown mega-dropdown" id="drm">
                            <a href="/" class="dropdown-toggle" data-toggle="dropdown">
                                <span class="glyphicon glyphicon-link logo-small"></span>&nbsp;Links<span class="caret"></span></a>
                            <ul class="dropdown-menu mega-dropdown-menu" id="drmm">
                                <div id="linksurl"></div>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">
                                <span class="glyphicon glyphicon-picture logo-small"></span>&nbsp;Media <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li class="closemenu" role="presentation">
                                    <a href="#/media">Photos</a>
                                </li>
                                <li class="closemenu" role="presentation">
                                    <a href="camera" target="_blank">Cameras</a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">
                                <span class="glyphicon glyphicon-picture logo-small"></span>&nbsp;Com <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li role="presentation">
                                    <a class="closemenu" href="#/message">Messages</a>
                                </li>
                                <li role="presentation">
                                    <a class="closemenu" href="#/chat">Chat</a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">
                                <span class="glyphicon glyphicon-picture logo-small"></span>&nbsp;Other <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li role="presentation">
                                    <a class="closemenu" href="#/position">Position</a>
                                </li>
                                <li role="presentation">
                                    <a class="closemenu" href="cv" target="_blank">CV</a>
                                </li>
                                <li role="presentation">
                                    <a class="closemenu" href="https://182-193-28-81.ftth.cust.kwaoo.net:8000" target="_blank">Sport Organizer</a>
                                </li>
                                <li role="presentation">
                                    <a class="closemenu" href="http://patdesch.eu-central-1.elasticbeanstalk.com/" target="_blank">Doc Manager</a>
                                </li>
                                <li role="presentation">
                                    <a class="closemenu" href="ambar" target="_blank">Ambar</a>
                                </li>
                                <li role="presentation">
                                    <a class="closemenu" href="synology" target="_blank">Synology</a>
                                </li>
                                <li role="presentation">
                                    <a class="closemenu" href="https://182-193-28-81.ftth.cust.kwaoo.net:8543" target="_blank">KeyCloak Admin</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a id="logoutbut" ng-show="authenticated" data-bs-hover-animate="rubberBand" href="">
                                <span class="glyphicon glyphicon-log-out logo-small"></span>&nbsp;Logout {{userpatappli}}</a>
                        </li>
                        <li>
                            <a href="#/login" ng-show="!authenticated" data-bs-hover-animate="rubberBand"><span class="glyphicon glyphicon-log-in logo-small"></span>&nbsp;Login </a>
                        </li>
                        <li><a href="http://www.timeanddate.com/worldclock/?sort=1" data-bs-hover-animate="tada">{{theTime}}</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <body class="ng-cloak" style="padding-top: 40px;">
        <div ng-view></div>
    </body>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_JpzTMxi3FTB2jSl2XMe6E8tRQswbJNU"></script>
    <script data-main="js/app/main" src="js/bower_components/requirejs/require.js"></script>

    </html>