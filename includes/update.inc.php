<?php
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $name=$_POST["name"];
    $email=$_POST["email"];
    $highscore=$_POST["highscore"];
    try{
        require_once "dbh.inc.php";
        $query="Update leaderboard set highscore=? where email=?;";
        $stmt=$pdo->prepare($query);
        $stmt->execute([$highscore,$email]);
        $stmt = null;
        $pdo=null;
    }
    catch(PDOException $e){
        die("Query failed fh");
        
        
    }

}