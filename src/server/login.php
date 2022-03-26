<?php
   // session_start();
   include_once "index.php";
   
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $password = mysqli_real_escape_string($conn, $_POST['password']);
   
   $sql = mysqli_query($conn, "SELECT * FROM users WHERE user_email = '{$email}' AND user_password = '{$password}'");
   // echo mysqli_num_rows($sql);

   if(mysqli_num_rows($sql) > 0){
      $row = mysqli_fetch_assoc($sql);
      // $_SESSION['unique_id'] = $row['unique_id'];
      echo $row['unique_id'];
   }else{
      echo "Ошибка входа. Проверьте правильность написания логина и пароля";
   }
?>