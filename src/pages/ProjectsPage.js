import { useState, useEffect, useMemo } from 'react';

import ModerCalendar from '../components/moderCalendar/ModerCalendar';
import ProjectsAside from '../components/projectsAside/ProjectsAside';
import RespondRecordings from '../components/respondRecordings/RespondRecordings';

import Modal from '../components/modals/Modal';
import ModalNewProject from '../components/modals/ModalNewProject';
import ModalSetTime from '../components/modals/ModalSetTime';
import ModalDelete from '../components/modals/ModalDelete';
import useBookmeService from '../services/BookmeService';
import useFetchError from '../hooks/useFetchError';



const ProjectsPage = () => {
   const {universalRequest} = useBookmeService();
   const {isFetchError} = useFetchError();

   const [modalProjectActive, setModalProjectActive] = useState(false);
   const [modalTimeActive, setModalTimeActive] = useState(false);
   const [modalDeleteActive, setModalDeleteActive] = useState(false);

   const [selectedDays, setSelectedDays] = useState(null);//список всех выбранных дат с интервалами времени
   const [selectedDate, setSelectedDate] = useState(null);//выбранная дата для редактирования времени в модальном окне

   const [isProjectEdit, setIsProjectEdit] = useState(false);
   const [projectActiveName, setProjectActiveName] = useState(null); //имя проекта для аккордиона
   const [projectActive, setProjectActive] = useState(null); //выбранный проект
   const [projects, setProjects] = useState([]);

   const [activeDate, setActiveDate] = useState(null);
   const [entries, setEntries] = useState(null);


   //запрос на получение информации проектов
   useEffect(() => {
      const obj = {
         'user': localStorage.getItem('userKey'),
         'key': localStorage.getItem('authKey')
      };
      universalRequest('getProjects', JSON.stringify(obj)).then(onProjectsLoaded);
   }, [])

   const onProjectsLoaded = (res) => {
      const isError = isFetchError(res);
      if (!isError){
         setProjects(res);
      } 
      console.log(res);
   }

   //если открытого проекта больше нет, то открывается первый проект в обновленном списке
   useEffect(() => {
      if (projects.length){
         const activeProject = projects.find(el => el.projId == projectActive ? projectActive.projId : null);
         if (!activeProject){
            setProjectActiveName(projects[0].projectName);
         } else {
            //название может поменяться, поэтому обновляем активный проект
            setProjectActiveName(activeProject.projectName);
         }
      }
   }, [projects])


   //когда меняется открытый проект, переписывается список записей
   useEffect(() => {
      if (projectActiveName){
         const find = projects.find(el => el.projectName == projectActiveName); //открытый проект
         // console.log(find);
         setProjectActive(find);
         setEntries(find.entriesInfo);
         setActiveDate(null);
         //они влияют на отображаемые записи
      }
   }, [projectActiveName])


   return (
      <>
         <ProjectsAside 
            setModalActive={setModalProjectActive}
            accordActive={projectActiveName} setAccordActive={setProjectActiveName}
            projects={projects} setProjects={setProjects}
            setIsProjectEdit={setIsProjectEdit}
         />
         <ModerCalendar
            projects={projects}
            projectActive={projectActive} 
            activeDate={activeDate}
            setActiveDate={setActiveDate}
         />
         <RespondRecordings
            activeDate={activeDate}
            entries={entries}
            setEntries={setEntries}
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
         <Modal modalClass={'modal-delete'} active={modalDeleteActive} setActive={setModalDeleteActive}>
            <ModalDelete 
               setModalActive={setModalDeleteActive} 
               removal={'проекта'}
               whatDelete={projectActiveName}
               info={'со всеми записями и расписанием тестирования'}
            />
         </Modal>
      </>
   )
}
export default ProjectsPage;