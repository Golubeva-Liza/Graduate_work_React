import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useInput } from '../../hooks/useInput';
import useBookmeService from '../../services/BookmeService';
import useValidation from '../../hooks/useValidation';
import useFetchError from '../../hooks/useFetchError';

import Input from '../input/Input';
import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Button from '../button/Button';
import Popup from '../popup/Popup';
import { DefaultUser } from '../../resources';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './accountSettings.scss';


const AccountSettings = ({setModalPasswordActive, setModalFileActive, user, setUser}) => {
   let navigate = useNavigate();
   const { universalRequest } = useBookmeService();
   const {errorMessage, setErrorMessage, validation} = useValidation();
   const {isFetchError} = useFetchError();
   
   const userName = useInput('');//значение
   const nameInput = useRef();//ссылка
   const nameForm = useRef();//форма
   const [nameEdit, setNameEdit] = useState(false);//статус: редактируется или нет
   const [removePhoto, setRemovePhoto] = useState(false);

   const userEmail = useInput('');//значение
   const emailInput = useRef();//ссылка
   const emailForm = useRef();//форма
   const [emailEdit, setEmailEdit] = useState(false);//статус: редактируется или нет
   
   const [popupActive, setPopupActive] = useState(false);


   const toggleNameInput = () => {
      if (nameEdit){//перед закрытием
         userName.removeValue();
         const error = {...errorMessage};
         delete error["name"]; 
         setErrorMessage(error);
      } else{
         nameInput.current.focus();
      }
      setNameEdit(!nameEdit);
   }

   const toggleEmailInput = () => {
      if (emailEdit){//перед закрытием
         const error = {...errorMessage};
         delete error["email"]; 
         setErrorMessage(error);
      } else{
         emailInput.current.focus();
      }
      setEmailEdit(!emailEdit);
   }

   const updateName = () => {
      
      const form = new FormData(nameForm.current);

      form.set('userKey', sessionStorage.getItem('userKey'));
      form.set('authKey', sessionStorage.getItem('authKey'));

      universalRequest('updateUserData', form).then(res => {
         const isError = isFetchError(res);
         if (!isError){
            const updatedUser = {...user};
            updatedUser.name = userName.value;
            setUser(updatedUser);
            setNameEdit(false);
            userName.removeValue();
         }else{
            console.log(res);
         }
      });
   }

   const updateEmail = () => {
      const form = new FormData(emailForm.current);

      form.set('userKey', sessionStorage.getItem('userKey'));
      form.set('authKey', sessionStorage.getItem('authKey'));

      universalRequest('updateUserData', form).then(res => {
         const isError = isFetchError(res);
         if (!isError){
            const updatedUser = {...user};
            updatedUser.email = userEmail.value;
            setUser(updatedUser);
            setEmailEdit(false);
            userEmail.removeValue();
         }else{
            console.log(res);
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

         universalRequest('updateUserData', formData).then(res => {
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

   return (
      <aside className="account-settings">
         <div className="account-settings__photo">
            <button className={`button-reset account-settings__photo-btn${user.img ? "" : " default"}`} onClick={() => setPopupActive(!popupActive)}>
               <img src={user.img ? `http://localhost/bookme-server/images/${user.img }` : DefaultUser} alt="avatar"/>
            </button>
            <Popup 
               items={['Загрузить новую', 'Удалить']}
               popupClass={'account-settings__add-photo'} 
               popupOpened={popupActive}
               setPopupActive={setPopupActive}
               onClick={[onUploadPhoto, onRemovePhoto]}
            />
         </div>
         <span className="account-settings__name">{user.name}</span>

         <form className={`account-settings__setting ${nameEdit ? 'changing' : ''}`} onSubmit={(e) => e.preventDefault()} ref={nameForm}>
            <div className="account-settings__label">
               <span className="account-settings__setting-title">Логин</span>
               <div className="account-settings__setting-wrapper">
                  <span className="account-settings__setting-value">{user.name}</span>
                  <button className={'button-reset account-settings__edit'} onClick={toggleNameInput}>{nameEdit ? 'Отменить' : 'Изменить'}</button>
               </div>
               {/* из-за рефа */}
               <input 
                  className={`input ${nameEdit ? '' : 'visually-hidden'}`}
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={userName.value}
                  onChange={userName.onChange}
                  ref={nameInput}
                  onBlur={e => validation(e)}
               />
               {errorMessage.name ? <ErrorMessage message={errorMessage.name}/> : null}
            </div>
            <Button 
               buttonClass={`${nameEdit ? '' : 'visually-hidden'}`}
               onClick={updateName} 
               disabled={userName.value.length > 3 && userName.value.length < 30 && !errorMessage.name ? false : true}
            >
               Сохранить изменения
            </Button>
         </form>

         <form className={`account-settings__setting ${emailEdit ? 'changing' : ''}`} onSubmit={(e) => e.preventDefault()} ref={emailForm}>
            <div className="account-settings__label">
               <span className="account-settings__setting-title">Почтовый адрес</span>
               <div className="account-settings__setting-wrapper">
                  <span className="account-settings__setting-value">{user.email}</span>
                  <button className={'button-reset account-settings__edit'} onClick={toggleEmailInput}>{emailEdit ? 'Отменить' : 'Изменить'}</button>
               </div>
               <input 
                  className={`input ${emailEdit ? '' : 'visually-hidden'}`}
                  type="text"
                  name="email"
                  autoComplete="off"
                  value={userEmail.value}
                  onChange={userEmail.onChange}
                  ref={emailInput}
                  onBlur={e => validation(e)}
               />
               {errorMessage.email ? <ErrorMessage message={errorMessage.email}/> : null}
            </div>
            <Button 
               buttonClass={`${emailEdit ? '' : 'visually-hidden'}`}
               onClick={updateEmail} 
               disabled={userEmail.value !== '' && !errorMessage.email ? false : true}
            >
               Сохранить изменения
            </Button>
         </form>

         <button className="button-reset account-settings__password" onClick={() => setModalPasswordActive(true)}>Изменить пароль</button>

         <Button buttonClass="account-settings__logout" onClick={logout}>Выйти из системы</Button>
      </aside>
   )
}
export default AccountSettings;