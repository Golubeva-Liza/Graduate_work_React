<?php
   include_once '../index.php';
   include_once "../settings.php";
   require_once ("./checkUser.php");
   
   $info = json_decode(file_get_contents("php://input"));
   $key = $info->key;
   $user = $info->user;

   $result = checkUser($conn, $authTime, $key, $user);
   
   if ($result["authError"]){
      echo json_encode($result);
      
   } else {
      $sql = mysqli_query($conn, "DELETE FROM authorization WHERE authkey = $key");

      //проверка, что авторизация удалена
      $auth = mysqli_query($conn, "SELECT * FROM authorization WHERE authkey={$key}");

      if(mysqli_num_rows($auth) == 0){
         echo json_encode(array(
            "deletion" => "success"
         ));
      }else{
         echo json_encode(array(
            "error" => "Что-то пошло не так"
         ));
      }
   }
?>