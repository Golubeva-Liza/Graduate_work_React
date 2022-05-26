<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("./checkUser.php");
   
   $info = json_decode(file_get_contents("php://input"));
   $key = $info->key;
   $user = $info->user; //захешированный id пользователя

   $result = checkUser($conn, $authTime, $key, $user); //приходит массив с данными пользователя или с ошибкой

   echo json_encode($result);
?>