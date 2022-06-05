import { useState, useRef} from 'react';

import useBookmeService from '../../services/BookmeService';
import { useInput } from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';
import FormPassword from '../formPassword/FormPassword';
import ErrorMessage from '../errorMessage/ErrorMessage';


const LogForm = ({toggleForm, onLogin}) => {
   const emailInput = useInput('');
   const passwordInput = useInput('');
   const form = useRef();
   const [globalErrorMessage, setGlobalErrorMessage] = useState('');

   const {universalRequest} = useBookmeService();
   const {validation, errorMessage} = useValidation();
   

   const formSubmit = async () => {
      const formData = new FormData(form.current);
      universalRequest('login', formData).then((res) => onUserLogged(res));

   }

   const onUserLogged = (res) => {
      if (res.error){
         setGlobalErrorMessage(res.error);
      } else{
         onLogin(res);
      }
   }

   return (
      <div className={`form active`}>
         <h2 className="form__title">Войти в систему</h2>
         {globalErrorMessage ? <div className="error-message form__error-message">{globalErrorMessage}</div> : null}
         <form action="#" onSubmit={(e) => e.preventDefault()} ref={form}>
            <InputWithLabel labelClass="form__label" labelTitle="Почта">
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