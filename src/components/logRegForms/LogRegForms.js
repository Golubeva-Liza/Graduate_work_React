import { useState, useRef } from 'react';

import './logRegForms.scss';
import { useInput } from '../../hooks/useInput';
import RegForm from './RegForm';
import LogForm from './LogForm';


const LogRegForms = () => {
   const [activeForm, setActiveForm] = useState('login');

   const formSubmit = (e) => {
      e.preventDefault();
   }
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
                  <LogForm useValidateInput={useInput} formSubmit={formSubmit} active={activeForm} toggleForm={toggleForm}/>
                  <RegForm useValidateInput={useInput} formSubmit={formSubmit} active={activeForm} toggleForm={toggleForm}/>
               </div>
            </div>
         </div>
      </section>
   )
}
export default LogRegForms;