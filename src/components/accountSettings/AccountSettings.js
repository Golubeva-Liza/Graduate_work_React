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

const AccountSettings = ({setModalActive, user, setUser}) => {
   let navigate = useNavigate();
   const { updateUserData } = useBookmeService();
   
   const userName = useInput('');//значение
   const nameInput = useRef();//ссылка
   const nameForm = useRef();//форма
   const [nameEdit, setNameEdit] = useState(false);//статус: редактируется или нет

   const userEmail = useInput('');
   const [userImg, setUserImg] = useState(DefaultUser);
   const [errorMessage, setErrorMessage] = useState('');

   

   const [popupActive, setPopupActive] = useState(false);

   const toggleNameInput = () => {
      if (nameEdit){//перед закрытием
         userName.removeValue();
         setErrorMessage('');
      } else{
         nameInput.current.focus();
      }
      setNameEdit(!nameEdit);
   }

   const updateName = () => {
      if (userName.value.length < 3 || userName.value.length >= 30){
         setErrorMessage('Имя пользователя должно быть длиной от 3 до 30 символов');
         return;
      } 
      setErrorMessage('');
      
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

   const logout = () => {
      localStorage.removeItem('authorized');
      navigate('/');
   }

   const errorDiv = errorMessage ? <div className="account-settings__error-message">{errorMessage}</div> : null;

   return (
      <aside className="account-settings">
         <div className="account-settings__photo">
            <button className={`button-reset account-settings__photo-btn${userImg === DefaultUser ? " default" : ""}`} onClick={() => setPopupActive(!popupActive)}>
               <img src={userImg} alt="avatar"/>
            </button>
            <Popup 
               items={['Загрузить новую', 'Удалить']}
               popupClass={'account-settings__add-photo'} 
               popupOpened={popupActive}
               setPopupActive={setPopupActive}
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
               {errorDiv}
            </div>
            <button className={`button-reset button ${nameEdit ? '' : 'visually-hidden'}`} type='submit' onClick={updateName} disabled={userName.value == '' ? true : false}>Сохранить изменения</button>
         </form>
         
         <div className="account-settings__setting">
            <label className="account-settings__label">
               <span className="account-settings__setting-title">Почтовый адрес</span>
               <span className="account-settings__setting-value">someEmail@yandex.ru</span>
               <input type="text" className="input visually-hidden" placeholder="someEmail@yandex.ru"/>
            </label>
         </div>
         <button className="button-reset account-settings__password" onClick={() => setModalActive(true)}>Изменить пароль</button>

         <Button buttonClass="account-settings__logout" onClick={logout}>Выйти из системы</Button>
      </aside>
   )
}
export default AccountSettings;