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
   $uniqueid = mysqli_real_escape_string($conn, $_POST['uniqueid']);
   
   // echo $username . ' ' . $email . ' ' . $phone . ' ' . $gender . ' ' . $birthdayDate . ' ' . $age . ' ' . $education . ' ' . $city . ' ' . $familyStatus . ' ' . $tags;
   $phoneNum = preg_replace("/[^0-9]/", '', $phone);
   if (!$city){
      $city = '-';
   }
   if (!$tags){
      $tags = '-';
   }

   // $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = '{$uniqueid}'");
   $record = mysqli_query($conn, "UPDATE respondents SET user_name='{$username}', user_email='{$email}', user_phone='{$phoneNum}', user_gender='{$gender}', user_age={$age}, education='{$education}', homecity='{$city}', family_status='{$familyStatus}', tags='{$tags}' WHERE unique_id={$uniqueid}");

   if($record){
      $currentRespond= mysqli_query($conn, "SELECT * FROM respondents WHERE unique_id = '{$uniqueid}'");
      if(mysqli_num_rows($currentRespond) > 0){
         $data = mysqli_fetch_all($currentRespond);
         $json = json_encode($data);
         echo $json;
         // echo "success";
      }else{
         echo "Что-то пошло не так";
      }
   }else{
      echo "Респондент не перезаписался в базу данных";
   }
?>