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

   const [selectedDays, setSelectedDays] = useState();
   const [selectedDate, setSelectedDate] = useState(null);
   const [time, setTime] = useState(false);

   // [{date: date, intervals: ['15:00-19:00']}]

   return (
      <>
         <ProjectsAside setModalActive={setModalProjectActive}/>
         <ModerCalendar/>
         <RespondRecordings/>
         <Modal modalClass={'modal-new-project'} active={modalProjectActive} setActive={setModalProjectActive}>
            <ModalNewProject 
               setModalActive={setModalProjectActive} 
               setModalTimeActive={setModalTimeActive} 
               setSelectedDate={setSelectedDate} 
               setTime={setTime}
               setSelectedDays={setSelectedDays}
               selectedDays={selectedDays}
            />
         </Modal>
         <Modal modalClass={'modal-set-time'} active={modalTimeActive} setActive={setModalTimeActive}>
            <ModalSetTime 
               setModalActive={setModalTimeActive} 
               date={selectedDate} setDate={setSelectedDate} 
               time={time} setTime={setTime}
               selectedDays={selectedDays}
               setSelectedDays={setSelectedDays}
            />
         </Modal>
      </>
   )
}
export default ProjectsPage;