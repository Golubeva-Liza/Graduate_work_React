import './calendar.scss';
import './calendarCreateProj.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import { CalendarArrow, CalendarArrowSmall } from '../../resources';
import { getDate } from '../../hooks/getDate';
import useCalendarValues from '../../hooks/useCalendarValues';


const CalendarShowSchedule = ({className, small, projects, projectActive, activeDate, setActiveDate}) => {

   const {monthsNames} = useCalendarValues(); 

   const [currentDate, setCurrentDate] = useState(new Date(new Date().setDate(1)));
   const calendarDaysRef = useRef([]);

   //меняем первую дату календаря в зависимости от месяца первой даты расписания проекта (для удобного отображения)
   useEffect(() => {
      if (projectActive){
         const firstDate = projectActive.dates[0].date;
         const firstDay = new Date(new Date(firstDate).setDate(1));
         setCurrentDate(firstDay);
      }
   }, [projectActive])


   //показываем выбранную дату
   useEffect(() => {
      if (activeDate){
         const day = +activeDate.split('-').reverse()[0];
         calendarDaysRef.current.forEach(el => el ? el.classList.remove('active') : null);
         const date = calendarDaysRef.current.find(el => el ? el.textContent == day : null);
         if (date){
            date.classList.add('active');
         }
      //если выбранная дата отсутствует, убираем класс активности
      } else{
         calendarDaysRef.current.forEach(el => el ? el.classList.remove('active') : null);
      }
      
   }, [activeDate, currentDate])


   function renderCalendarFunc() {
      
      const currentProjectDates = projects.length > 0 ? projectActive.dates : null;

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
         
         const currentDay = new Date(newDate.setDate(i)).toISOString().slice(0,10);
         const thisDate = currentProjectDates ? currentProjectDates.find(item => item.date == currentDay) : null;

         if (thisDate && new Date(currentDay) < new Date(new Date().setHours(3, 0, 0, 0))) {
            days.push(
               <div key={i} className="calendar__date calendar__selected-prev" ref={el => calendarDaysRef.current.push(el)}>
                  <span>{i}</span>
               </div>
            );
         } else if (thisDate && new Date(currentDay) >= new Date(new Date().setHours(3, 0, 0, 0))) {
            days.push(
               <div key={i} className="calendar__date calendar__selected" ref={el => calendarDaysRef.current.push(el)}>
                  <span>{i}</span>
               </div>
            );
         } else {
            days.push(<div className="calendar__date" key={i}><span>{i}</span></div>);
         }

      }

      // формируем первые числа следующего месяца
      for (let j = 1; j <= nextDays; j++){
         days.push(<div className="calendar__date calendar__next-date" key={`${j}next`}>{j}</div>);
      }

      return days;
   }

   const calendarDays = useMemo(() => projectActive ? renderCalendarFunc() : null, [currentDate, projectActive]);


   const onLeftArrow = () => {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
   }
   const onRightArrow = () => {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
   }

   const onClickDay = (e) => {
      if(e.target.closest('.calendar__selected') || e.target.closest('.calendar__selected-prev')){
         const date = getDate(e.target.textContent, currentDate.getMonth(), currentDate.getFullYear());
         // console.log(date);
         setActiveDate(date);
      }
   }
   
   return (
      <div className={`calendar calendar_create-schedule ${small ? 'calendar_small' : ''} ${className}`}>
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
export default CalendarShowSchedule;