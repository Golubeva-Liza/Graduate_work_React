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
      $email = mysqli_real_escape_string($conn, $_POST['email']);
      $phone = mysqli_real_escape_string($conn, $_POST['phone']);
      $gender = mysqli_real_escape_string($conn, $_POST['gender']);
      $birthday = mysqli_real_escape_string($conn, $_POST['birthdayDate']);
      $age = mysqli_real_escape_string($conn, $_POST['age']);
      $education = mysqli_real_escape_string($conn, $_POST['education']);
      $city = mysqli_real_escape_string($conn, $_POST['sity']);
      $familyStatus = mysqli_real_escape_string($conn, $_POST['familyStatus']);
      $tags = mysqli_real_escape_string($conn, $_POST['tags']);
      
   
      $phoneNum = preg_replace("/[^0-9]/", '', $phone);
      $editDate = date("Y-m-d");
   
      if (!$city){
         $city = '-';
      }
      if (!$tags){
         $tags = '-';
      }
      
      $record = mysqli_query($conn, "INSERT INTO respondents (name, email, phone, gender, age, birthday, education, homecity, familyStatus, tags, editDate) VALUES ('{$username}', '{$email}', '{$phoneNum}', '{$gender}', {$age}, '{$birthday}', '{$education}', '{$city}', '{$familyStatus}', '{$tags}', '{$editDate}')");
      
      if($record){
         $currentRespond= mysqli_query($conn, "SELECT * FROM respondents WHERE name='{$username}' AND email='{$email}'");

         if(mysqli_num_rows($currentRespond) > 0){
            $data = mysqli_fetch_assoc($currentRespond);
            echo json_encode($data);
            
         }else{
            echo json_encode(array(
               "error" => "Что-то пошло не так",
            ));
         }

      }else{
         echo json_encode(array(
            "error" => "Респондент не записался в базу данных",
         ));
      }
   }
?>