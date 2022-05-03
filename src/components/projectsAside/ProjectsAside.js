import './projectsAside.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '../calendar/Calendar';
import Accordion from '../accordion/Accordion';

const ProjectsAside = ({setModalActive, accordActive, setAccordActive, projects, setProjects}) => {

   return (
      <aside className="projects-aside">
         <Calendar classes="projects-aside__calendar" small/>

         {projects.length > 0 ? (
            projects.map((project, id) => {
               const firstDate = project[8][0].date.split('-').reverse().join('.');
               const lastDate = project[8][project[8].length - 1].date.split('-').reverse().join('.');
               return <Accordion accordClass="projects-aside__project" name={project[1]} key={id}
                  items={['Редактировать', 'Копировать ссылку', 'Удалить', 'Режим совместной работы']}
                  accordActive={accordActive} setAccordActive={setAccordActive}
                  onClick={[null, null, null, null]}
                  time startTime={firstDate} finalTime={lastDate}
               />
            })
         ) : null}

         {/* <Accordion accordClass="projects-aside__project" name="1 семестр 2019"
            items={['Редактировать', 'Копировать ссылку', 'Удалить', 'Режим совместной работы']}
            accordActive={accordActive} setAccordActive={setAccordActive}
            onClick={[null, null, null, null]}
            time startTime="12.12.19" finalTime="31.12.19"
         /> */}

         <button className="button-reset button projects-aside__btn" onClick={() => setModalActive(true)}>Создать новый проект</button>
      </aside>
   )
}
export default ProjectsAside;