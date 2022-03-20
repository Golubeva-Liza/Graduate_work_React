<?php
   include_once "index.php";
   
   $respondents = mysqli_query($conn, "SELECT * FROM respondents");

   if(mysqli_num_rows($respondents) > 0){
      $data = mysqli_fetch_all($respondents);
      // $id1 = array("id" => "привет", "name" => "block");
      $json = json_encode($data);
      echo $json;
   }else{
      echo "empty";
   }
?>