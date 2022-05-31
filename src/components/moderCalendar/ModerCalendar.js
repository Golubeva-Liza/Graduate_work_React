import './moderCalendar.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '../calendar/Calendar';
import Button from '../button/Button';
import CalendarShowSchedule from '../calendar/CalendarShowSchedule';

const ModerCalendar = ({projects, projectActive, setActiveDate}) => {

   return (
      <section className="moder-calendar">
         <CalendarShowSchedule 
            className="" 
            projects={projects}
            projectActive={projectActive} 
            setActiveDate={setActiveDate}
         />
         
         <div className="moder-calendar__hint"></div>
         <div className="moder-calendar__hint"></div>

         <Button buttonClass="moder-calendar__btn" onClick={() => setActiveDate(null)}>Посмотреть все записи</Button>
      </section>
   )
}
export default ModerCalendar;
