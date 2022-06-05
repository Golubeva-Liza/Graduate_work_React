import './calendar.scss';
import './calendarCreateProj.scss';
import { useState, useMemo } from 'react';
import { CalendarArrow, CalendarArrowSmall } from '../../resources';
import {getDate, transformDate} from '../../hooks/getDate';
import getDatesList from '../../hooks/getDatesList';


const CalendarCreateSchedule = ({classes, calendarValues, small, setModalTimeActive, setDate, selectedDays}) => {

   const monthsNames = useMemo(() => [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
      "Сетрябрь", "Октрябрь", "Ноябрь", "Декабрь"
   ], []);

   const [currentDate, setCurrentDate] = useState(new Date(new Date(selectedDays[0].date).setDate(1)));

   function renderCalendar() {
      // console.log(selectedDays);
      let days = [];

      let firstDayIndex = currentDate.getDay() - 1;//день недели первого дня месяца, где 0 - воскресенье, поэтому вычитаем единицу, чтобы 0 был понедельником
      if (firstDayIndex === -1){
         firstDayIndex = 6;
      }//а воскресенье станет 6


      const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      //последний аргумент 0 дает последнее число предыдущего месяца. поэтому прибавляем к текущему месяцу 1


      //формируем последние числа предыдущего месяца, пустые (отступы)
      for (let x = firstDayIndex; x > 0; x--){
         days.push(<div className="calendar__date calendar__prev-date" key={`${x}prev`}></div>);
      }

      const newDate = new Date(currentDate);//копируем дату
      //первая и послелняя дата выбранного промежутка
      const first = transformDate(calendarValues[0]).split('.').reverse().join('-');
      const last = transformDate(calendarValues[1]).split('.').reverse().join('-');

      //промежуток дат
      const datesList = getDatesList(first, last);

      //формируем числа месяца
      for (let i = 1; i <= lastDayOfCurrentMonth; i++){
         
         const currentDay = new Date(newDate.setDate(i)).toISOString().slice(0,10); //формата '2022-06-30'

         //блокируем для выбора даты, которые уже прошли (раньше текущего дня)
         if (i < new Date().getDate() && currentDate.getMonth() === new Date().getMonth()){
            days.push(<div className="calendar__date calendar__prev" key={i}>{i}</div>);
         }

         //если число входит в интервал выбранных дат
         else if (datesList.find(item => item == currentDay)) {
            const date = selectedDays.find(item => item.date == currentDay);//находим этот день в списке имеющихся интервалов

            days.push(<div key={i} className="calendar__date calendar__selected">
               <span>{i}</span>
               {date ? date.intervals.map((item, index) => index < 2 ? <div key={index}>{item}</div> : '') : null}
               {date ? date.intervals.length > 2 ? <div style={{lineHeight: '2px'}}>...</div> : '' : null}
            </div>);
         }

         else {
            days.push(<div key={i} className="calendar__date calendar__unavailable">{i}</div>);
         }
      }

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

         const date = getDate(el.childNodes[0].innerHTML, currentDate.getMonth(), currentDate.getFullYear());

         setDate(date);
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