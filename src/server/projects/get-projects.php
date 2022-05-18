<?php
   include_once "../index.php";
   
   $projects = mysqli_query($conn, "SELECT uniqueId, projectName, descr, address, linkToForm, linkForRespond, linkForCustomer, duration FROM projects");

   if(mysqli_num_rows($projects) > 0){
      $res = array();

      while ($row = $projects->fetch_assoc()) {
         $array = array();

         $proj_id = $row['uniqueId'];
         
         $test_dates = mysqli_query($conn, "SELECT firstTime, lastTime, date FROM timeintervals WHERE project = {$proj_id}");
         $dates = mysqli_fetch_all($test_dates);

         $projectNew = $row;
         $projectNew["dates"] = $dates;

         array_push($res, $projectNew);
      }
      
      $json = json_encode($res, JSON_UNESCAPED_UNICODE);
      echo $json;

   }else{
      echo "error";
   }
?>