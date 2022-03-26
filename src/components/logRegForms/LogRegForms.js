import { useState, useMemo } from 'react';

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

   const regForEmail = useMemo(() => {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   }, []);

   return (
      <section className="log-reg-forms">
         <div className="container">
            <div className="log-reg-forms__container">
               <div className="log-reg-forms__forms">
                  <LogForm useValidateInput={useInput} formSubmit={formSubmit} active={activeForm} toggleForm={toggleForm} emailReg={regForEmail}/>
                  <RegForm useValidateInput={useInput} formSubmit={formSubmit} active={activeForm} toggleForm={toggleForm} emailReg={regForEmail}/>
               </div>
            </div>
         </div>
      </section>
   )
}
export default LogRegForms;