import {useHttp} from '../hooks/http.hook';

const useBookmeService = () => {
   const {loading, setLoading, request} = useHttp();
   const link = "http://localhost/bookme-server/";

   const universalRequest = async (req, data) => {
      let url = link;
      let answerType = 'json';

      switch(req) {
         case 'getAllRespondents':
            url += 'respondents/respondents.php';
            break;

         case 'addRespondent':
            url += 'respondents/add-respond.php';
            break;

         case 'removeRespondent':
            url += 'respondents/remove-respond.php';
            answerType = 'text';
            break;
         
         case 'editRespondent':
            url += 'respondents/edit-respond.php';
            break;

         case 'login':
            url += 'authorization/login.php';
            answerType = 'text';
            break;

         case 'registration':
            url += 'authorization/signup.php';
            answerType = 'text';
            break;

         case 'getLoggedUser':
            url += 'users/get-user.php';
            break;
         
         case 'updateUserData':
            url += 'users/update-user.php';
            answerType = 'text';
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

         default: break;
      }
      
      if (url === link){
         return;
      }

      let answer;
      data ? answer = await request(url, 'POST', data) : answer = await request(url);
      
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