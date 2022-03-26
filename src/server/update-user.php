<?php
   include_once "index.php";
   
   $username = mysqli_real_escape_string($conn, $_POST['username']);
   $userId = mysqli_real_escape_string($conn, $_POST['id']);
   
   // echo $username . $userId;

   // $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = '{$userId}'");
   $record = mysqli_query($conn, "UPDATE users SET user_name='{$username}' WHERE unique_id={$userId}");

   $sql = mysqli_query($conn, "SELECT user_name FROM users WHERE unique_id = {$userId}");
   
   if(mysqli_num_rows($sql) > 0){
      $row = mysqli_fetch_assoc($sql);
      if ($row['user_name'] == $username){
         echo "success";
      }
   }else{
      echo "error";
   }
?>