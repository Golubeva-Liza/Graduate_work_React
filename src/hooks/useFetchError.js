import { useNavigate } from 'react-router-dom';

const useFetchError = () => {  
   const navigate = useNavigate();

   const isFetchError = (res) => {
      if (res.error){
         return true;
   
      } else if (res.authError){
         localStorage.removeItem('userKey');
         localStorage.removeItem('authKey');
         navigate('/');
         return true;
   
      } else if (res.passwordError){
         return true;
   
      }else{
         return false;
      }
   }
   
   return {isFetchError};
}

export default useFetchError;