import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useInput } from '../../hooks/useInput';

import Input from '../input/Input';
import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Button from '../button/Button';
import Popup from '../popup/Popup';
import { EditIcon, DefaultUser } from '../../resources';


import './accountSettings.scss';

const AccountSettings = ({setModalActive, user}) => {
   let navigate = useNavigate();
   
   const userName = useInput('');
   const userEmail = useInput('');
   const userPassword = useInput('');
   const [userImg, setUserImg] = useState(DefaultUser);

   const [nameEdit, setNameEdit] = useState(false);
   const [changes, setChanges] = useState(false);

   const [popupActive, setPopupActive] = useState(false);

   useEffect(() => {
      if (user){
         userName.setValue(user[2]);
         userEmail.setValue(user[3]);
      }
   }, [user])

   const updateData = () => {
      
   }

   const changeName = () => {
      console.log(nameEdit);
      setNameEdit(!nameEdit);
      if (nameEdit === true && userName.value != user[2]){//предыдущее значение, перед закрытием
         console.log(userName.value);
         setChanges(true);
      }
   }

   const logout = () => {
      localStorage.removeItem('authorized');
      navigate('/');
   }

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
         <div className={`account-settings__setting ${nameEdit ? 'account-settings__setting_changing' : ''}`}>
            <label className="account-settings__label">
               <span className="account-settings__setting-title">Логин</span>
               <span className="account-settings__setting-value">{userName.value}</span>
               <Input inputType="text" inputName="username" inputText={userName.value} inputClass={nameEdit ? '' : 'visually-hidden'}
                  value={userName.value} onChange={userName.onChange}
               />
            </label>
            <button className={`button-reset account-settings__edit ${nameEdit ? 'active' : ''}`} onClick={changeName}>
               <EditIcon/>
            </button>
         </div>
         <div className="account-settings__setting">
            <label className="account-settings__label">
               <span className="account-settings__setting-title">Почтовый адрес</span>
               <span className="account-settings__setting-value">someEmail@yandex.ru</span>
               <input type="text" className="input visually-hidden" placeholder="someEmail@yandex.ru"/>
            </label>
            <button className="button-reset account-settings__edit" data-btn="edit-setting">
               <EditIcon/>
            </button>
         </div>
         <button className="button-reset account-settings__password" onClick={() => setModalActive(true)}>Изменить пароль</button>
         <div className="account-settings__btns">
            <button className="button-reset button account-settings__logout" onClick={logout}>Выйти из системы</button>
            <button className={`button-reset button account-settings__save ${changes ? 'active' : ''}`} onClick={updateData}>Сохранить</button>
         </div>
         
      </aside>
   )
}
export default AccountSettings;