<?php
   include_once '../index.php';

   $username = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $password = mysqli_real_escape_string($conn, $_POST['password']);

   $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");

   if(mysqli_num_rows($sql) > 0){
      echo json_encode(array("message" => "$email - этот почтовый адрес уже используется"));

   }else{
      $password_hash = password_hash($password, PASSWORD_BCRYPT);

      $record = mysqli_query($conn, "INSERT INTO users (name, email, password, img)
                              VALUES ('{$username}', '{$email}', '{$password_hash}', '')");

      if($record){
         // $sq12 = mysqli_query($conn, "SELECT * FROM users WHERE user_email = '{$email}'");
         // if(mysqli_num_rows($sq12) > 0){
         //    $row = mysqli_fetch_assoc($sq12);
         //    echo $row['unique_id'];
            
         // }
         echo json_encode(array("message" => "User was successfully registered."));
      }else{
         echo json_encode(array("message" => "Unable to register the user."));
      }
   }
?>