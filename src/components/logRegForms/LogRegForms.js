import { useState } from 'react';

import './logRegForms.scss';
import RegForm from './RegForm';
import LogForm from './LogForm';


const LogRegForms = ({onLogin}) => {
   const [activeForm, setActiveForm] = useState('login');

   const toggleForm = () => {
      if (activeForm === "login"){
         setActiveForm("registration");
      }else{
         setActiveForm("login");
      }
   }

   return (
      <section className="log-reg-forms">
         <div className="container">
            <div className="log-reg-forms__container">
               <div className="log-reg-forms__forms">
                  {activeForm === 'login' ? 
                     <LogForm toggleForm={toggleForm} onLogin={onLogin}/>
                     :
                     <RegForm toggleForm={toggleForm}/>
                  }
               </div>
            </div>
         </div>
      </section>
   )
}
export default LogRegForms;