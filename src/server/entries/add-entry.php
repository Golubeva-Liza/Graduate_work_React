<?php
   include_once "../index.php";
   
   $name = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $phone = mysqli_real_escape_string($conn, $_POST['phone']);
   $comment = mysqli_real_escape_string($conn, $_POST['comment']);
   $date = mysqli_real_escape_string($conn, $_POST['date']);
   $time = mysqli_real_escape_string($conn, $_POST['time']);
   $projId = mysqli_real_escape_string($conn, $_POST['projId']); 

   $callInfo = mysqli_real_escape_string($conn, $_POST['duration']);
   $birthday = mysqli_real_escape_string($conn, $_POST['birthday']);
   $age = mysqli_real_escape_string($conn, $_POST['age']);
   $city = mysqli_real_escape_string($conn, $_POST['sity']);
   $education = mysqli_real_escape_string($conn, $_POST['education']);
   $familyStatus = mysqli_real_escape_string($conn, $_POST['familyStatus']);
   
   // $random_id = rand(time(), 10000000); //random id of user
   $phoneNum = preg_replace("/[^0-9]/", '', $phone);
   $editDate = date("Y-m-d");

   if (!$city){
      $city = '-';
   }


   $currentRespond = mysqli_query($conn, "SELECT * FROM respondents WHERE email='{$email}' AND phone='{$phoneNum}'");

   if(mysqli_num_rows($currentRespond) > 0){
      echo json_encode("Есть в базе");
   }else{

      // $respond = array("age"=>$age, "birthday"=>$birthday, "phone"=>$phoneNum);
      // echo json_encode($time);

      $record = mysqli_query($conn, "INSERT INTO respondents (name, email, phone, gender, age, birthday, education, homecity, familyStatus, tags, editDate) VALUES ('{$name}', '{$email}', '{$phoneNum}', '-', {$age}, '{$birthday}', '{$education}', '{$city}', '{$familyStatus}', '-', '{$editDate}')");

      if($record){
         $select = mysqli_query($conn, "SELECT * FROM respondents WHERE email='{$email}' AND phone='{$phoneNum}'");
         $respondID = mysqli_fetch_assoc($select)['id'];

         // $select2 = mysqli_query($conn, "SELECT * FROM test_dates WHERE time='{$interval}' AND date='{$date}' AND project={$projId}");
         // $projTimeID = mysqli_fetch_assoc($select2)['id'];
         
         $times = explode("-", $time);
         $record2 = mysqli_query($conn, "INSERT INTO entries (respondent, firstTime, lastTime, date, project, callInfo, comment) VALUES ({$respondID}, '{$times[0]}', '{$times[1]}', '{$date}', {$projId}, '{$callInfo}', '{$comment}')");

         if($record2){
            echo json_encode("success");
         }else{
            echo json_encode("Что-то пошло не так");
         }
      }else{
         echo json_encode("Респондент не записался в базу данных");
      }
   }

   // if (!$city){
   //    $city = '-';
   // }
   // if (!$tags){
   //    $tags = '-';
   // }
   
   // $record = mysqli_query($conn, "INSERT INTO respondents (unique_id, user_name, user_email, user_phone, user_gender, user_age, education, homecity, family_status, tags) VALUES ({$random_id}, '{$username}', '{$email}', '{$phoneNum}', '{$gender}', {$age}, '{$education}', '{$city}', '{$familyStatus}', '{$tags}')");
   // if($record){
   //    $currentRespond= mysqli_query($conn, "SELECT * FROM respondents WHERE unique_id = '{$random_id}'");
   //    if(mysqli_num_rows($currentRespond) > 0){
   //       $data = mysqli_fetch_all($currentRespond);
   //       $json = json_encode($data);
   //       echo $json;
   //       // echo "success";
   //    }else{
   //       echo "Что-то пошло не так";
   //    }
   // }else{
   //    echo "Респондент не записался в базу данных";
   // }

?>