import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';
import useBookmeService from '../../services/BookmeService';

const LogForm = ({useValidateInput, formSubmit, active, toggleForm, emailReg}) => {
   const emailInput = useValidateInput('');
   const passwordInput = useValidateInput('');
   const form = useRef();
   const [passwordType, setPasswordType] = useState('password');
   const [passwordBtnActive, setPasswordBtnActive] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const {login} = useBookmeService();
   let navigate = useNavigate();
   

   const clickHandler = async () => {
      //валидация
      if (!emailReg.test(String(emailInput.value).toLocaleLowerCase())){
         setErrorMessage('Введите корректный почтовый адрес');
         return;

      } else if(passwordInput.value.length === 0){
         setErrorMessage('Пароль не должен быть пустым');
         return;
      }
      
      setErrorMessage('');
      const formData = new FormData(form.current);

      login(formData).then(onUserLogin);
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

   const togglePassword = () => {
      setPasswordBtnActive(!passwordBtnActive);
      if (passwordType === 'password'){
         setPasswordType('text');
      }else {
         setPasswordType('password');
      }
   }

   const activePassword = passwordBtnActive ? 'active' : '';
   const errorDiv = errorMessage ? <div className="error-message form__error-message">{errorMessage}</div> : null;
   const formActiveClass = active === "login" ? 'active' : '';
   return (
      <div className={`form login-form ${formActiveClass}`}>
         <h2 className="form__title">Войти в систему</h2>
         {errorDiv}
         <form action="#" onSubmit={formSubmit} ref={form}>
            <InputWithLabel labelClass="form__label" labelTitle="Почта">
               <Input inputType="text" inputName="email" inputText="Введите свою почту" value={emailInput.value} onChange={emailInput.onChange}/>
            </InputWithLabel>
            <div className="form__password">
               <InputWithLabel labelClass="form__label" labelTitle="Пароль">
                  <Input inputType={passwordType} inputName="password" inputText="Введите пароль" value={passwordInput.value} onChange={passwordInput.onChange}/>
               </InputWithLabel>
               <button className={`button-reset form__eye ${activePassword}`} type="button" onClick={togglePassword}></button>
            </div>
            <Button 
               buttonClass="form__btn"
               type="button"
               onClick={clickHandler}>
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