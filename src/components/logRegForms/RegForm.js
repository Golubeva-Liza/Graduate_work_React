import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import useBookmeService from '../../services/BookmeService';
import useValidation from '../../hooks/useValidation';
import { useInput } from '../../hooks/useInput';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';
import FormPassword from '../formPassword/FormPassword';
import ErrorMessage from '../errorMessage/ErrorMessage';


const RegForm = ({toggleForm, onLogin}) => {
   const nameInput = useInput('');
   const emailInput = useInput('');
   const codeInput = useInput('');
   const passwordInput = useInput('');
   const form = useRef(null);
   const [globalErrorMessage, setGlobalErrorMessage] = useState('');

   const {universalRequest} = useBookmeService();
   const {validation, errorMessage} = useValidation();


   const formSubmit = () => {
      const formData = new FormData(form.current);
      universalRequest('registration', formData).then((res) => onUserRegistered(res));
   }

   const onUserRegistered = (res) => {
      if (res.error){
         setGlobalErrorMessage(res.error);
      } else{
         onLogin(res);
      }
      // console.log(res);
   }

   return (
      <div className={`form active`}>
         <h2 className="form__title">Регистрация</h2>
         {globalErrorMessage ? <div className="error-message form__error-message">{globalErrorMessage}</div> : null}
         <form action="#" onSubmit={(e) => e.preventDefault()} ref={form}>
            <InputWithLabel labelClass="form__label" labelTitle="Имя пользователя">
               <Input 
                  inputType="text" 
                  inputName="name"
                  inputText="Введите своё имя" 
                  value={nameInput.value} 
                  onChange={nameInput.onChange}
                  onBlur={e => validation(e)}
               />
               {errorMessage.name ? <ErrorMessage message={errorMessage.name}/> : null}
            </InputWithLabel>
            <InputWithLabel labelClass="form__label" labelTitle="Почтовый адрес">
               <Input 
                  inputType="text" 
                  inputName="email" 
                  inputText="Введите свою почту" 
                  value={emailInput.value} 
                  onChange={emailInput.onChange}
                  onBlur={e => validation(e)}
               />
               {errorMessage.email ? <ErrorMessage message={errorMessage.email}/> : null}
            </InputWithLabel>
            <InputWithLabel labelClass="form__label" labelTitle="Код доступа">
               <Input inputType="text" inputName="code" inputText="Введите код доступа" value={codeInput.value} onChange={codeInput.onChange}/>
            </InputWithLabel>
            <FormPassword 
               labelText="Пароль" 
               placeholder="Введите пароль" 
               password={passwordInput.value} 
               changePassword={passwordInput.onChange}
               onBlur={e => validation(e)}
               errorMessage={errorMessage}
            />
            
            
            <Button 
               buttonClass="form__btn"
               type="submit"
               onClick={formSubmit}
               disabled={
                  nameInput.value !== '' 
                  && emailInput.value !== '' 
                  && codeInput.value !== '' 
                  && passwordInput.value.length > 5
                  && Object.keys(errorMessage).length == 0
                  ? false : true}
            >
               Зарегистрироваться
            </Button>
         </form>
         <p className="form__bottom">Есть аккаунт? 
            <button className="button-reset form__change-btn" type="button" onClick={toggleForm}>Войти</button>
         </p>
      </div>
   )
}
export default RegForm;