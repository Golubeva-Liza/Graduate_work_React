import './calendar.scss';
import './calendarCreateProj.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import { CalendarArrow, CalendarArrowSmall } from '../../resources';

const CalendarCreateSchedule = ({classes, small, firstDate, lastDate, setModalTimeActive, setDate, setTime}) => {

   const [currentDate, setCurrentDate] = useState(new Date(new Date().setDate(1)));
   const currentDays = useRef([]);

   const monthsNames = useMemo(() => [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
      "Сетрябрь", "Октрябрь", "Ноябрь", "Декабрь"
   ], []);

   function renderCalendar() {
      console.log('календарь обновился');
      const firstDateSec = new Date(firstDate.split('.').reverse().join('-')).setHours(0, 0, 0, 0);
      const secondDateSec = new Date(lastDate.split('.').reverse().join('-')).setHours(0, 0, 0, 0);

      let days = [];

      let firstDayIndex = currentDate.getDay() - 1;//день недели первого дня месяца, где 0 - воскресенье, поэтому вычитаем единицу, чтобы 0 был понедельником
      if (firstDayIndex === -1){
         firstDayIndex = 6;
      }//а воскресенье станет 6

      let lastDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay() - 1;
      if (lastDayIndex === -1){
         lastDayIndex = 6;
      }

      const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();//последний аргумент 0 дает последнее число предыдущего месяца. поэтому прибавляем к текущему месяцу 1
      const nextDays = 7 - lastDayIndex - 1;

      //формируем последние числа предыдущего месяца
      for (let x = firstDayIndex; x > 0; x--){
         days.push(<div className="calendar__date calendar__prev-date" key={`${x}prev`}>{prevLastDay - x + 1}</div>);
      }

      const newDate = new Date(currentDate);//копируем дату

      //формируем числа месяца
      for (let i = 1; i <= lastDayOfCurrentMonth; i++){
         
         if (i < new Date().getDate() && currentDate.getMonth() === new Date().getMonth()){
            days.push(<div className="calendar__date calendar__prev" key={i}>{i}</div>);
         }
         else if (new Date(newDate.setDate(i)).setHours(0, 0, 0, 0) >= firstDateSec && new Date(newDate.setDate(i)).setHours(0, 0, 0, 0) <= secondDateSec) {
            days.push(<div key={i} className="calendar__date calendar__selected">
               <span>{i}</span>
               <div>15:00-19:00</div>
            </div>);
         }
         else {
            days.push(<div key={i} className="calendar__date">{i}</div>);
         }
      }
      // console.log(new Date(newDate.setDate(13)).setHours(0, 0, 0, 0), firstDateSec);

      //формируем первые числа следующего месяца
      for (let j = 1; j <= nextDays; j++){
         days.push(<div className="calendar__date calendar__next-date" key={`${j}next`}>{j}</div>);
      }

      return days;
   }

   const calendarDays = useMemo(() => renderCalendar(), [currentDate]);

   const onLeftArrow = () => {
      if (currentDate.getMonth() != new Date().getMonth()){
         setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
      }
   }
   const onRightArrow = () => {
      if (currentDate.getMonth() < new Date().getMonth() + 3){
         setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
      }
   }

   const onClickDay = (e) => {
      if(e.target.closest('.calendar__selected')){
         const el = e.target.closest('.calendar__selected');
         const date = el.childNodes[0].innerHTML;
         const time = el.childNodes[1].innerHTML;
         // console.log(date, time);
         setDate(date);
         setTime(time);
         setModalTimeActive(true);
      }
   }
   
   return (
      <div className={`calendar calendar_create-schedule ${small ? 'calendar_small' : ''} ${classes}`}>
         <div className="calendar__month">
            <button className="button-reset calendar__arrow" type="button" onClick={onLeftArrow}>
               {small ? <CalendarArrowSmall/>: <CalendarArrow/>}
            </button>
            <p>
               <span className="calendar__month-name">{monthsNames[currentDate.getMonth()]}</span> <span className="calendar__year">{currentDate.getFullYear()}</span>
            </p>
            <button className="button-reset calendar__arrow" type="button" onClick={onRightArrow}>
               {small ? <CalendarArrowSmall/>: <CalendarArrow/>}
            </button>
         </div>
         <div className="calendar__weekdays">
            <div>Пн</div>
            <div>Вт</div>
            <div>Ср</div>
            <div>Чт</div>
            <div>Пт</div>
            <div>Сб</div>
            <div>Вс</div>
         </div>
         <div className="calendar__days" onClick={onClickDay}>
            {calendarDays}
         </div>
      </div>
   )
}
export default CalendarCreateSchedule;