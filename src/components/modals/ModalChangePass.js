import './otherModals.scss';
import { useState, useEffect, useRef } from 'react';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';
import { useInput } from '../../hooks/useInput';
import useBookmeService from '../../services/BookmeService';


const ModalChangePass = ({setModalActive, user}) => {
   const oldPassInput = useInput('');
   const newPassInput = useInput('');
   const repeatPassInput = useInput('');

   const modal = useRef();
   const form = useRef();
   
   const [errorMessage, setErrorMessage] = useState('');

   const {updateUserData} = useBookmeService();


   const submitForm = async () => {

      if (!oldPassInput.value.length || !newPassInput.value.length || !repeatPassInput.value.length){
         setErrorMessage('Пожалуйста, заполните все поля');
         return;
      } else if(newPassInput.value.length < 6 || newPassInput.value.length > 30){
         setErrorMessage('Пароль должен быть длиной от 6 до 30 символов');
         return;
      } else if(newPassInput.value !== repeatPassInput.value){
         setErrorMessage('Новые пароли не совпадают');
         return;
      }
      
      setErrorMessage('');

      const formData = new FormData(form.current);
      formData.append("id", user[1]);

      updateUserData(formData).then(res => {
         if (res === 'error'){
            setErrorMessage('Старый пароль введен некорректно');
         } else if (res === 'success'){
            setModalActive(false);
            oldPassInput.removeValue();
            newPassInput.removeValue();
            repeatPassInput.removeValue();
            form.current.reset();
         } else{
            console.log(res);
         }
      });
   }

   const errorDiv = errorMessage ? <div className="error-message">{errorMessage}</div> : null;
   return (
      <div className="modal__content modal-change-password__content" ref={modal} onClick={e => e.stopPropagation()}>
         <h3 className="modal__title">Изменить пароль</h3>
         {errorDiv}
         <form className="modal__form" action="/" method="POST" ref={form} onSubmit={e => e.preventDefault()}>
            <InputWithLabel labelClass="modal__label" labelTitle={"Старый пароль"}>
               <Input inputType="password" inputName="oldPass" inputText="Введите старый пароль" 
                  value={oldPassInput.value} onChange={oldPassInput.onChange}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle={"Новый пароль"}>
               <Input inputType="password" inputName="newPass" inputText="Введите новый пароль" 
                  value={newPassInput.value} onChange={newPassInput.onChange}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle={"Повторите пароль"}>
               <Input inputType="password" inputName="repeatPass" inputText="Повторите новый пароль" 
                  value={repeatPassInput.value} onChange={repeatPassInput.onChange}
               />
            </InputWithLabel>
            <div className="modal__bottom-btns">
               <button className="button-reset button modal__btn modal__close" type="button" onClick={() => setModalActive(false)}>Отмена</button>
               <button className="button-reset button modal__btn modal__ready" type="submit" onClick={submitForm}>Готово</button>
            </div>
         </form>
      </div>
   )
}
export default ModalChangePass;