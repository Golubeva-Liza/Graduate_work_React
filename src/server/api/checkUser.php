<?php

   function checkUser($conn, $authTime, $key, $user){

      $loggedUser = mysqli_query($conn, "SELECT * FROM authorization WHERE authkey = {$key}");
      
      if(mysqli_num_rows($loggedUser) > 0){
         $row = mysqli_fetch_assoc($loggedUser);
         // $authid = $row['id']; //id записи авторизации
         $id = $row['userId']; //id пользователя
         $time = $row['time']; //время, когда был авторизован пользователь
         $userId = md5($id); //хеширование id пользователя
   
         if ($userId == $user){ //если пришедший id совпадает с id в бд
   
            $sql = mysqli_query($conn, "SELECT * FROM users WHERE id = {$id}");
            $userData = mysqli_fetch_assoc($sql);
   
            $name = $userData['name'];
            $email = $userData['email'];
            $img = $userData['img'];
   
            //время, сохраняемое в бд, записывается с учетом utc, а получается без него - непонятно почему
            $timestamp = strtotime($time) - 3*60*60; //переводится значение из базы данных в секунды.
            $nowTime = time();
            
            if ($nowTime - $timestamp < $authTime){
               return array(
                  "userId" => $user, 
                  "key" => $key, 
                  "name" => $name, 
                  "email" => $email, 
                  "img" => $img
               );
            } else {
               $sql = mysqli_query($conn, "DELETE FROM authorization WHERE authkey = {$key} AND userId = {$id}");

               return array(
                  "authError" => "Время истекло"
               );
            }
   
            // $sql2 = mysqli_query($conn, "UPDATE authorization SET authkey={$random_key} WHERE id={$authid}");
   
         } else{
            $sql = mysqli_query($conn, "DELETE FROM authorization WHERE authkey = {$key} AND userId = {$id}");
            return array(
               "authError" => "Идентификаторы не совпадают",
            );
         }
   
      } else{
         return array(
            "authError" => "Ключ не совпадает",
         );
      }
   }
?>