<?php
   include_once "../index.php";
   
   $respondents = mysqli_query($conn, "SELECT * FROM respondents");
   
   if(mysqli_num_rows($respondents) > 0){
      $res = array();

      while ($row = $respondents->fetch_assoc()) {
         array_push($res, $row);
      }
      
      $json = json_encode($res);
      echo $json;
   }else{
      echo "empty";
   }
?>