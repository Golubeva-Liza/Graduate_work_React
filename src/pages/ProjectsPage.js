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
   const [projectDeleteActive, setProjectDeleteActive] = useState(false);
   const [entryDeleteActive, setEntryDeleteActive] = useState(false);

   const [selectedDays, setSelectedDays] = useState(null);//список всех выбранных дат с интервалами времени
   const [selectedDate, setSelectedDate] = useState(null);//выбранная дата для редактирования времени в модальном окне

   const [isProjectEdit, setIsProjectEdit] = useState(false);
   const [projectActiveName, setProjectActiveName] = useState(null); //имя проекта для аккордиона
   const [projectActive, setProjectActive] = useState(null); //выбранный проект
   const [projects, setProjects] = useState([]);

   const [activeDate, setActiveDate] = useState(null);
   const [entries, setEntries] = useState(null);
   const [targetEntry, setTargetEntry] = useState(null); //запись, на которой выбирают настройку, влияет на отображение popup
   const [removedEntry, setRemovedEntry] = useState(null); //запись, на которой выбирают настройку
   const [changeViewEntries, setChangeViewEntries] = useState(false); //нужно для обновления выводимого списка записей, тк useEffect не видит разницы в изменениях внутри свойств объекта


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
         setTargetEntry(null);
         setRemovedEntry(null);
         //они влияют на отображаемые записи
      }
   }, [projectActiveName])



   const deleteProject = () => {
      const obj = {
         ...projectActive, 
         user: localStorage.getItem('userKey'),
         key: localStorage.getItem('authKey')
      };

      universalRequest('deleteProject', JSON.stringify(obj)).then((res) => onProjectDelete(res));
   }

   const onProjectDelete = (res) => {
      setProjectDeleteActive(false);

      const isError = isFetchError(res);
      if (!isError){
         const index = projects.findIndex(el => el.projId == projectActive.projId);
         const updatedProjects = [...projects.slice(0, index), ...projects.slice(index + 1)];
         setProjects(updatedProjects);
      }else{
         console.log(res);
      }
   }


   const onModalDeleteClose = () => {
      setRemovedEntry(null);
   }


   const deleteEntry = () => {
      const entryDate =  entries.find(el => el.date === removedEntry.date);
      const currentEntry = entryDate.entries.find(el => el.id === removedEntry.id);

      const obj = {
         ...currentEntry, 
         user: localStorage.getItem('userKey'),
         key: localStorage.getItem('authKey')
      };

      universalRequest('deleteEntry', JSON.stringify(obj)).then((res) => onEntryDelete(res, entryDate));
   }

   const onEntryDelete = (res, entryDate) => {
      setEntryDeleteActive(false);

      const isError = isFetchError(res);
      if (!isError){
         const updatedProj = {...projectActive};

         //найти номер записи с датой в массиве  entriesInfo
         const dateId = updatedProj.entriesInfo.findIndex(el => el.date == entryDate.date);
         //найти номер записи в массиве entries
         const entries = updatedProj.entriesInfo[dateId].entries;
         const entryId = entries.findIndex(el => el.id == removedEntry.id);

         //обновить список записей
         const newEntries = [...entries.slice(0, entryId), ...entries.slice(entryId + 1)];
         
         //если записей на этот день больше нет, то удаляем эту дату
         if (newEntries.length == 0){
            updatedProj.entriesInfo = [...updatedProj.entriesInfo.slice(0, dateId), ...updatedProj.entriesInfo.slice(dateId + 1)];
         } else {
            updatedProj.entriesInfo[dateId].entries = newEntries;
         }

         //находим индекс этого проекта и меняем его информацию
         const index = projects.findIndex(el => el.projId == updatedProj.projId);
         const updatedProjects = [...projects.slice(0, index), updatedProj, ...projects.slice(index + 1)];

         setRemovedEntry(null);//убрать удаляемую запись
         setProjects(updatedProjects);//обновить проекты
         setEntries(updatedProj.entriesInfo);//обновить список записей
         setChangeViewEntries(true);

      }else{
         setRemovedEntry(null);
         console.log(res);
      }
   }


   const getEntryInfo = () => {
      console.log(removedEntry);
      const entryDate =  entries.find(el => el.date === removedEntry.date);
      const currentEntry = entryDate.entries.find(el => el.id === removedEntry.id);
      const date =  entryDate.date.split('-').reverse().join('.');
      return `запись респондента ${currentEntry.name} на ${date} ${currentEntry.time}`;
   }


   return (
      <>
         <ProjectsAside 
            setModalActive={setModalProjectActive}
            accordActive={projectActiveName} setAccordActive={setProjectActiveName}
            projects={projects} setProjects={setProjects}
            setIsProjectEdit={setIsProjectEdit}
            setModalDeleteActive={setProjectDeleteActive}
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
            targetEntry={targetEntry} setTargetEntry={setTargetEntry}
            setEntryDeleteActive={setEntryDeleteActive}
            setRemovedEntry={setRemovedEntry}
            changeViewEntries={changeViewEntries} setChangeViewEntries={setChangeViewEntries}
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
         <Modal modalClass={'modal-delete'} active={projectDeleteActive} setActive={setProjectDeleteActive}>
            <ModalDelete 
               setModalActive={setProjectDeleteActive} 
               removal={'проекта'}
               whatDelete={projectActiveName}
               info={'со всеми записями и расписанием тестирования'}
               deleteSubmit={deleteProject}
            />
         </Modal>
         <Modal modalClass={'modal-delete'} active={entryDeleteActive} setActive={setEntryDeleteActive}>
            <ModalDelete 
               setModalActive={setEntryDeleteActive} 
               removal={'проекта'}
               whatDelete={removedEntry ? getEntryInfo() : null}
               deleteSubmit={deleteEntry}
               onClose={onModalDeleteClose}
            />
         </Modal>
      </>
   )
}
export default ProjectsPage;