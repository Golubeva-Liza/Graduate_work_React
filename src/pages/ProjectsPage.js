import { useState, useEffect, useMemo } from 'react';

import ModerCalendar from '../components/moderCalendar/ModerCalendar';
import ProjectsAside from '../components/projectsAside/ProjectsAside';
import RespondRecordings from '../components/respondRecordings/RespondRecordings';

import Modal from '../components/modals/Modal';
import ModalNewProject from '../components/modals/ModalNewProject';
import ModalSetTime from '../components/modals/ModalSetTime';
import useBookmeService from '../services/BookmeService';



const ProjectsPage = () => {

   const [modalProjectActive, setModalProjectActive] = useState(false);
   const [modalTimeActive, setModalTimeActive] = useState(false);

   const [selectedDays, setSelectedDays] = useState(null);//список всех выбранных дат с интервалами времени
   const [selectedDate, setSelectedDate] = useState(null);//выбранная дата для редактирования времени в модальном окне

   const [isProjectEdit, setIsProjectEdit] = useState(false);
   const [projectActive, setProjectActive] = useState(null);
   const [projects, setProjects] = useState([]);
   const {universalRequest} = useBookmeService();

   const [activeDate, setActiveDate] = useState(null);
   const [entries, setEntries] = useState(null);

   
   useEffect(() => {
      const obj = {
         'user': localStorage.getItem('userKey'),
         'key': localStorage.getItem('authKey')
      };
      universalRequest('getProjects', JSON.stringify(obj)).then(onProjectsLoaded);
   }, [])


   const onProjectsLoaded = (res) => {
      //проекты
      setProjects(res);
      setProjectActive(res[0].projectName);//первый полученный проект открывается
      console.log(res);

      //записи
      let arr = [];
      res.forEach(proj => arr = [...arr, ...proj.entries]);
      setEntries(arr);
   }


   return (
      <>
         <ProjectsAside 
            setModalActive={setModalProjectActive}
            accordActive={projectActive} setAccordActive={setProjectActive}
            projects={projects} setProjects={setProjects}
            setIsProjectEdit={setIsProjectEdit}
         />
         <ModerCalendar
            projects={projects}
            projectActive={projectActive} 
            setActiveDate={setActiveDate}
         />
         <RespondRecordings
            activeDate={activeDate}
            entries={entries}
         />
         <Modal modalClass={'modal-new-project'} active={modalProjectActive} setActive={setModalProjectActive}>
            <ModalNewProject 
               projects={projects}
               projectActive={projectActive} 
               setProjects={setProjects}
               modalActive={modalProjectActive}
               setModalActive={setModalProjectActive} 
               setModalTimeActive={setModalTimeActive} 
               setSelectedDate={setSelectedDate}
               setSelectedDays={setSelectedDays}
               selectedDays={selectedDays}
               isProjectEdit={isProjectEdit} setIsProjectEdit={setIsProjectEdit}
            />
         </Modal>
         <Modal modalClass={'modal-set-time'} active={modalTimeActive} setActive={setModalTimeActive}>
            <ModalSetTime 
               setModalActive={setModalTimeActive} 
               date={selectedDate} setDate={setSelectedDate}
               selectedDays={selectedDays}
               setSelectedDays={setSelectedDays}
            />
         </Modal>
      </>
   )
}
export default ProjectsPage;