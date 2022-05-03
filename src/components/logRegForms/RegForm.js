import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import useBookmeService from '../../services/BookmeService';
import useValidation from '../../hooks/useValidation';
import { useInput } from '../../hooks/useInput';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';
import FormPassword from '../formPassword/FormPassword';


const RegForm = ({toggleForm}) => {
   const nameInput = useInput('');
   const emailInput = useInput('');
   const passwordInput = useInput('');
   const form = useRef(null);
   const [errorMessage, setErrorMessage] = useState('');

   const {universalRequest} = useBookmeService();
   const {registrationValid} = useValidation();
   const navigate = useNavigate();


   const formSubmit = async () => {
      const successValid = registrationValid(nameInput.value, emailInput.value, passwordInput.value);
      
      if (successValid === true){
         setErrorMessage('');
         const formData = new FormData(form.current);
         universalRequest('registration', formData).then(onUserRegistered);

      } else {
         setErrorMessage(successValid);
      }
   }

   const onUserRegistered = (res) => {
      if (/^(0|[1-9]\d*)$/.test(res)){
         setErrorMessage('');
         navigate('/moderator');
         localStorage.setItem('authorized', res);
      } else {
         setErrorMessage(res);
      }
   }

   return (
      <div className={`form active`}>
         <h2 className="form__title">Регистрация</h2>
         {errorMessage ? <div className="error-message form__error-message">{errorMessage}</div> : null}
         <form action="#" onSubmit={(e) => e.preventDefault()} ref={form}>
            <InputWithLabel labelClass="form__label" labelTitle="Имя пользователя">
               <Input inputType="text" inputName="name" inputText="Введите своё имя" value={nameInput.value} onChange={nameInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="form__label" labelTitle="Почтовый адрес">
               <Input inputType="text" inputName="email" inputText="Введите свою почту" value={emailInput.value} onChange={emailInput.onChange}/>
            </InputWithLabel>
            <FormPassword labelText="Пароль" placeholder="Введите пароль" password={passwordInput.value} changePassword={passwordInput.onChange}/>
            
            <Button 
               buttonClass="form__btn"
               type="submit"
               onClick={formSubmit}>
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