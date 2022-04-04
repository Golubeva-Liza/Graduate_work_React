import "./respondentCalendar.scss";
import { useState, useEffect, useMemo } from 'react';

import Calendar from "../calendar/Calendar";


const RespondendCalendar = () => {

   return (
      <section className="respondent-calendar">
         <h2 className="respondent-calendar__title">Выберите дату</h2>

         <Calendar classes="respondent-calendar__calendar"/>
         
         <div className="respondent-calendar__hints">
            <div className="respondent-calendar__hint">
               <span>запись недоступна</span>
            </div>
            <div className="respondent-calendar__hint">
               <span>запись доступна</span>
            </div>
            <div className="respondent-calendar__hint">
               <span>на этот день уже есть записи</span>
            </div>
         </div>
      </section>
   )
}
export default RespondendCalendar;