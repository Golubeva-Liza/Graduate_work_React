<?php
   include_once "index.php";
   
   $username = mysqli_real_escape_string($conn, $_POST['username']);
   $useremail = mysqli_real_escape_string($conn, $_POST['useremail']);
   $userId = mysqli_real_escape_string($conn, $_POST['id']);

   $oldPass = mysqli_real_escape_string($conn, $_POST['oldPass']);
   $newPass = mysqli_real_escape_string($conn, $_POST['newPass']);
   $repeatPass = mysqli_real_escape_string($conn, $_POST['repeatPass']);

   $removePhoto = mysqli_real_escape_string($conn, $_POST['removePhoto']);

   // function img_compress($img){
   //    // $imagickSrc = new Imagick($img);
   //    // $compressionList = [Imagick::COMPRESSION_JPEG2000];

   //    // $imagickDst = new Imagick();
   //    // $imagickDst->setCompression($compressionList);
   //    // $imagickDst->setCompressionQuality(80);
   //    // $imagickDst->newPseudoImage(
   //    //    $imagickSrc->getImageWidth(),
   //    //    $imagickSrc->getImageHeight(),
   //    //    'canvas:white'
   //    // );

   //    // $imagickDst->compositeImage(
   //    //    $imagickSrc,
   //    //    Imagick::COMPOSITE_ATOP,
   //    //    0,
   //    //    0
   //    // );
   //    // $imagickDst->setImageFormat("jpg");
   //    // $imagickDst->writeImage($img);
   //    echo $img;
   //    $imagick = new Imagick($img);

   //    // $data = $imagick->identifyImage();
   //    // if ($data['mimetype'] == 'image/png')
   //    // {
   //    //    $imagick->setBackgroundColor('#FFFFFF');
   //    //    $imagick = $imagick->mergeImageLayers(Imagick::LAYERMETHOD_FLATTEN);

   //    //    unlink($img);
   //    //    $img = str_replace('.png', '.jpg', $img);
   //    // }

   //    // $imagick->setCompression(Imagick::COMPRESSION_JPEG);
   //    // $imagick->setImageCompressionQuality(75);
   //    // $imagick->writeImage('compress_' . $img);
   // }


   if ($username){
      $record = mysqli_query($conn, "UPDATE users SET user_name='{$username}' WHERE unique_id={$userId}");

      $sql = mysqli_query($conn, "SELECT user_name FROM users WHERE unique_id = {$userId}");
      
      if(mysqli_num_rows($sql) > 0){
         $row = mysqli_fetch_assoc($sql);
         if ($row['user_name'] == $username){
            echo "success";
         }
      }else{
         echo "error";
      }
   }
   if ($useremail){
      $record = mysqli_query($conn, "UPDATE users SET user_email='{$useremail}' WHERE unique_id={$userId}");

      $sql = mysqli_query($conn, "SELECT user_email FROM users WHERE unique_id = {$userId}");
      
      if(mysqli_num_rows($sql) > 0){
         $row = mysqli_fetch_assoc($sql);
         if ($row['user_email'] == $useremail){
            echo "success";
         }
      }else{
         echo "error";
      }
   }
   if ($oldPass){
      $sql = mysqli_query($conn, "SELECT * FROM users WHERE user_password = '{$oldPass}' AND unique_id={$userId}");
      
      if(mysqli_num_rows($sql) > 0){
         $record = mysqli_query($conn, "UPDATE users SET user_password='{$newPass}' WHERE unique_id={$userId}");
         $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE user_password='{$newPass}' AND unique_id={$userId}");
         if(mysqli_num_rows($sql2) > 0){
            echo "success";
         }else{
            echo "не перезаписался";
         }
      }else{
         echo "error";
      }
   }

   if (isset($_FILES['photo'])){
      $img_name = $_FILES['photo']['name'];
      $tmp_name = $_FILES['photo']['tmp_name'];

      $time = time();
      $new_name = $time.$img_name;

      if (move_uploaded_file($tmp_name, "images/".$new_name)){
         $record = mysqli_query($conn, "UPDATE users SET user_img='$new_name' WHERE unique_id={$userId}");

         $sql = mysqli_query($conn, "SELECT * FROM users WHERE user_img='{$new_name}' AND unique_id={$userId}");
         if(mysqli_num_rows($sql) > 0){
            //удаляем фотографии, которых уже нет в бд
            $getImages = mysqli_query($conn, "SELECT * FROM users");
            $dir = opendir("./images/");
            while($row=mysqli_fetch_array($getImages)){
               while ($file = readdir($dir)){
                  if($row["user_img"] != $file){
                     unlink("images/".$file);
                  }
               }
            }
            closedir($dir);
            echo $new_name;
         }else{
            echo "error";
         }
      }else{
         echo "error";
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

   
?>