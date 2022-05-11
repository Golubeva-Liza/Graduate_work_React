import "./respondentCalendar.scss";
import { useState, useEffect, useMemo } from 'react';

import Calendar from "../calendar/Calendar";
import CalendarScheduleToRespondent from "../calendar/CalendarScheduleToRespondent";


const RespondendCalendar = ({projectDates, selectedDay, setSelectedDay}) => {

   return (
      <section className="respondent-calendar">
         <h2 className="respondent-calendar__title">Выберите дату</h2>

         <CalendarScheduleToRespondent 
            className="respondent-calendar__calendar" 
            projectDates={projectDates}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
         />
         
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