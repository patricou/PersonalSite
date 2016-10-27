<%--
  Created by IntelliJ IDEA.
  User: patricou
  Date: 27/10/2016
  Time: 18:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Error page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="js/bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="css/pat-style.css" >
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="error-template">
                    <h1>
                        Oops!</h1>
                    <h2>
                        ${error.status} ${error.message}</h2>
                    <div class="error-details">
                        Sorry, an error has occured, Requested page ${error.path} issue !
                    </div>
                    <div class="error-actions">
                        <a href="http://www.patricou.com" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                            Take Me Home </a>
                        <a href="mailto:deschamps.pat@gmail.com" class="btn btn-default btn-lg">
                        <span class="glyphicon glyphicon-envelope"></span> Contact Support </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
