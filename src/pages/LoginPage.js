import HeaderTop from '../components/headerTop/HeaderTop';
import LogRegForms from '../components/logRegForms/LogRegForms';

const LoginPage = ({onLogin}) => {
   
   return (
      <>
         <HeaderTop/>
         <main>
            <LogRegForms onLogin={onLogin}/>
         </main>
      </>
   )
}
export default LoginPage;