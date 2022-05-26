<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("../api/checkUser.php");
   
   $info = json_decode(file_get_contents("php://input"));
   $key = $info->key;
   $user = $info->user; 
   $respondentId= $info->respondId; 

   //проверка, что запрос посылает авторизованный пользователь
   $result = checkUser($conn, $authTime, $key, $user); //данные пользователя или ошибка

   if ($result["authError"]){
      echo json_encode($result);
      
   } else{
      $sql = mysqli_query($conn, "DELETE FROM respondents WHERE id = {$respondentId}");
      $sql2 = mysqli_query($conn, "SELECT * FROM respondents WHERE id = {$respondentId}");
   
      if(mysqli_num_rows($sql2) == 0){
         echo json_encode(array(
            "deletion" => "success"
         ));
      }else{
         echo json_encode(array(
            "error" => "Респондент не удалился"
         ));
      }
   }
   

?>