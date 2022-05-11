import { useState, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";

import useBookmeService from '../services/BookmeService';
import changeDatesOfProj from '../hooks/changeDatesOfProj';

import HeaderTop from '../components/headerTop/HeaderTop';
import AboutProjectsAside from '../components/aboutProjectsAside/AboutProjectsAside';
import RespondendCalendar from '../components/respondentCalendar/RespondentCalendar';
import RespondendSettings from '../components/respondendSettings/RespondendSettings';
import Modal from '../components/modals/Modal';


const RespondPage = () => {
   const {projectId} = useParams();
   const [project, setProject] = useState(null);
   const [selectedDay, setSelectedDay] = useState(null);

   const {universalRequest} = useBookmeService();

   useEffect(() => {
      updateProject();
   }, [projectId])

   const updateProject = () => {
      universalRequest('getOneProject', projectId).then(onProjectLoaded);
   }

   const onProjectLoaded = (res) => {
      const project = changeDatesOfProj(res);
      setProject(project);
      console.log(project);
   }

   return (
      <> 
         {/* <HeaderTop/> */}

         <main className="respondent-main">
            {project ? (
               <div className="my-container">
                  <AboutProjectsAside project={project}/>
                  <RespondendCalendar 
                     projectDates={project.dates}
                     selectedDay={selectedDay}
                     setSelectedDay={setSelectedDay}
                  />
                  <RespondendSettings 
                     time={selectedDay ? project.dates.find(el => el.date == selectedDay).intervals : null} 
                     selectedDay={selectedDay}
                  />
               </div>
            ) : null}
         </main>
         {/* <Modal modalClass={'modal-new-project'} active={modalProjectActive} setActive={setModalProjectActive}>
            <ModalNewProject setModalActive={setModalProjectActive}/>
         </Modal> */}
      </>
   )
}
export default RespondPage;