import HeaderTop from '../components/headerTop/HeaderTop';
import LogRegForms from '../components/logRegForms/LogRegForms';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
   let navigate = useNavigate();
   useEffect(() => {
      if (localStorage.getItem('authorized')){
         navigate('/moderator');
      }
   }, []);
   
   return (
      <>
         <HeaderTop/>
         <main>
            <LogRegForms/>
         </main>
      </>
      
   )
}
export default LoginPage;