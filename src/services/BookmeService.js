import {useHttp} from '../hooks/http.hook';

const useBookmeService = () => {
   const {loading, setLoading, request} = useHttp();
   const link = "http://localhost/bookme-server/";

   const universalRequest = async (req, data) => {
      let url = link;
      let answerType = 'json';

      switch(req) {
         case 'getAllRespondents':
            url += 'respondents.php';
            break;

         case 'addRespondent':
            url += 'add-responds.php';
            break;

         case 'removeRespondent':
            url += 'remove-respond.php';
            answerType = 'text';
            break;
         
         case 'editRespondent':
            url += 'edit-respond.php';
            break;

         case 'login':
            url += 'login.php';
            answerType = 'text';
            break;

         case 'registration':
            url += 'signup.php';
            answerType = 'text';
            break;

         case 'getLoggedUser':
            url += 'get-user.php';
            break;
         
         case 'updateUserData':
            url += 'update-user.php';
            answerType = 'text';
            break;

         case 'addProject':
            url += 'add-project.php';
            answerType = 'text';
            break;

         case 'getProjects':
            url += 'get-projects.php';
            break;

         case 'getProjectName':
            url += 'get-project-name.php';
            answerType = 'text';
            break;

         case 'getOneProject':
            url += 'get-one-project.php';
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