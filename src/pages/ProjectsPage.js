import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import useBookmeService from '../services/BookmeService';

import HeaderSide from '../components/headerSide/HeaderSide';
import ModerCalendar from '../components/moderCalendar/ModerCalendar';
import ProjectsAside from '../components/projectsAside/ProjectsAside';
import RespondRecordings from '../components/respondRecordings/RespondRecordings';

import Modal from '../components/modals/Modal';
import ModalNewProject from '../components/modals/ModalNewProject';
import ModalSetTime from '../components/modals/ModalSetTime';


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
   const [modalTimeActive, setModalTimeActive] = useState(false);

   const [date, setDate] = useState(false);
   const [time, setTime] = useState(false);

   return (
      <>
         <div className="wrapper">
            <HeaderSide user={user}/>
            <ProjectsAside setModalActive={setModalProjectActive}/>
            <ModerCalendar/>
            <RespondRecordings/>
         </div>
         <Modal modalClass={'modal-new-project'} active={modalProjectActive} setActive={setModalProjectActive}>
            <ModalNewProject setModalActive={setModalProjectActive} setModalTimeActive={setModalTimeActive} setDate={setDate} setTime={setTime}/>
         </Modal>
         <Modal modalClass={'modal-set-time'} active={modalTimeActive} setActive={setModalTimeActive} outClick>
            <ModalSetTime setModalActive={setModalTimeActive} date={date} setDate={setDate} time={time} setTime={setTime}/>
         </Modal>
      </>
   )
}
export default ProjectsPage;