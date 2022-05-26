import {useHttp} from '../hooks/http.hook';

const useBookmeService = () => {
   const {loading, setLoading, request} = useHttp();
   const link = "https://bookme.lavro.ru/server/"; //http://localhost/bookme-server/

   const universalRequest = async (req, data, header) => {
      let url = link;
      let answerType = 'json';

      switch(req) {
         case 'getAllRespondents': //+
            url += 'respondents/respondents.php';
            break;

         case 'addRespondent': //+
            url += 'respondents/add-respond.php';
            break;

         case 'removeRespondent': //+
            url += 'respondents/remove-respond.php';
            break;
         
         case 'editRespondent': //+
            url += 'respondents/edit-respond.php';
            break;

         case 'login': //+
            url += 'api/login.php';
            break;

         case 'registration': //+
            url += 'api/register.php';
            break;

         case 'getLoggedUser': //+
            url += 'api/get-user.php';
            break;
         
         case 'updateUserData': //+
            url += 'users/update-user.php';
            break;

         case 'addProject':
            url += 'projects/add-project.php';
            answerType = 'text';
            break;

         case 'getProjects':
            url += 'projects/get-projects.php';
            break;

         case 'getProjectName':
            url += 'projects/get-project-name.php';
            answerType = 'text';
            break;

         case 'getOneProject':
            url += 'projects/get-one-project.php';
            break;

         case 'addEntry':
            url += 'entries/add-entry.php';
            break;

         case 'test':
            url += 'api/test.php';
            break;

         default: break;
      }
      
      if (url === link){
         return;
      }

      let answer;
      data ? answer = await request(url, 'POST', data, header) : answer = await request(url);
      
      let res;
      answerType === 'json' ? res = await answer.json() : res = await answer.text();

      return res;
   }

   return {
      loading, 
      setLoading,
      universalRequest
   };
}

export default useBookmeService;