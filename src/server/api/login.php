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
      $email = $row['email'];
      $password2 = $row['password'];
      $img = $row['img'];
      
      if(password_verify($password, $password2)){
         $random_key = rand(1, 4000000000); 
         $userId = md5($id);

         $auth = mysqli_query($conn, "SELECT * FROM authorization WHERE userId={$id}");

         if(mysqli_num_rows($auth) > 0){
            $sql = mysqli_query($conn, "DELETE FROM authorization WHERE userId={$id}");
         }

         $record = mysqli_query($conn, "INSERT INTO authorization (userId, authkey) VALUES ($id, $random_key)");

         $record2 = mysqli_query($conn, "SELECT * FROM authorization WHERE authkey={$random_key}");
         $row2 = mysqli_fetch_assoc($record2);

         // $timestamp = strtotime($row2['time']); //переводится значение из базы данных в секунды 
         // $dateTime = date("Y-m-d H:i:s", $timestamp);

         echo json_encode(array("userId" => $userId, "key" => $row2["authkey"], "name" => $name, "email" => $email, "img" => $img));
      }
      else{
         echo json_encode(array("message" => "Введен неправильный пароль", "password" => $password));
      }

   } else{
      echo json_encode(array("message" => "Пользователя с таким почтовым адресом нет"));
   }
?>