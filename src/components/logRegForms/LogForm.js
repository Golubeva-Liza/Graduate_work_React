import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';

const LogForm = ({useValidateInput, formSubmit, active, toggleForm}) => {
   let navigate = useNavigate();
   const emailInput = useValidateInput('');
   const passwordInput = useValidateInput('');
   const form = useRef(null);
   const [passwordType, setPasswordType] = useState('password');
   const [passwordBtnActive, setPasswordBtnActive] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const regForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   useEffect(() => {
      localStorage.removeItem('authorized');
   }, []);

   const clickHandler = async () => {
      //валидация
      if (!regForEmail.test(String(emailInput.value).toLocaleLowerCase())){
         setErrorMessage('Введите корректный почтовый адрес');
         return;

      } else if(passwordInput.value.length === 0){
         setErrorMessage('Пароль не должен быть пустым');
         return;
      }
      
      setErrorMessage('');

      const formData = new FormData(form.current);

      const response = await fetch("http://localhost/bookme-server/login.php", {
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
      console.log(data);
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