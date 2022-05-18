import { useState, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";

import useBookmeService from '../services/BookmeService';
import changeDatesToEntries from '../hooks/changeDatesToEntries';
import changeDatesOfProj from '../hooks/changeDatesOfProj';

import HeaderTop from '../components/headerTop/HeaderTop';
import AboutProjectsAside from '../components/aboutProjectsAside/AboutProjectsAside';
import RespondendCalendar from '../components/respondentCalendar/RespondentCalendar';
import RespondendSettings from '../components/respondendSettings/RespondendSettings';
import Modal from '../components/modals/Modal';
import EntryReady from '../components/entryReady/EntryReady';


const RespondPage = () => {
   const {projectId} = useParams();
   const [project, setProject] = useState(null);
   const [selectedDay, setSelectedDay] = useState(null);
   const [entryReady, setEntryReady] = useState(false);

   const {universalRequest} = useBookmeService();

   useEffect(() => {
      getProject();
   }, [projectId])

   const getProject = () => {
      universalRequest('getOneProject', projectId).then(onProjectLoaded);
   }

   const onProjectLoaded = (res) => {
      const project = changeDatesToEntries(res);
      
      setProject(project);
   }

   return (
      <> 
         <HeaderTop/>

         <main className="respondent-main">
            {project ? (
               entryReady ? (
                  <EntryReady/>
               ) : (
                  <div className="my-container">
                     <AboutProjectsAside project={project}/>
                     <RespondendCalendar 
                        projectDates={project.dates}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                     />
                     <RespondendSettings 
                        projectId={projectId}
                        formLink={project ? project.linkToForm : null}
                        time={selectedDay ? project.dates.find(el => el.date == selectedDay).intervals : null} 
                        selectedDay={selectedDay}
                        setEntryReady={setEntryReady}
                     /> 
                  </div>
               )
            ) : null}
         </main>
      </>
   )
}
export default RespondPage;