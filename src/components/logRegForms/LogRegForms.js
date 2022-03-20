import { useState, useRef } from 'react';

import './logRegForms.scss';

import RegForm from './RegForm';
import LogForm from './LogForm';


function useValidateInput(initialValue) {
   const [value, setValue] = useState(initialValue);

   const onChange = e => {
      setValue(e.target.value);
   }

   // const validateInput = () => {
   //    return value.search(/\d/) >= 0;
   // }

   return {value, onChange};
}

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
                  <LogForm useValidateInput={useValidateInput} formSubmit={formSubmit} active={activeForm} toggleForm={toggleForm}/>
                  <RegForm useValidateInput={useValidateInput} formSubmit={formSubmit} active={activeForm} toggleForm={toggleForm}/>
               </div>
            </div>
         </div>
      </section>
   )
}
export default LogRegForms;