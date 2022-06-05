import './moderCalendar.scss';
import Button from '../button/Button';
import CalendarShowSchedule from '../calendar/CalendarShowSchedule';

const ModerCalendar = ({projects, projectActive, activeDate, setActiveDate}) => {

   return (
      <section className="moder-calendar">

         <div>
            <CalendarShowSchedule 
               className="" 
               projects={projects}
               projectActive={projectActive} 
               activeDate={activeDate}
               setActiveDate={setActiveDate}
            />
            <div className="moder-calendar__hint"></div>
            <div className="moder-calendar__hint"></div>
         </div>

         <div style={{'marginTop': '32px', 'display': 'flex', 'justifyContent': 'flex-end'}}>
            <Button buttonClass="moder-calendar__btn" onClick={() => setActiveDate(null)}>Посмотреть все записи</Button>
         </div>
      </section>
   )
}
export default ModerCalendar;
