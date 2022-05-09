import './moderCalendar.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '../calendar/Calendar';
import CalendarShowSchedule from '../calendar/CalendarShowSchedule';

const ModerCalendar = ({projects, projectActive}) => {

   return (
      <section className="moder-calendar">
         <CalendarShowSchedule 
            className="" 
            projects={projects}
            projectActive={projectActive} 
         />
         
         <div className="moder-calendar__hint"></div>
         <div className="moder-calendar__hint"></div>

         <button className="button-reset button moder-calendar__btn">Посмотреть все записи</button>
      </section>
   )
}
export default ModerCalendar;
