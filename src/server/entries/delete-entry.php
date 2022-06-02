<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("../api/checkUser.php");
   
   $json = file_get_contents('php://input');
   $data = json_decode($json);

   $key = $data->key;
   $user = $data->user;

   $result = checkUser($conn, $authTime, $key, $user); //приходит массив с данными пользователя или с ошибкой

   if ($result["authError"]){
      echo json_encode($result);

   } else{
      
      $entryId = $data->id;
      // echo json_encode(array('projId'=>$projId));

      //удалить запись
      $sql = mysqli_query($conn, "DELETE FROM entries WHERE id = {$entryId}");

      //проверка, что запись удалена
      $entry = mysqli_query($conn, "SELECT * FROM entries WHERE id={$entryId}");

      if(mysqli_num_rows($project) == 0){
         echo json_encode(array(
            "deletion" => "success"
         ));
      }else{
         echo json_encode(array(
            "error" => "Запись не удалилась"
         ));
      }
   }
?>