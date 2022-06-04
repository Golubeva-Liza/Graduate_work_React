import './projectsAside.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '../calendar/Calendar';
import Accordion from '../accordion/Accordion';
import useAddressValues from '../../hooks/useAddressValues';

const ProjectsAside = ({setModalActive, accordActive, setAccordActive, projects, setIsProjectEdit, setModalDeleteActive, projectActive}) => {

   const [copyRespLink, setCopyRespLink] = useState(false);
   const [copyScheduleLink, setCopyScheduleLink] = useState(false);
   
   const {hostUrl} = useAddressValues();

   //копирование ссылки для респондентов
   useEffect(() => {
      if (copyRespLink){
         // console.log(`${hostUrl}${projectActive.linkForRespond}`);
         navigator.clipboard.writeText(`${hostUrl}${projectActive.linkForRespond}`);
         setCopyRespLink(false);
      }
   }, [copyRespLink])

   //копирование ссылки для заказчиков
   useEffect(() => {
      if (copyScheduleLink){
         navigator.clipboard.writeText(`${hostUrl}${projectActive.linkForCustomer}`);
         setCopyScheduleLink(false);
      }
   }, [copyScheduleLink])

   
   const editProj = () => {
      setIsProjectEdit(true);
      setModalActive(true);
   }

   const deleteProj = () => {
      setModalDeleteActive(true);
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
                     items={['Редактировать', 'Удалить', 'Ссылка для респондентов', 'Ссылка для заказчика']}
                     accordActive={accordActive} setAccordActive={setAccordActive}
                     onClick={[editProj, deleteProj, ()=>copyRespLink(true), ()=>setCopyScheduleLink(true)]}
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