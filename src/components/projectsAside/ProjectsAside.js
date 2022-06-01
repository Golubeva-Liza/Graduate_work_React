import './projectsAside.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '../calendar/Calendar';
import Accordion from '../accordion/Accordion';

const ProjectsAside = ({setModalActive, accordActive, setAccordActive, projects, setProjects, setIsProjectEdit}) => {

   const editProj = () => {
      setIsProjectEdit(true);
      setModalActive(true);
   }

   const addProj = () => {
      setIsProjectEdit(false);
      setModalActive(true);
   }

   return (
      <aside className="projects-aside">
         <div>
            <Calendar classes="projects-aside__calendar" small/>

            {projects.length > 0 ? (
               projects.map((project, id) => {
                  const firstDate = project.dates[0].date.split('-').reverse().join('.');
                  const lastDate = project.dates[project.dates.length - 1].date.split('-').reverse().join('.');

                  return <Accordion accordClass="projects-aside__project" name={project.projectName} key={id}
                     items={['Редактировать', 'Копировать ссылку', 'Удалить', 'Режим совместной работы']}
                     accordActive={accordActive} setAccordActive={setAccordActive}
                     onClick={[editProj, null, null, null]}
                     time startTime={firstDate} finalTime={lastDate}
                  />
               })
            ) : null}
         </div>
         
         <div style={{'marginTop': '32px'}}>
            <button className="button-reset button projects-aside__btn" onClick={addProj}>Создать новый проект</button>
         </div>
      </aside>
   )
}
export default ProjectsAside;