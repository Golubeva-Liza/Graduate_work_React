<?php
   header("Access-Control-Allow-Origin: *");

   $conn = mysqli_connect("localhost", "root", "root", "bookme_app");
   // if($conn){
   //    echo "Database conn";
   // } else{
   //    echo mysqli_connect_error();
   // }
?>