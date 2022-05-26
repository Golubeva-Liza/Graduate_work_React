<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("../api/checkUser.php");

   $info = json_decode(file_get_contents("php://input"));
   $key = $info->key;
   $user = $info->user;

   $result = checkUser($conn, $authTime, $key, $user); //приходит массив с данными пользователя или с ошибкой

   if ($result["authError"]){
      echo json_encode($result);
   } else{
      $respondents = mysqli_query($conn, "SELECT * FROM respondents");
   
      if(mysqli_num_rows($respondents) > 0){
         $res = array();
   
         while ($row = $respondents->fetch_assoc()) {
            array_push($res, $row);
         }
         
         $json = json_encode($res);
         echo $json;
      }else{
         echo json_encode(array("error" => "В базе нет респондентов"));
      }
   }
?>