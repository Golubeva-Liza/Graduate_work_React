<?php
   include_once "../index.php";
   include_once "../settings.php";
   require_once ("../api/checkUser.php");


   $info = json_decode(file_get_contents("php://input"));
   $key = $info->key;
   $user = $info->user;

   //проверка, что запрос посылает авторизованный пользователь
   $result = checkUser($conn, $authTime, $key, $user); //приходит массив с данными пользователя или с ошибкой

   if ($result["authError"]){
      echo json_encode($result);

   } else{
      // echo json_encode($result);
      $projects = mysqli_query($conn, "SELECT * FROM projects");

      if(mysqli_num_rows($projects) > 0){

         //1) подготовка записей
         $sqlentries = mysqli_query($conn, "SELECT * FROM entries");
         $entries = array();

         while ($entrie = $sqlentries->fetch_assoc()) {

            //получаем информацию из таблицы респондентов только тогда, когда обращаемся впервые
            $find = array_search($entrie['respondent'], array_column($entries, 'respondent'));
            $respondInfo = null;

            if ($find === false){
               $respondSql = mysqli_query($conn, "SELECT name, email FROM respondents WHERE id={$entrie['respondent']}");
               $respondInfo = $respondSql->fetch_assoc();

            } else {
               $respondInfo = array('name' => $entries[$find]['name'], 'email' => $entries[$find]['email']);
            }

            //преобразование промежутка даты к виду time: "12:30-13:00"
            $entriesInfo = array_merge($entrie, $respondInfo);
            $entriesInfo['time'] = $entriesInfo['firstTime'] . '-' . $entriesInfo['lastTime'];
            unset($entriesInfo['firstTime']);
            unset($entriesInfo['lastTime']);
 
            array_push($entries, $entriesInfo);
         }

         //список всех записей готов $entries

         
         $res = array();
         while ($row = $projects->fetch_assoc()) {
            $array = array();

            $projId = $row['projId'];
            
            //даты тестирования
            $test_dates = mysqli_query($conn, "SELECT firstTime, lastTime, date FROM timeintervals WHERE project = {$projId}");
            $dates = mysqli_fetch_all($test_dates);

            $datesArr = array();
            foreach ($dates as $interval) {

               $find2 = array_search($interval[2], array_column($datesArr, 'date'));

               if ($find2 === false){
                  array_push($datesArr, array('date'=>$interval[2], 'intervals'=>array($interval[0] . '-' . $interval[1])));
                  
               } else {
                  array_push($datesArr[$find2]['intervals'], $interval[0] . '-' . $interval[1]);
               }
            }

            // //сортировка расписания по дате, тк по умолчанию они в порядке хранения в бд
            usort($datesArr, function($a, $b) {
               $first = new DateTime($a['date'] . '00:00:00');
               $next = new DateTime($b['date'] . '00:00:00');
               return $first->getTimestamp() - $next->getTimestamp();
            });


            //записи на этот проект
            $projEntriesFilter = array_filter($entries, function($entry) use ($projId) {return $entry['project'] == $projId;});
            //выдает чушь в виде объекта с ключами найденных совпадений


            $projEntries = array();//entriesInfo
            foreach ($projEntriesFilter as $entry) {
               $find3 = array_search($entry['date'], array_column($projEntries, 'date'));

               $entryNew = $entry;
               unset($entryNew['date']);
               unset($entryNew['project']);

               if ($find3 === false){
                  array_push($projEntries, array(
                     'date'=>$entry['date'], 
                     'entries'=>array($entryNew),
                  ));
                  
               } else {
                  array_push($projEntries[$find3]['entries'], $entryNew);
               }

            }

            //сортировка записей по дате, тк по умолчанию они в порядке хранения в бд
            usort($projEntries, function($a, $b) {
               $first = new DateTime($a['date'] . '00:00:00');
               $next = new DateTime($b['date'] . '00:00:00');
               return $first->getTimestamp() - $next->getTimestamp();
            });

            //подготовка объекта проекта
            $projectNew = $row;
            $projectNew["dates"] = $datesArr;
            $projectNew["entriesInfo"] = $projEntries;
            
            array_push($res, $projectNew);
         }
         
         $json = json_encode($res, JSON_UNESCAPED_UNICODE);
         echo $json;

      }else{
         echo json_encode(array("error"=>"Проектов нет в базе"));
      }
   }

?>