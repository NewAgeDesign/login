<!--
    // Uses my framework (UIGod) to handle the frontend and backend dynamically.
    // Uses google's material design icons for the frontend.
    // Weave.io 1.0.0 - Author: Timothy Christopher Awinia.
    // Uses my personal CSS template.
-->
<!DOCTYPE html>
<html>
    <head>
        <title>Weave.io</title>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900;8..144,1000&display=swap">
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
        <meta name="keywords" content="Web builder, Weave, Website, Build, Build your website, Create">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="scode/uigod.css">
        <link rel="stylesheet" type="text/css" href="scode/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <meta name="description" content="This is a web builder">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <!--<link rel="icon" href="bolt.svg" type="image/svg+xml">-->
        <meta name="author" content="New Age Design TZ">
    </head>
    <body>
        
        <?php
            session_start();
            $database = "loginajax";
            $server = "localhost";
            $username = "root";
            $password = "";

            // Create a connection
            // file deepcode ignore HardcodedCredential: <please specify a reason of ignoring this> it works fine
            $conn = new mysqli($server, $username, $password, $database);

            // Check the connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }


            $res = [
                'errormsg' => ['success' => false, 'head' => '', 'message' => '']
            ];
            function errorm(&$res, $state, $head, $message){
                $res['errormsg'] = [
                    'success' => $state,
                    'head' => $head,
                    'message' => $message
                ];
            }
        ?>

