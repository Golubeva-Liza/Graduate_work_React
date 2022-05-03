import './calendar.scss';
import './calendarCreateProj.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import { CalendarArrow, CalendarArrowSmall } from '../../resources';

const CalendarCreateSchedule = ({classes, small, setModalTimeActive, setDate, selectedDays}) => {

   const monthsNames = useMemo(() => [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
      "Сетрябрь", "Октрябрь", "Ноябрь", "Декабрь"
   ], []);

   const [currentDate, setCurrentDate] = useState(new Date(new Date(selectedDays[0].date).setDate(1)));

   function renderCalendar() {
      console.log('render calendar');
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
         days.push(<div className="calendar__date calendar__prev-date" key={`${x}prev`}></div>);
      }

      const newDate = new Date(currentDate);//копируем дату

      //формируем числа месяца
      for (let i = 1; i <= lastDayOfCurrentMonth; i++){
         
         const currentDay = new Date(newDate.setDate(i)).toISOString().slice(0,10);
         
         if (i < new Date().getDate() && currentDate.getMonth() === new Date().getMonth()){
            days.push(<div className="calendar__date calendar__prev" key={i}>{i}</div>);
         }

         else if (selectedDays.find(item => item.date == currentDay)) {
            const date = selectedDays.find(item => item.date == currentDay);
            days.push(<div key={i} className="calendar__date calendar__selected">
               <span>{i}</span>
               {date.time.map((item, index) => index < 2 ? <div key={index}>{item}</div> : '')}
               {date.time.length > 2 ? <div style={{lineHeight: '2px'}}>...</div> : ''}
            </div>);
         }

         else {
            days.push(<div key={i} className="calendar__date calendar__unavailable">{i}</div>);
         }
      }

      //формируем первые числа следующего месяца
      // for (let j = 1; j <= nextDays; j++){
      //    days.push(<div className="calendar__date calendar__next-date" key={`${j}next`}>{j}</div>);
      // }

      return days;
   }

   const calendarDays = useMemo(() => renderCalendar(), [currentDate, selectedDays]);

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
         const day = el.childNodes[0].innerHTML < 10 ? `0${el.childNodes[0].innerHTML}` : el.childNodes[0].innerHTML;
         const time = el.childNodes[1].innerHTML;

         const month = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
         const date = `${currentDate.getFullYear()}-${month}-${day}`
         // console.log(date);
         setDate(date);
         setModalTimeActive(true);
      }
   }

   const getDaysArray = function(start, end) {
      for (var arr=[], date=new Date(start); date<=new Date(end); date.setDate(date.getDate()+1)){
         arr.push(new Date(date));
      }
      return arr;
   };
   
   return (
      <div className={`calendar calendar_create-schedule ${small ? 'calendar_small' : ''} ${classes}`}>
         <div className="calendar__month">
            <button className="button-reset calendar__arrow" type="button" onClick={onLeftArrow}>
               {small ? <CalendarArrowSmall/>: <CalendarArrow/>}
            </button>
            <p>
               <span className="calendar__month-name">
                  {monthsNames[currentDate.getMonth()]}</span> <span className="calendar__year">{currentDate.getFullYear()}
               </span>
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