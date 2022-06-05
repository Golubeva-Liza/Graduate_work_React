<?php
   include_once "../index.php";

   function splitInterval($start, $end, $step) {
      $intervals = array();
      $dur = $step * 60 * 1000;

      for ($i = $start; $i <= $end; $i += $dur) {
         $firstTime = date("H:i", $i / 1000);
         $lastTime = date("H:i", ($i + $dur) / 1000);

         if ($i + $dur <= $end){
            array_push($intervals, $firstTime . '-' . $lastTime);
         }
      }

      return $intervals;
   }


   $projId = file_get_contents('php://input');

   $project = mysqli_query($conn, "SELECT * FROM projects WHERE projId={$projId}");

   if(mysqli_num_rows($project) > 0){

      $item = $project->fetch_assoc();//информация проекта
      $projectNew = $item;
      $duration = $item["duration"];

      //получить даты расписания, сделанные модератором
      $timeintervals = mysqli_query($conn, "SELECT firstTime, lastTime, date FROM timeintervals WHERE project = {$projId}");
      $dates = mysqli_fetch_all($timeintervals);

      $result = array();

      foreach ($dates as $interval){
         //interval - массив вида ['11:00', '19:00', '2022-05-15']

         //работаем только с "будущими" датами
         if (new DateTime($interval[2] . '00:00:00') > new DateTime('00:00:00')){

            $firstDate = new DateTime($interval[2] . $interval[0]);
            $firstDateSec = $firstDate->getTimestamp() * 1000;

            $lastDate = new DateTime($interval[2] . $interval[1]);
            $lastDateSec = $lastDate->getTimestamp() * 1000;

            $res = splitInterval($firstDateSec, $lastDateSec, (int) $duration);

            // let find = arr.find(el => el.date == interval[2]);
            $find = array_search($interval[2], array_column($result, 'date'));

            if ($find === false) {
               array_push($result, array('date'=>$interval[2], 'intervals'=>$res));
            } else{
               $newarr = array_merge($result[$find]['intervals'], $res);
               $result[$find]['intervals'] = $newarr;
            }
         } 
      } 
      
      //получаем готовый набор интервалов в $result. Теперь надо убрать интервалы, на которые есть записи.

      $sqlentries = mysqli_query($conn, "SELECT firstTime, lastTime, date FROM entries WHERE project = {$projId}");
      $entries = mysqli_fetch_all($sqlentries);

      foreach ($entries as $entrie) {
         $find2 = array_search($entrie[2], array_column($result, 'date'));

         if ($find2 !== false) {

            $find3 = array_search($entrie[0] . '-' . $entrie[1], $result[$find2]['intervals']);

            if ($find3 !== false){
               array_splice($result[$find2]['intervals'], $find3, 1);
            }
         }
      }

      $projectNew["dates"] = $result;
      echo json_encode($projectNew);

   }else{
      echo json_encode(array("error"=>"В базе нет такого проекта"));
   }
?>