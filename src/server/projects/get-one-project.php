<?php
   include_once "../index.php";
   $projId = file_get_contents('php://input');

   $project = mysqli_query($conn, "SELECT * FROM projects WHERE projId={$projId}");

   if(mysqli_num_rows($project) > 0){
      $item = $project->fetch_assoc();

      // $array = array();

      $test_dates = mysqli_query($conn, "SELECT firstTime, lastTime, date FROM timeintervals WHERE project = {$projId}");
      $dates = mysqli_fetch_all($test_dates);

      $projectNew = $item;
      $projectNew["dates"] = $dates;
      
      $json = json_encode($projectNew, JSON_UNESCAPED_UNICODE);
      echo $json;

   }else{
      echo json_encode(array("error"=>"В базе нет такого проекта"));
   }
?>