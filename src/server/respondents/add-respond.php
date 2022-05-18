<?php
   include_once "../index.php";
   
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
   

   // $random_id = rand(time(), 10000000); //random id of user
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
         $json = json_encode($data);
         echo $json;
      }else{
         echo "Что-то пошло не так";
      }
   }else{
      echo "Респондент не записался в базу данных";
   }

?>