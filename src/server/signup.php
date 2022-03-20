<?php
   // session_start();
   include_once "index.php";
   
   $username = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $password = mysqli_real_escape_string($conn, $_POST['password']);
   
   $sql = mysqli_query($conn, "SELECT user_email FROM users WHERE user_email = '{$email}'");

   if(mysqli_num_rows($sql) > 0){
      echo "$email - этот почтовый адрес уже используется";
   }else{
      $random_id = rand(time(), 10000000); //random id of user
      $record = mysqli_query($conn, "INSERT INTO users (unique_id, user_name, user_email, user_password, user_img)
                              VALUES ({$random_id}, '{$username}', '{$email}', '{$password}', '')");
      if($record){
         $sq12 = mysqli_query($conn, "SELECT * FROM users WHERE user_email = '{$email}'");
         if(mysqli_num_rows($sq12) > 0){
            // $row = mysqli_fetch_assoc($sq12);
            // $_SESSION['unique_id'] = $row['unique_id'];
            echo "success";
         }
      }else{
         echo "Что-то пошло не так";
      }
   }
?>