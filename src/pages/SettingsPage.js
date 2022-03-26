import { useState, useEffect, useMemo } from 'react';

import HeaderSide from '../components/headerSide/HeaderSide';
import { SettingsBg } from '../resources';
import AccountSettings from '../components/accountSettings/AccountSettings';
import Modal from '../components/modals/Modal';
import ModalChangePass from '../components/modals/ModalChangePass';
import { useNavigate } from "react-router-dom";
import useBookmeService from '../services/BookmeService';

const SettingsPage = () => {
   let navigate = useNavigate();
   const {getLoggedUser} = useBookmeService();
   const [user, setUser] = useState('');

   useEffect(() => {
      if (!localStorage.getItem('authorized')){
         navigate('/');
      }else{
         getLoggedUser(localStorage.getItem('authorized'))
            .then(res => {
               setUser(res[0]);
            }
         )
      }
   }, []);



   const [modalActive, setModalActive] = useState(false);
   return (
      <>
         <div className="wrapper">
            <HeaderSide user={user}/>
            <AccountSettings setModalActive={setModalActive} user={user} setUser={setUser}/>
            <main className="settings-main">
               <img src={SettingsBg} alt="settings"/>
            </main>
         </div>
         <Modal modalClass={'modal-change-password'} active={modalActive} setActive={setModalActive}>
            <ModalChangePass setModalActive={setModalActive}/>
         </Modal>
      </>
   )
}
export default SettingsPage;