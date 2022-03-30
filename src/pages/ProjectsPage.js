import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import useBookmeService from '../services/BookmeService';

import HeaderSide from '../components/headerSide/HeaderSide';
import ModerCalendar from '../components/moderCalendar/ModerCalendar';
import ProjectsAside from '../components/projectsAside/ProjectsAside';
import RespondRecordings from '../components/respondRecordings/RespondRecordings';

import Modal from '../components/modals/Modal';
import ModalNewProject from '../components/modals/ModalNewProject';


const ProjectsPage = () => {
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



   const [modalProjectActive, setModalProjectActive] = useState(false);

   return (
      <>
         <div className="wrapper">
            <HeaderSide user={user}/>
            <ProjectsAside setModalActive={setModalProjectActive}/>
            <ModerCalendar/>
            <RespondRecordings/>
         </div>
         <Modal modalClass={'modal-new-project'} active={modalProjectActive} setActive={setModalProjectActive}>
            <ModalNewProject setModalActive={setModalProjectActive}/>
         </Modal>
         {/* <Modal modalClass={'modal-add-file'} active={modalFileActive} setActive={setModalFileActive} outClick>
            <ModalAddFile modalActive={modalFileActive} setModalActive={setModalFileActive} user={user} setUser={setUser}/>
         </Modal> */}
      </>
   )
}
export default ProjectsPage;