<?php
$dsn="mysql:host=sql206.infinityfree.com;dbname=if0_41021053_leaderboard";
$dbroot="if0_41021053";
$dbpwd="e13gradBpDfb9";
try{
    $pdo=new PDO($dsn,$dbroot,$dbpwd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
    echo "Connection Failed :".$e->getMessage();
}