import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import HeaderSide from '../components/headerSide/HeaderSide';
import RespondDbSettings from '../components/respondDbSettings/RespondDbSettings';
import RespondDb from '../components/respondDb/RespondDb';
import Modal from '../components/modals/Modal';
import ModalAddRespond from '../components/modals/ModalAddRespond';
import ModalEditRespond from '../components/modals/ModalEditRespond';
import useBookmeService from '../services/BookmeService';


const ModeratorPage = () => {
   let navigate = useNavigate();
   const {getAllRespondents, getLoggedUser} = useBookmeService();
   const [user, setUser] = useState('');

   useEffect(() => {
      if (!localStorage.getItem('authorized')){
         navigate('/');
      }else{
         getLoggedUser(localStorage.getItem('authorized'))
            .then(res => {
               setUser(res[0]);
            })
      }
   }, []);

   const [modalAddActive, setModalAddActive] = useState(false);
   const [modalEditActive, setModalEditActive] = useState(false);
   const [respondents, setRespondents] = useState([]);
   const [editRespond, setEditRespond] = useState(null);

   const regForEmail = useMemo(() => {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   }, []);

   useEffect(() => {
      loadRespondents();
   }, []);

   const loadRespondents = async () => {
      getAllRespondents()
         .then(onRespondentsLoaded);
      //массив из массивов, в которых хранятся все значения из таблицы
   }

   const onRespondentsLoaded = (res) => {
      setRespondents(res);
   }

   return (
      <>
         <div className='wrapper'>
            <HeaderSide user={user}/>
            <RespondDbSettings/>
            <RespondDb setAddModalActive={setModalAddActive} setEditModalActive={setModalEditActive} 
               respondents={respondents} setRespondents={setRespondents}
               setEditRespond={setEditRespond}
            />
         </div>
         <Modal modalClass={'modal_respond'} active={modalAddActive} setActive={setModalAddActive}>
            <ModalAddRespond setModalActive={setModalAddActive} 
               respondents={respondents} setRespondents={setRespondents} 
               regForEmail={regForEmail}
            />
         </Modal>
         <Modal modalClass={'modal_respond'} active={modalEditActive} setActive={setModalEditActive}>
            <ModalEditRespond setModalActive={setModalEditActive} 
               respondents={respondents} setRespondents={setRespondents}
               editRespond={editRespond} regForEmail={regForEmail}
            />
         </Modal>
      </>
   )
}
export default ModeratorPage;