import { useState } from 'react';
import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import ErrorMessage from '../errorMessage/ErrorMessage';

const FormPassword = ({labelText, placeholder, password, changePassword, onBlur, errorMessage}) => {

   const [passwordBtnActive, setPasswordBtnActive] = useState(false);
   
   const togglePassword = () => {
      setPasswordBtnActive(!passwordBtnActive);
   }

   return (
      <div className="form__password">
         <InputWithLabel labelClass="form__label" labelTitle={labelText}>
            <Input 
               inputType={passwordBtnActive ? 'text' : 'password'} 
               inputName="password"
               inputText={placeholder} 
               value={password} 
               onChange={changePassword}
               onBlur={onBlur}
            />
            {errorMessage && errorMessage.password ? <ErrorMessage message={errorMessage.password}/> : null}
         </InputWithLabel>
         <button 
            className={`button-reset form__eye ${passwordBtnActive ? 'active' : ''}`}
            type="button" 
            onClick={togglePassword}
         ></button>
      </div>
   )
}
export default FormPassword;