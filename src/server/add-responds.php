<?php
   include_once "index.php";
   
   $username = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $phone = mysqli_real_escape_string($conn, $_POST['phone']);
   $gender = mysqli_real_escape_string($conn, $_POST['gender']);
   // $birthdayDate = mysqli_real_escape_string($conn, $_POST['birthday-date']);
   $age = mysqli_real_escape_string($conn, $_POST['age']);
   $education = mysqli_real_escape_string($conn, $_POST['education']);
   $city = mysqli_real_escape_string($conn, $_POST['sity']);
   $familyStatus = mysqli_real_escape_string($conn, $_POST['familyStatus']);
   $tags = mysqli_real_escape_string($conn, $_POST['tags']);
   
   // echo $username . ' ' . $email . ' ' . $phone . ' ' . $gender . ' ' . $birthdayDate . ' ' . $age . ' ' . $education . ' ' . $city . ' ' . $familyStatus . ' ' . $tags;

   $random_id = rand(time(), 10000000); //random id of user
   $phoneNum = preg_replace("/[^0-9]/", '', $phone);

   if (!$city){
      $city = '-';
   }
   if (!$tags){
      $tags = '-';
   }
   
   $record = mysqli_query($conn, "INSERT INTO respondents (unique_id, user_name, user_email, user_phone, user_gender, user_age, education, homecity, family_status, tags) VALUES ({$random_id}, '{$username}', '{$email}', '{$phoneNum}', '{$gender}', {$age}, '{$education}', '{$city}', '{$familyStatus}', '{$tags}')");
   if($record){
      $currentRespond= mysqli_query($conn, "SELECT * FROM respondents WHERE unique_id = '{$random_id}'");
      if(mysqli_num_rows($currentRespond) > 0){
         $data = mysqli_fetch_all($currentRespond);
         $json = json_encode($data);
         echo $json;
         // echo "success";
      }else{
         echo "Что-то пошло не так";
      }
   }else{
      echo "Респондент не записался в базу данных";
   }

?>