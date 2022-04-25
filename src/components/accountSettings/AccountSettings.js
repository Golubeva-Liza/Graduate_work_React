import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useInput } from '../../hooks/useInput';
import useBookmeService from '../../services/BookmeService';

import Input from '../input/Input';
import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Button from '../button/Button';
import Popup from '../popup/Popup';
import { DefaultUser } from '../../resources';

import './accountSettings.scss';

const AccountSettings = ({setModalPasswordActive, setModalFileActive, user, setUser}) => {
   let navigate = useNavigate();
   const { updateUserData } = useBookmeService();
   
   const userName = useInput('');//значение
   const nameInput = useRef();//ссылка
   const nameForm = useRef();//форма
   const [nameEdit, setNameEdit] = useState(false);//статус: редактируется или нет
   const [errorNameMessage, setErrorNameMessage] = useState('');
   const [removePhoto, setRemovePhoto] = useState(false);

   const userEmail = useInput('');//значение
   const emailInput = useRef();//ссылка
   const emailForm = useRef();//форма
   const [emailEdit, setEmailEdit] = useState(false);//статус: редактируется или нет
   const [errorEmailMessage, setErrorEmailMessage] = useState('');
   
   const [popupActive, setPopupActive] = useState(false);


   const toggleNameInput = () => {
      if (nameEdit){//перед закрытием
         userName.removeValue();
         setErrorNameMessage('');
      } else{
         nameInput.current.focus();
      }
      setNameEdit(!nameEdit);
   }

   const toggleEmailInput = () => {
      if (emailEdit){//перед закрытием
         userEmail.removeValue();
         setErrorEmailMessage('');
      } else{
         emailInput.current.focus();
      }
      setEmailEdit(!emailEdit);
   }

   const updateName = () => {
      if (userName.value.length < 3 || userName.value.length >= 30){
         setErrorNameMessage('Имя пользователя должно быть длиной от 3 до 30 символов');
         return;
      } 
      setErrorNameMessage('');
      
      const form = new FormData(nameForm.current);

      form.append("id", user[1]);
      updateUserData(form).then(res => {
         if (res === "success"){
            const updatedUser = [...user.slice(0, 2), userName.value, ...user.slice(3)];
            setUser(updatedUser);
            setNameEdit(false);
            userName.removeValue();
         }
      });
   }

   const updateEmail = () => {
      const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!emailReg.test(String(userEmail.value).toLocaleLowerCase())){
         setErrorEmailMessage('Введите корректный почтовый адрес');
         return;
      }
      setErrorEmailMessage('');

      const form = new FormData(emailForm.current);

      form.append("id", user[1]);
      updateUserData(form).then(res => {
         if (res === "success"){
            const updatedUser = [...user.slice(0, 3), userEmail.value, ...user.slice(4)];
            setUser(updatedUser);
            setEmailEdit(false);
            userEmail.removeValue();
         }
      });
   }

   const logout = () => {
      localStorage.removeItem('authorized');
      navigate('/');
   }

   const onUploadPhoto = () => {
      setModalFileActive(true);
      setPopupActive(false);
   }

   useEffect(() => {
      if (removePhoto){
         console.log('удаление фотографии');

         const formData = new FormData();
         formData.append("id", user[1]);
         formData.append("removePhoto", true);

         updateUserData(formData).then(res => {
            if (res == 'success'){
               console.log('success');
               const updatedUser = [...user.slice(0, 4), ''];
               setUser(updatedUser);
               setModalFileActive(false);
               setPopupActive(false);
            }
         });

         setRemovePhoto(false);
      }
      
   }, [removePhoto])

   const onRemovePhoto = () => {
      setRemovePhoto(true);
   }

   const errorName = errorNameMessage ? <div className="account-settings__error-message">{errorNameMessage}</div> : null;
   const errorEmail = errorEmailMessage ? <div className="account-settings__error-message">{errorEmailMessage}</div> : null;

   return (
      <aside className="account-settings">
         <div className="account-settings__photo">
            <button className={`button-reset account-settings__photo-btn${user[4] ? "" : " default"}`} onClick={() => setPopupActive(!popupActive)}>
               <img src={user[4] ? `http://localhost/bookme-server/images/${user[4]}` : DefaultUser} alt="avatar"/>
            </button>
            <Popup 
               items={['Загрузить новую', 'Удалить']}
               popupClass={'account-settings__add-photo'} 
               popupOpened={popupActive}
               setPopupActive={setPopupActive}
               onClick={[onUploadPhoto, onRemovePhoto]}
            />
         </div>
         <span className="account-settings__name">{user[2]}</span>

         <form className={`account-settings__setting ${nameEdit ? 'changing' : ''}`} onSubmit={(e) => e.preventDefault()} ref={nameForm}>
            <div className="account-settings__label">
               <span className="account-settings__setting-title">Логин</span>
               <div className="account-settings__setting-wrapper">
                  <span className="account-settings__setting-value">{user[2]}</span>
                  <button className={'button-reset account-settings__edit'} onClick={toggleNameInput}>{nameEdit ? 'Отменить' : 'Изменить'}</button>
               </div>
               {/* из-за рефа */}
               <input 
                  className={`input ${nameEdit ? '' : 'visually-hidden'}`}
                  type="text"
                  name="username"
                  autoComplete="off"
                  value={userName.value}
                  onChange={userName.onChange}
                  ref={nameInput}
               />
               {errorName}
            </div>
            <button className={`button-reset button ${nameEdit ? '' : 'visually-hidden'}`} type='submit' onClick={updateName} disabled={userName.value == '' ? true : false}>Сохранить изменения</button>
         </form>

         <form className={`account-settings__setting ${emailEdit ? 'changing' : ''}`} onSubmit={(e) => e.preventDefault()} ref={emailForm}>
            <div className="account-settings__label">
               <span className="account-settings__setting-title">Почтовый адрес</span>
               <div className="account-settings__setting-wrapper">
                  <span className="account-settings__setting-value">{user[3]}</span>
                  <button className={'button-reset account-settings__edit'} onClick={toggleEmailInput}>{emailEdit ? 'Отменить' : 'Изменить'}</button>
               </div>
               <input 
                  className={`input ${emailEdit ? '' : 'visually-hidden'}`}
                  type="text"
                  name="useremail"
                  autoComplete="off"
                  value={userEmail.value}
                  onChange={userEmail.onChange}
                  ref={emailInput}
               />
               {errorEmail}
            </div>
            <button className={`button-reset button ${emailEdit ? '' : 'visually-hidden'}`} type='submit' onClick={updateEmail} disabled={userEmail.value == '' ? true : false}>Сохранить изменения</button>
         </form>

         <button className="button-reset account-settings__password" onClick={() => setModalPasswordActive(true)}>Изменить пароль</button>

         <Button buttonClass="account-settings__logout" onClick={logout}>Выйти из системы</Button>
      </aside>
   )
}
export default AccountSettings;