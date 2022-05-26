import { useState, useContext } from 'react';

import { SettingsBg } from '../resources';
import AccountSettings from '../components/accountSettings/AccountSettings';
import Modal from '../components/modals/Modal';
import ModalChangePass from '../components/modals/ModalChangePass';
import ModalAddFile from '../components/modals/ModalAddFile';
import AuthContext from '../hooks/context';


const SettingsPage = ({setUser}) => {
   const user = useContext(AuthContext);

   const [modalPasswordActive, setModalPasswordActive] = useState(false);
   const [modalFileActive, setModalFileActive] = useState(false);

   return (
      <>
         <AccountSettings setModalPasswordActive={setModalPasswordActive} setModalFileActive={setModalFileActive} user={user} setUser={setUser}/>
         <main className="settings-main">
            <img src={SettingsBg} alt="settings"/>
         </main>
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