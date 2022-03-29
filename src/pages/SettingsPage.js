import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import useBookmeService from '../services/BookmeService';

import HeaderSide from '../components/headerSide/HeaderSide';
import { SettingsBg } from '../resources';
import AccountSettings from '../components/accountSettings/AccountSettings';
import Modal from '../components/modals/Modal';
import ModalChangePass from '../components/modals/ModalChangePass';
import ModalAddFile from '../components/modals/ModalAddFile';


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



   const [modalPasswordActive, setModalPasswordActive] = useState(false);
   const [modalFileActive, setModalFileActive] = useState(false);

   return (
      <>
         <div className="wrapper">
            <HeaderSide user={user}/>
            <AccountSettings setModalPasswordActive={setModalPasswordActive} setModalFileActive={setModalFileActive} user={user} setUser={setUser}/>
            <main className="settings-main">
               <img src={SettingsBg} alt="settings"/>
            </main>
         </div>
         <Modal modalClass={'modal-change-password'} active={modalPasswordActive} setActive={setModalPasswordActive}>
            <ModalChangePass setModalActive={setModalPasswordActive} user={user} setUser={setUser}/>
         </Modal>
         <Modal modalClass={'modal-add-file'} active={modalFileActive} setActive={setModalFileActive} outClick>
            <ModalAddFile modalActive={modalFileActive} setModalActive={setModalFileActive} user={user} setUser={setUser}/>
         </Modal>
      </>
   )
}
export default SettingsPage;