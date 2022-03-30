import './projectsAside.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '../calendar/Calendar';
import Accordion from '../accordion/Accordion';

const ProjectsAside = ({setModalActive}) => {
   const [accordActive, setAccordActive] = useState('1 семестр 2019');

   return (
      <aside className="projects-aside">
         <Calendar classes="calendar_small projects-aside__calendar" small/>

         <Accordion accordClass="projects-aside__project" name="1 семестр 2019"
            items={['Редактировать', 'Копировать ссылку', 'Удалить', 'Режим совместной работы']}
            accordActive={accordActive} setAccordActive={setAccordActive}
            onClick={[null, null, null, null]}
            time startTime="12.12.19" finalTime="31.12.19"
         />

         <Accordion accordClass="projects-aside__project" name="Кампания Google март 2018"
            items={['Редактировать', 'Копировать ссылку', 'Удалить', 'Режим совместной работы']}
            accordActive={accordActive} setAccordActive={setAccordActive}
            onClick={[null, null, null, null]}
            time startTime="13.12.19" finalTime="30.12.19"
         />

         <Accordion accordClass="projects-aside__project" name="Расписание на зиму 2018"
            items={['Редактировать', 'Копировать ссылку', 'Удалить', 'Режим совместной работы']}
            accordActive={accordActive} setAccordActive={setAccordActive}
            onClick={[null, null, null, null]}
            time startTime="14.12.19" finalTime="31.12.19"
         />

         <button className="button-reset button projects-aside__btn" onClick={() => setModalActive(true)}>Создать новый проект</button>
      </aside>
   )
}
export default ProjectsAside;