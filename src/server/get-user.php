<?php
   include_once "index.php";
   
   $userId = file_get_contents('php://input');
   
   $loggedUser = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$userId}");

   if(mysqli_num_rows($loggedUser) > 0){
      $data = mysqli_fetch_all($loggedUser);
      $json = json_encode($data);
      echo $json;
   }else{
      echo "Пользователь не нашелся";
   }
?>