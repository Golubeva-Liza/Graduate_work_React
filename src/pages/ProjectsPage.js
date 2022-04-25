import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import ModerCalendar from '../components/moderCalendar/ModerCalendar';
import ProjectsAside from '../components/projectsAside/ProjectsAside';
import RespondRecordings from '../components/respondRecordings/RespondRecordings';

import Modal from '../components/modals/Modal';
import ModalNewProject from '../components/modals/ModalNewProject';
import ModalSetTime from '../components/modals/ModalSetTime';


const ProjectsPage = () => {
   let navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem('authorized')){
         navigate('/');
      }
   }, []);


   const [modalProjectActive, setModalProjectActive] = useState(false);
   const [modalTimeActive, setModalTimeActive] = useState(false);

   const [date, setDate] = useState(false);
   const [time, setTime] = useState(false);

   return (
      <>
         <ProjectsAside setModalActive={setModalProjectActive}/>
         <ModerCalendar/>
         <RespondRecordings/>
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