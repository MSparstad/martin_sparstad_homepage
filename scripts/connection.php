<?php
$db_servername = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "blog";
try {
    $connection = mysqli_connect($db_servername, $db_username, $db_password, $db_name);    
}
catch(Exception $exception){
    $error = $exception->getMessage();
    echo "Connection to db failed";
    die;
}   