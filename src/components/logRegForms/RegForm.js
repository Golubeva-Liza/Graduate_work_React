import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';

const RegForm = ({useValidateInput, formSubmit, active, toggleForm}) => {
   let navigate = useNavigate();
   const nameInput = useValidateInput('');
   const emailInput = useValidateInput('');
   const passwordInput = useValidateInput('');
   const form = useRef(null);
   const [passwordType, setPasswordType] = useState('password');
   const [passwordBtnActive, setPasswordBtnActive] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const regForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
         regForPassword  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

   useEffect(() => {
      localStorage.removeItem('authorized');
   }, []);

   const clickHandler = async () => {

      //валидация
      if (nameInput.value.length < 3 || nameInput.value.length >= 30){
         setErrorMessage('Имя пользователя должно быть длиной от 3 до 30 символов');
         return;
         
      } else if (!regForEmail.test(String(emailInput.value).toLocaleLowerCase())){
         setErrorMessage('Введите корректный почтовый адрес');
         return;

      } else if(passwordInput.value.length < 6 || passwordInput.value.length > 30){
         setErrorMessage('Пароль должен быть длиной от 6 до 30 символов');
         return;
      }
      
      setErrorMessage('');

      const formData = new FormData(form.current);
      console.log(formData);

      const response = await fetch("http://localhost/bookme-server/signup.php", {
         method : 'POST',
         header : {
            'Content-Type': 'application/json'
         },
         body: formData,
      });

      if (!response.ok) {
         throw new Error(`Could not fetch this, status: ${response.status}`);
      }

      const data = await response.text();

      if (data === "success"){
         setErrorMessage('');
         navigate('/moderator');
         localStorage.setItem('authorized', emailInput.value);
      } else {
         setErrorMessage(data);
      }
      // console.log(data);
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
   const errorDiv = errorMessage ? <div className="form__message">{errorMessage}</div> : null;
   const formActiveClass = active === "registration" ? 'active' : '';
   return (
      <div className={`form login-form ${formActiveClass}`}>
         <h2 className="form__title">Регистрация</h2>
         {errorDiv}
         <form action="#" onSubmit={formSubmit} ref={form}>
            <InputWithLabel labelClass="form__label" labelTitle="Имя пользователя">
               <Input inputType="text" inputName="name" inputText="Введите своё имя" value={nameInput.value} onChange={nameInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="form__label" labelTitle="Почтовый адрес">
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
               type="submit"
               onClick={clickHandler}>
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