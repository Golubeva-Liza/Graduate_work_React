<?php
   include_once "../index.php";

   $name = file_get_contents('php://input');
   $project = mysqli_query($conn, "SELECT * FROM projects WHERE projectName = '{$name}'");

   if(mysqli_num_rows($project) > 0){
      echo "Проект с таким названием уже существует";
   }else{
      echo 'success';
   }
?>