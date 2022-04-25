import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import useBookmeService from '../../services/BookmeService';
import { useInput } from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';
import FormPassword from '../formPassword/FormPassword';


const LogForm = ({toggleForm}) => {
   const emailInput = useInput('');
   const passwordInput = useInput('');
   const form = useRef();
   const [errorMessage, setErrorMessage] = useState('');

   const {login} = useBookmeService();
   const navigate = useNavigate();
   const {loginValid} = useValidation();
   

   const formSubmit = async () => {
      const successValid = loginValid(emailInput.value, passwordInput.value);
      
      if (successValid === true){
         setErrorMessage('');
         const formData = new FormData(form.current);
         login(formData).then(onUserLogin);

      } else {
         setErrorMessage(successValid);
      }
   }

   const onUserLogin = (res) => {
      //проверка на число, тк с сервера должен прийти id пользователя
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
         <h2 className="form__title">Войти в систему</h2>
         {errorMessage ? <div className="error-message form__error-message">{errorMessage}</div> : null}
         <form action="#" onSubmit={(e) => e.preventDefault()} ref={form}>
            <InputWithLabel labelClass="form__label" labelTitle="Почта">
               <Input inputType="text" inputName="email" inputText="Введите свою почту" value={emailInput.value} onChange={emailInput.onChange}/>
            </InputWithLabel>
            <FormPassword labelText="Пароль" placeholder="Введите пароль" password={passwordInput.value} changePassword={passwordInput.onChange}/>
            <Button 
               buttonClass="form__btn"
               type="button"
               onClick={formSubmit}>
               Войти
            </Button>
         </form>
         <p className="form__bottom">Нет аккаунта?  
            <button className="button-reset form__change-btn" type="button" onClick={toggleForm}>Создать аккаунт</button>
         </p>
      </div>
   )
}
export default LogForm;