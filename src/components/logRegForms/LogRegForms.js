import { useState, useRef } from 'react';

import './logRegForms.scss';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Button from '../button/Button';
import RegForm from './RegForm';


function useValidateInput(initialValue) {
   const [value, setValue] = useState(initialValue);

   const onChange = e => {
      setValue(e.target.value);
   }

   // const validateInput = () => {
   //    return value.search(/\d/) >= 0;
   // }

   return {value, onChange}; //{value: value, onChange: onChange}
}

const LogRegForms = () => {
   const formSubmit = (e) => {
      e.preventDefault();
   }

   return (
      <section className="log-reg-forms">
         <div className="container">
            <div className="log-reg-forms__container">
               <div className="log-reg-forms__forms">
                  {/* <div className="form login-form">
                     <h2 className="form__title">Войти в систему</h2>
                     <form action="#">
                        <InputWithLabel 
                           labelClass="form__label"
                           inputType="text"
                           inputName="login"
                           inputText="Введите логин"
                        >
                           Логин или почта
                        </InputWithLabel>
                        <InputWithLabel 
                           labelClass="form__label"
                           inputType="password"
                           inputName="password"
                           inputText="Введите пароль">
                           Пароль
                        </InputWithLabel>
                        <Button 
                           buttonClass="form__btn"
                           type="button"
                           onClick={clickHandler}>
                           Войти
                        </Button>
                     </form>
                     <p className="form__bottom">Нет аккаунта? <a href="#">Создать аккаунт</a></p>
                  </div> */}
                  <RegForm useValidateInput={useValidateInput} formSubmit={formSubmit}/>
               </div>
            </div>
         </div>
      </section>
   )
}
export default LogRegForms;