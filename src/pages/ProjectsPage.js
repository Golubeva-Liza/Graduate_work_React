import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import ModerCalendar from '../components/moderCalendar/ModerCalendar';
import ProjectsAside from '../components/projectsAside/ProjectsAside';
import RespondRecordings from '../components/respondRecordings/RespondRecordings';

import Modal from '../components/modals/Modal';
import ModalNewProject from '../components/modals/ModalNewProject';
import ModalSetTime from '../components/modals/ModalSetTime';
import useBookmeService from '../services/BookmeService';


const ProjectsPage = () => {
   let navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem('authorized')){
         navigate('/');
      }
   }, []);


   const [modalProjectActive, setModalProjectActive] = useState(false);
   const [modalTimeActive, setModalTimeActive] = useState(false);

   const [selectedDays, setSelectedDays] = useState(null);//список всех выбранных дат с интервалами времени
   const [selectedDate, setSelectedDate] = useState(null);//выбранная дата для редактирования времени в модальном окне

   const [isProjectEdit, setIsProjectEdit] = useState(false);
   const [projectActive, setProjectActive] = useState(null);
   const [projects, setProjects] = useState([]);
   const {universalRequest} = useBookmeService();

   
   useEffect(() => {
      universalRequest('getProjects').then(onProjectsLoaded);
   }, [])

   const onProjectsLoaded = (res) => {
      //преобразование интервалов времени и дат к виду: {date: date, intervals: [time1, time2]} 
      // --> {date: 12.05.2022, intervals: ['12:00-13:00', '14:00-15:00']}
      const projects = res.map(proj => {
         let arr = [];
         proj.dates.forEach(interval => {
            let find = arr.find(el => el.date == interval[1]);
            if (find){
               find.intervals.push(interval[0])
            } else {
               arr.push({date: interval[1], intervals: [interval[0]]})
            }
         })
         proj.dates = arr;
         return proj;
      });
      console.log(projects);
      setProjects(projects);
      setProjectActive(projects[0].projectName);//первый полученный проект открывается
   }


   // const [currentDate, setCurrentDate] = useState(null);

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
         />
         <RespondRecordings
            
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