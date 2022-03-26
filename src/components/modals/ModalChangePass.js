import './otherModals.scss';
import { useState, useEffect, useRef } from 'react';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Button from '../button/Button';
import { useInput } from '../../hooks/useInput';
import useBookmeService from '../../services/BookmeService';


const ModalChangePass = ({setModalActive}) => {
   const oldPassInput = useInput('');
   const newPassInput = useInput('');
   const repeatPassInput = useInput('');

   const modal = useRef();
   const form = useRef();
   
   const [errorMessage, setErrorMessage] = useState('');

   const {changePassword} = useBookmeService();


   const scrollIntoTop = () => {
      modal.current.scrollIntoView({
         behavior: "smooth"
      });
   }

   const submitForm = async () => {
      // const phoneNum = phoneInput.value.replace(/[^0-9]/g,"");

      // if (nameInput.value.length < 3 || nameInput.value.length >= 50){
      //    setErrorMessage('Имя пользователя должно быть длиной от 3 до 50 символов');
      //    scrollIntoTop();
      //    return;
         
      // } else if (!regForEmail.test(String(emailInput.value).toLocaleLowerCase())){
      //    setErrorMessage('Введите корректный почтовый адрес');
      //    scrollIntoTop();
      //    return;

      // } else if(phoneNum.length !== 11){
      //    setErrorMessage('Введите корректный номер телефона');
      //    scrollIntoTop();
      //    return;
      // } else if (!dateInput.value && !ageInput.value){
      //    setErrorMessage('Укажите возраст или дату рождения');
      //    scrollIntoTop();
      //    return;
      // }
      
      setErrorMessage('');

      const formData = new FormData(form.current);

      // addRespondent(formData).then(onRespondentLoaded);
   }

   const onRespondentLoaded = (newRespond) => {
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