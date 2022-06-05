<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("../api/checkUser.php");
   
   $json = file_get_contents('php://input');
   $data = json_decode($json);
   
   $isProjectEdit = $data->isProjectEdit;

   $key = $data->key;
   $user = $data->user;

   $result = checkUser($conn, $authTime, $key, $user); //приходит массив с данными пользователя или с ошибкой

   if ($result["authError"]){
      echo json_encode($result);
   } else{
   
      if ($isProjectEdit == 1){
         $days = $data->dates;
         $projectId = $data->projId;
   
         $currentProject = mysqli_query($conn, "UPDATE projects SET projectName='{$data->projectName}', descr='{$data->descr}', address='{$data->address}', linkToForm='{$data->linkToForm}', duration='{$data->duration}' WHERE projId = {$projectId}");
   
         if($currentProject){
            $deleteTime = mysqli_query($conn, "DELETE FROM timeintervals WHERE project = $projectId");
   
            foreach ($days as $value) {
               if (count($value->intervals) > 0){
                  foreach ($value->intervals as $interval) {
                     $times = explode("-", $interval);
                     $time_record = mysqli_query($conn, "INSERT INTO timeintervals (firstTime, lastTime, date, project) VALUES ('{$times[0]}', '{$times[1]}', '{$value->date}', {$projectId})");
                  }
               }
            }
   
            echo json_encode(array(
               "projId" => $projectId
            ));
         }else{
            echo json_encode(array(
               "error" => "Проект не перезаписался в базу данных"
            ));
         }
   
   
      } else {
         $days = $data->dates;
         
         $record = mysqli_query($conn, "INSERT INTO projects (projectName, descr, address, linkToForm, linkForRespond, linkForCustomer, duration) VALUES ('{$data->projectName}', '{$data->descr}', '{$data->address}', '{$data->linkToForm}', '', '', '{$data->duration}')");
   
         $currentProject = mysqli_query($conn, "SELECT projId FROM projects WHERE projectName = '{$data->projectName}'");
         
         $projectId = mysqli_fetch_assoc($currentProject)['projId'];
         $randomKey = md5(time()+$projectId); // MD5-хэш текущего времени с точностью до сотых секунды
   
         $record = mysqli_query($conn, "UPDATE projects SET linkForRespond='projects/{$projectId}', linkForCustomer='schedule/{$randomKey}' WHERE projId={$projectId}");
   
         foreach ($days as $value) {
            foreach ($value->intervals as $interval) {
               $times = explode("-", $interval);
               $time_record = mysqli_query($conn, "INSERT INTO timeintervals (firstTime, lastTime, date, project) VALUES ('{$times[0]}', '{$times[1]}', '{$value->date}', {$projectId})");
            }
         }
   
         echo json_encode(array(
            "projId" => $projectId,
            "linkForRespond" => 'projects/'.$projectId,
            "linkForCustomer" => 'projects/'.$randomKey,
         ));
      }

   }

?>