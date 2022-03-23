import { useState, useEffect, useMemo } from 'react';

import HeaderSide from '../components/headerSide/HeaderSide';
import RespondDbSettings from '../components/respondDbSettings/RespondDbSettings';
import RespondDb from '../components/respondDb/RespondDb';
import Modal from '../components/modals/Modal';
import ModalAddRespond from '../components/modals/ModalAddRespond';
import ModalEditRespond from '../components/modals/ModalEditRespond';
import useBookmeService from '../services/BookmeService';


const ModeratorPage = () => {
   const [modalAddActive, setModalAddActive] = useState(false);
   const [modalEditActive, setModalEditActive] = useState(false);
   const [respondents, setRespondents] = useState([]);
   const [editRespond, setEditRespond] = useState(null);

   const regForEmail = useMemo(() => {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   }, []);

   const {getAllRespondents} = useBookmeService();

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
            <HeaderSide/>
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