<?php
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $name=$_POST["name"];
    $email=$_POST["email"];
    try{
        require_once "dbh.inc.php";
        $query="INSERT into leaderboard(name,email) values(?,?);";
        $stmt=$pdo->prepare($query);
        $stmt->execute([$name,$email]);
        $stmt = null;
        $pdo=null;
        die();
    }
    catch(PDOException $e){
        die("Query failed fh");
        
        
    }
}
else{
    
}