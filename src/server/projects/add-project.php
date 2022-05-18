<?php
   include_once "../index.php";
   
   $json = file_get_contents('php://input');
   $data = json_decode($json);
   
   $isProjectEdit = $data->isProjectEdit;
   
   if ($isProjectEdit == 1){
      $days = $data->dates;
      $projectId = $data->uniqueId;

      $linkForRespond = $data->linkForRespond . $projectId;

      // $currentProject = mysqli_query($conn, "SELECT * FROM projects WHERE uniqueId = $projectId");
      $currentProject = mysqli_query($conn, "UPDATE projects SET projectName='{$data->projectName}', descr='{$data->descr}', address='{$data->address}', linkToForm='{$data->linkToForm}', linkForRespond='{$linkForRespond}', linkForCustomer='', duration='{$data->duration}' WHERE uniqueId = {$projectId}");

      if($currentProject){
         $deleteTime = mysqli_query($conn, "DELETE FROM test_dates WHERE project = {$projectId}");

         foreach ($days as $value) {
            foreach ($value->intervals as $interval) {
               $time_record = mysqli_query($conn, "INSERT INTO test_dates (time, date, project) VALUES ('{$interval}', '{$value->date}', {$projectId})");
            }
         }

         echo $projectId;
      }else{
         echo "Проект не перезаписался в базу данных";
      }


   } else {
      $days = $data->dates;
      $random_id = rand(time(), 10000000);
      $linkForRespond = $data->linkForRespond . $random_id;

      $record = mysqli_query($conn, "INSERT INTO projects (uniqueId, projectName, descr, address, linkToForm, linkForRespond, linkForCustomer, duration) VALUES ({$random_id}, '{$data->projectName}', '{$data->descr}', '{$data->address}', '{$data->linkToForm}', '{$linkForRespond}', '', '{$data->duration}')");

      $currentProject = mysqli_query($conn, "SELECT projId FROM projects WHERE uniqueId = $random_id");
      $projectId = mysqli_fetch_all($currentProject);

      if(count($projectId) == 1){
         $projectId = $random_id;

         foreach ($days as $value) {
            foreach ($value->intervals as $interval) {
               $times = explode("-", $interval);
               // echo $interval . ' ' . $value->date . ' ' . $projectId;
               $time_record = mysqli_query($conn, "INSERT INTO timeintervals (firstTime, lastTime, date, project) VALUES ('{$times[0]}', '{$times[1]}', '{$value->date}', {$projectId})");
            }
         }

         echo $random_id;
      }else{
         echo "error";
      }
   }
   // $isThisProject = mysqli_query($conn, "SELECT * FROM projects WHERE proj_name = '$data->projName'");

?>