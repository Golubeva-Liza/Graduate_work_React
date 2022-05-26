<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("../api/checkUser.php");

   $info = json_decode(file_get_contents("php://input"));
   $key = $info->key;
   $user = $info->user;

   //проверка, что запрос посылает авторизованный пользователь
   $result = checkUser($conn, $authTime, $key, $user); //приходит массив с данными пользователя или с ошибкой

   if ($result["authError"]){
      echo json_encode($result);

   } else{
      // echo json_encode($result);
      $projects = mysqli_query($conn, "SELECT * FROM projects");

      if(mysqli_num_rows($projects) > 0){
         $res = array();

         while ($row = $projects->fetch_assoc()) {
            $array = array();

            $proj_id = $row['projId'];
            
            $test_dates = mysqli_query($conn, "SELECT firstTime, lastTime, date FROM timeintervals WHERE project = {$proj_id}");
            $dates = mysqli_fetch_all($test_dates);

            $projectNew = $row;
            $projectNew["dates"] = $dates;

            array_push($res, $projectNew);
         }
         
         $json = json_encode($res, JSON_UNESCAPED_UNICODE);
         echo $json;

      }else{
         echo json_encode(array("error"=>"Проектов нет в базе"));
      }
   }

?>