<?php
   include_once '../index.php';
   include_once '../settings.php';

   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $password = mysqli_real_escape_string($conn, $_POST['password']);

   $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");

   if(mysqli_num_rows($sql) > 0){
      $row = mysqli_fetch_assoc($sql);
      $id = $row['id'];
      $name = $row['name'];
      $password2 = $row['password'];
      $img = $row['img'];
      
      if(password_verify($password, $password2)){
         $random_key = rand(1, 2000000000); 
         $userId = md5($id);
         $currentTime = strtotime(date("Y-m-d H:i:s"));

         //здесь проблема
         $record = mysqli_query($conn, "INSERT INTO authorization (userId, authkey, time) VALUES ($id, $random_key, FROM_UNIXTIME($currentTime))");
         
         if ( $record === false ){
            echo json_encode(array("error" => "Что-то пошло не так. Попробуйте еще раз.", "time" => $currentTime, "id" => $id, "randomKey" => $random_key));

         } else {
            $record2 = mysqli_query($conn, "SELECT * FROM authorization WHERE userId=$id");
            $row2 = mysqli_fetch_assoc($record2);
   
            echo json_encode(array("userId" => $userId, "key" => $row2['authkey'], "name" => $name, "email" => $email, "img" => $img));
         }
      }
      else{
         echo json_encode(array("error" => "Введен неправильный пароль"));
      }

   } else{
      echo json_encode(array("error" => "Пользователя с таким почтовым адресом нет"));
   }
?>