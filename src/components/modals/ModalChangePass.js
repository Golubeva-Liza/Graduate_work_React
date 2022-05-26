import './otherModals.scss';
import { useState, useEffect, useRef } from 'react';

import useBookmeService from '../../services/BookmeService';
import useValidation from '../../hooks/useValidation';
import useFetchError from '../../hooks/useFetchError';
import { useInput } from '../../hooks/useInput';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Button from '../button/Button';


const ModalChangePass = ({setModalActive, user}) => {
   const {errorMessage, setErrorMessage, validation} = useValidation();
   const {universalRequest} = useBookmeService();
   const {isFetchError} = useFetchError();

   const oldPassInput = useInput('');
   const newPassInput = useInput('');
   const repeatPassInput = useInput('');

   const [oldPassError, setOldPassError] = useState('');

   const modal = useRef();
   const form = useRef();

   const submitForm = async () => {

      const formData = new FormData(form.current);
      formData.set('userKey', sessionStorage.getItem('userKey'));
      formData.set('authKey', sessionStorage.getItem('authKey'));

      universalRequest('updateUserData', formData).then(res => {

         const isError = isFetchError(res);
         if (!isError){
            setModalActive(false);
            oldPassInput.removeValue();
            newPassInput.removeValue();
            repeatPassInput.removeValue();
            form.current.reset();

         }else if (res.passwordError) {
            setOldPassError(res.passwordError);
            
         } else{
            console.log(res);
         }
      });
   }

   return (
      <div className="modal__content modal-change-password__content" ref={modal} onClick={e => e.stopPropagation()}>
         <h3 className="modal__title">Изменить пароль</h3>
         <form className="modal__form" action="/" method="POST" ref={form} onSubmit={e => e.preventDefault()}>
            <InputWithLabel labelClass="modal__label" labelTitle={"Старый пароль"}>
               <Input inputType="password" inputName="oldPass" inputText="Введите старый пароль" 
                  value={oldPassInput.value} onChange={oldPassInput.onChange}
                  onBlur={oldPassError ? () => setOldPassError(false) : null}
               />
               {oldPassError ? <ErrorMessage message={oldPassError}/> : null}
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle={"Новый пароль"}>
               <Input inputType="password" inputName="newPass" inputText="Введите новый пароль" 
                  value={newPassInput.value} onChange={newPassInput.onChange}
                  onBlur={e => validation(e)}
               />
               {errorMessage.newPass ? <ErrorMessage message={errorMessage.newPass}/> : null}
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle={"Повторите пароль"}>
               <Input inputType="password" inputName="repeatPass" inputText="Повторите новый пароль" 
                  value={repeatPassInput.value} onChange={repeatPassInput.onChange}
               />
               {newPassInput.value !== repeatPassInput.value ? <ErrorMessage message={'Пароли не совпадают'}/> : null}
            </InputWithLabel>
            <div className="modal__bottom-btns">
               <Button buttonClass="modal__btn modal__close" onClick={() => setModalActive(false)}>Отмена</Button>
               <Button 
                  buttonClass="modal__btn modal__ready" 
                  onClick={submitForm}
                  disabled={ 
                     oldPassInput.value !== '' 
                     && Object.keys(errorMessage).length == 0 
                     && newPassInput.value == repeatPassInput.value
                     ? false : true
                  }
               >
                  Готово
               </Button>
            </div>
         </form>
      </div>
   )
}
export default ModalChangePass;