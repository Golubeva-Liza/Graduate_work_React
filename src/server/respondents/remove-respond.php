<?php
   include_once "../index.php";
   
   $respondentId = file_get_contents('php://input');
   
   $sql = mysqli_query($conn, "DELETE FROM respondents WHERE id = {$respondentId}");
   $sql2 = mysqli_query($conn, "SELECT * FROM respondents WHERE id = {$respondentId}");

   if(mysqli_num_rows($sql2) == 0){
      echo "success";
   }else{
      echo "Респондент не удалился";
   }
?>