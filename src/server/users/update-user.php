<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("../api/checkUser.php");
   
   $user = mysqli_real_escape_string($conn, $_POST['userKey']);
   $key = mysqli_real_escape_string($conn, $_POST['authKey']);

   //проверка, что запрос посылает авторизованный пользователь
   $result = checkUser($conn, $authTime, $key, $user); //приходит массив с данными пользователя или с ошибкой

   if ($result["authError"]){
      echo json_encode($result);
      
   } else{ 
      $username = mysqli_real_escape_string($conn, $_POST['name']);
      $useremail = mysqli_real_escape_string($conn, $_POST['email']);
   
      $oldPass = mysqli_real_escape_string($conn, $_POST['oldPass']);
      $newPass = mysqli_real_escape_string($conn, $_POST['newPass']);
      $repeatPass = mysqli_real_escape_string($conn, $_POST['repeatPass']);
   
      $removePhoto = mysqli_real_escape_string($conn, $_POST['removePhoto']);

      $authKey = $result["key"];

      $sql = mysqli_query($conn, "SELECT * FROM authorization WHERE authkey = {$authKey}");
      $row = mysqli_fetch_assoc($sql);
      $userId = $row['userId'];
   
      if ($username){

         $record = mysqli_query($conn, "UPDATE users SET name='{$username}' WHERE id={$userId}");
   
         $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE name='{$username}' AND id={$userId}");
         $row2 = mysqli_fetch_assoc($sql2);

         if ($row2['name'] == $username){
            echo json_encode(array(
               "updating" => "success"
            ));
         } else{
            echo json_encode(array(
               "error" => "Что-то пошло не так"
            ));
         }
      }

      if ($useremail){

         $record = mysqli_query($conn, "UPDATE users SET email='{$useremail}' WHERE id={$userId}");
   
         $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE email='{$useremail}' AND id={$userId}");
         $row2 = mysqli_fetch_assoc($sql2);

         if ($row2['email'] == $useremail){
            echo json_encode(array(
               "updating" => "success"
            ));
         } else{
            echo json_encode(array(
               "error" => "Что-то пошло не так"
            ));
         }
      }

      if ($oldPass){

         $sql = mysqli_query($conn, "SELECT * FROM users WHERE id={$userId}");
         $row = mysqli_fetch_assoc($sql);

         if (password_verify($oldPass, $row['password'])){

            $password_hash = password_hash($newPass, PASSWORD_BCRYPT);
            
            $record = mysqli_query($conn, "UPDATE users SET password='{$password_hash}' WHERE id={$userId}");
            $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE password='{$password_hash}' AND id={$userId}");

            if(mysqli_num_rows($sql2) > 0){
               echo json_encode(array(
                  "updating" => "success"
               ));
            }else{
               echo json_encode(array(
                  "error" => "Что-то пошло не так"
               ));
            }

         } else{
            echo json_encode(array(
               "passwordError" => "Введен неправильный пароль"
            ));
         }
      }
   
      if (isset($_FILES['photo'])){
         $img_name = $_FILES['photo']['name'];
         $tmp_name = $_FILES['photo']['tmp_name'];
   
         $time = time();
         $new_name = $time.$img_name;

         if (move_uploaded_file($tmp_name, "../images/".$new_name)){

            $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE id={$userId}");
            $row2 = mysqli_fetch_assoc($sql2); //старая фотография

            $record = mysqli_query($conn, "UPDATE users SET img='{$new_name}' WHERE id={$userId}");
   
            //удаляем старую фотографию, которой уже нет в бд
            $dir = opendir("../images/");
            while ($file = readdir($dir)){
               if($row2["img"] === $file){
                  unlink("../images/".$file);
               }
            }
            closedir($dir);

            echo json_encode(array("imgName" => $new_name));

         }else{
            echo json_encode(array("error" => "Изображение не загрузилось на сервер"));
         }
      }

      if ($userId && $removePhoto){
         $record = mysqli_query($conn, "UPDATE users SET user_img='' WHERE unique_id={$userId}");
   
         $sql = mysqli_query($conn, "SELECT user_img FROM users WHERE unique_id={$userId}");
         
         if(mysqli_fetch_assoc($sql)['user_img'] == ''){
            echo "success";
         }else{
            echo "error";
         }
      }
   }
?>