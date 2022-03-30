import './moderCalendar.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import Calendar from '../calendar/Calendar';

const ModerCalendar = () => {

   return (
      <section className="moder-calendar">
         <Calendar classes="moder-calendar__calendar"/>
         
         <div className="moder-calendar__hint"></div>
         <div className="moder-calendar__hint"></div>

         <button className="button-reset button moder-calendar__btn">Посмотреть все записи</button>
      </section>
   )
}
export default ModerCalendar;
