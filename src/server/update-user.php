<?php
   include_once "index.php";
   
   $username = mysqli_real_escape_string($conn, $_POST['username']);
   $useremail = mysqli_real_escape_string($conn, $_POST['useremail']);
   $userId = mysqli_real_escape_string($conn, $_POST['id']);

   $oldPass = mysqli_real_escape_string($conn, $_POST['oldPass']);
   $newPass = mysqli_real_escape_string($conn, $_POST['newPass']);
   $repeatPass = mysqli_real_escape_string($conn, $_POST['repeatPass']);
   

   if ($username){
      $record = mysqli_query($conn, "UPDATE users SET user_name='{$username}' WHERE unique_id={$userId}");

      $sql = mysqli_query($conn, "SELECT user_name FROM users WHERE unique_id = {$userId}");
      
      if(mysqli_num_rows($sql) > 0){
         $row = mysqli_fetch_assoc($sql);
         if ($row['user_name'] == $username){
            echo "success";
         }
      }else{
         echo "error";
      }
   }
   if ($useremail){
      $record = mysqli_query($conn, "UPDATE users SET user_email='{$useremail}' WHERE unique_id={$userId}");

      $sql = mysqli_query($conn, "SELECT user_email FROM users WHERE unique_id = {$userId}");
      
      if(mysqli_num_rows($sql) > 0){
         $row = mysqli_fetch_assoc($sql);
         if ($row['user_email'] == $useremail){
            echo "success";
         }
      }else{
         echo "error";
      }
   }
   if ($oldPass){
      $sql = mysqli_query($conn, "SELECT * FROM users WHERE user_password = '{$oldPass}' AND unique_id={$userId}");
      
      if(mysqli_num_rows($sql) > 0){
         $record = mysqli_query($conn, "UPDATE users SET user_password='{$newPass}' WHERE unique_id={$userId}");
         $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE user_password='{$newPass}' AND unique_id={$userId}");
         if(mysqli_num_rows($sql2) > 0){
            echo "success";
         }else{
            echo "не перезаписался";
         }
      }else{
         echo "error";
      }
   }

   if (isset($_FILES['photo'])){
      // echo "photo";
      $img_name = $_FILES['photo']['name'];
      $tmp_name = $_FILES['photo']['tmp_name'];

      $time = time();
      $new_name = $time.$img_name;

      if (move_uploaded_file($tmp_name, "images/".$new_name)){
         $record = mysqli_query($conn, "UPDATE users SET user_img='{$new_name}' WHERE unique_id={$userId}");
         $sql = mysqli_query($conn, "SELECT * FROM users WHERE user_img='{$new_name}' AND unique_id={$userId}");
         if(mysqli_num_rows($sql) > 0){
            echo $new_name;
         }else{
            echo "error";
         }
      }
      
      // $sql = mysqli_query($conn, "SELECT * FROM users WHERE user_password = '{$oldPass}' AND unique_id={$userId}");
      
      // if(mysqli_num_rows($sql) > 0){
      //    $record = mysqli_query($conn, "UPDATE users SET user_password='{$newPass}' WHERE unique_id={$userId}");
      //    $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE user_password='{$newPass}' AND unique_id={$userId}");
      //    if(mysqli_num_rows($sql2) > 0){
      //       echo "success";
      //    }else{
      //       echo "не перезаписался";
      //    }
      // }else{
      //    echo "error";
      // }
   }
?>