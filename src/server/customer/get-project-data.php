<?php
   include_once "../index.php";

   $link = file_get_contents('php://input');

   $project = mysqli_query($conn, "SELECT * FROM projects WHERE linkForCustomer='{$link}'");

   if(mysqli_num_rows($project) > 0){

      $item = $project->fetch_assoc();//информация проекта
      $projectNew = $item;
      $projId = $item['projId'];

      //получить даты расписания, сделанные модератором
      $timeintervals = mysqli_query($conn, "SELECT firstTime, lastTime, date FROM timeintervals WHERE project = {$projId}");
      $dates = mysqli_fetch_all($timeintervals);

      $result = array();

      foreach ($dates as $interval){
         //interval - массив вида ['11:00', '19:00', '2022-05-15']

         $find = array_search($interval[2], array_column($result, 'date'));
         $time = array($interval[0] . '-' . $interval[1]);

         if ($find === false) {
            array_push($result, array('date'=>$interval[2], 'intervals'=>$time));
         } else{
            $newarr = array_merge($result[$find]['intervals'], $time);
            $result[$find]['intervals'] = $newarr;
         }
      } 
      
      //получаем готовый набор интервалов в $result.

      $projectNew["dates"] = $result;
      echo json_encode($projectNew);

   }else{
      echo json_encode(array("error"=>"В базе нет такого проекта"));
   }
?>