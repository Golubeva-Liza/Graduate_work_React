<?php
   include_once '../index.php';
   include_once "../settings.php";

   $username = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $password = mysqli_real_escape_string($conn, $_POST['password']);
   $code = mysqli_real_escape_string($conn, $_POST['code']);

   $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");

   if(mysqli_num_rows($sql) > 0){
      echo json_encode(array("error" => "$email - этот почтовый адрес уже используется"));

   } else if ($code != $regCode) {
      echo json_encode(array("error" => "Неверный код доступа"));

   } else{
      $password_hash = password_hash($password, PASSWORD_BCRYPT);
      $random_key = rand(1, 2000000000); 
      $currentTime = strtotime(date("Y-m-d H:i:s"));

      $record = mysqli_query($conn, "INSERT INTO users (name, email, password, img) VALUES ('{$username}', '{$email}', '{$password_hash}', '')");

      $user =  mysqli_query($conn, "SELECT * FROM users WHERE email='{$email}'");
      $resp = mysqli_fetch_assoc($user);
      $id = (int) $resp['id'];
      $userId = md5($id);
      
      $record2 = mysqli_query($conn, "INSERT INTO authorization SET userId=$id, authkey=$random_key, time=FROM_UNIXTIME($currentTime)");
               
      if ($record2){
         $authorization = mysqli_query($conn, "SELECT * FROM authorization WHERE userId=$id");
         $row2 = mysqli_fetch_assoc($authorization);

         echo json_encode(array("userId" => $userId, "key" => $row2['authkey'], "name" => $username, "email" => $email, "img" => ''));

      } else {
         echo json_encode(array(
            "error" => "Регистрация прошла успешно, но произошла ошибка входа. Попробуйте войти в приложение в форме входа.",
            "id" => $id,
            "key" => $random_key
         ));
         
      }
   }
?>