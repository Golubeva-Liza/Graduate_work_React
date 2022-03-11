import { useState, useRef } from 'react';

import './logRegForms.scss';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Button from '../button/Button';


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
   const nameInput = useValidateInput('');
   const loginInput = useValidateInput('');
   const passwordInput = useValidateInput('');
   const form = useRef(null);

   const formSubmit = (e) => {
      e.preventDefault();
   }

   const clickHandler = async () => {
      
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
      console.log(data);
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
                  <div className="form login-form">
                     <h2 className="form__title">Зарегистрироваться как модератор</h2>
                     <form action="#" onSubmit={formSubmit} ref={form}>
                        <InputWithLabel 
                           labelClass="form__label"
                           inputType="text"
                           inputName="name"
                           inputText="Введите своё имя"
                           value={nameInput.value}
                           onChange={nameInput.onChange} 
                        >
                           Имя пользователя
                        </InputWithLabel>
                        <InputWithLabel 
                           labelClass="form__label"
                           inputType="text"
                           inputName="login"
                           inputText="Введите логин или почту"
                           value={loginInput.value}
                           onChange={loginInput.onChange} 
                        >
                           Логин или почта
                        </InputWithLabel>
                        <InputWithLabel 
                           labelClass="form__label"
                           inputType="password"
                           inputName="password"
                           inputText="Введите пароль"
                           value={passwordInput.value}
                           onChange={passwordInput.onChange}>
                           Пароль
                        </InputWithLabel>
                        <Button 
                           buttonClass="form__btn"
                           type="submit"
                           onClick={clickHandler}>
                           Войти
                        </Button>
                     </form>
                     <p className="form__bottom">Нет аккаунта? <a href="#">Создать аккаунт</a></p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
export default LogRegForms;