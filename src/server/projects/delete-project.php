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
      
      $projId = $data->projId;
      // echo json_encode(array('projId'=>$projId));

      //удалить записи
      $sql = mysqli_query($conn, "DELETE FROM entries WHERE project = {$projId}");
      
      //удалить расписание
      $sql2 = mysqli_query($conn, "DELETE FROM timeintervals WHERE project = {$projId}");

      //удалить проект
      $sql3 = mysqli_query($conn, "DELETE FROM projects WHERE projId = {$projId}");

      //проверка, что проект удален
      $project = mysqli_query($conn, "SELECT * FROM projects WHERE projId={$projId}");

      if(mysqli_num_rows($project) == 0){
         echo json_encode(array(
            "deletion" => "success"
         ));
      }else{
         echo json_encode(array(
            "error" => "Проект не удалился"
         ));
      }
   }
?>