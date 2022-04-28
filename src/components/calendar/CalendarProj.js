import './calendar.scss';
import { useState, useMemo, useEffect, useRef } from 'react';
import { CalendarArrow, CalendarArrowSmall } from '../../resources';

const CalendarProj = ({classes, small, firstDate, setFirstDate, lastDate, setLastDate, activeDate, setActiveDate, setCalendarActive}) => {

   const [currentDate, setCurrentDate] = useState(new Date(new Date().setDate(1)));
   const currentDays = useRef([]);

   const monthsNames = useMemo(() => [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
      "Сетрябрь", "Октрябрь", "Ноябрь", "Декабрь"
   ], []);

   function renderCalendar() {
      // console.log('календарь обновился');

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

      //формируем числа месяца
      for (let i = 1; i <= lastDayOfCurrentMonth; i++){
         if (i < new Date().getDate() && currentDate.getMonth() === new Date().getMonth()){
            days.push(<div className="calendar__date calendar__prev" key={i} ref={el => currentDays.current[i-1] = el}>{i}</div>);
         }
         else {
            days.push(<div className="calendar__date" key={i} ref={el => currentDays.current[i-1] = el}>{i}</div>);
         }
      }

      //формируем первые числа следующего месяца
      for (let j = 1; j <= nextDays; j++){
         days.push(<div className="calendar__date calendar__next-date" key={`${j}next`}>{j}</div>);
      }

      return days;
   }

   const calendarDays = useMemo(() => renderCalendar(), [currentDate]);

   
   useEffect(() => {
      if (firstDate){
         const num = currentDays.current.find(item => item && item.classList.contains('prev-active'));
         if (num) {
            num.classList.remove('prev-active');
         }

         //нахожу день, который соответствует начальной выбранной дате того же месяца
         const day = currentDays.current.find(item => item && item.innerHTML == +firstDate.substr(0, 2) && currentDate.getMonth() + 1 === +firstDate.substr(3, 2));
         if (day){
            day.classList.add('prev-active');
         }
      }
      if (lastDate){
         const num = currentDays.current.find(item => item && item.classList.contains('last-active'));
         if (num) {
            num.classList.remove('last-active');
         }

         //нахожу день, который соответствует начальной выбранной дате того же месяца
         const day = currentDays.current.find(item => item && item.innerHTML == +lastDate.substr(0, 2) && currentDate.getMonth() + 1 === +lastDate.substr(3, 2));
         if (day){
            day.classList.add('last-active');
         }
      }
      // console.log(activeDate, firstDate, lastDate);

      if (activeDate == 'next'){
         currentDays.current.forEach(el => {
            if (el && lastDate && ((el.innerHTML < +firstDate.substr(0, 2) && currentDate.getMonth() + 1 === +firstDate.substr(3, 2)) || currentDate.getMonth() + 1 > +lastDate.substr(3, 2))) {
               el.classList.add('calendar__unavailable');
            } else if (el) {
               el.classList.remove('calendar__unavailable');
            }
         })
      } else if (activeDate == 'prev'){
         currentDays.current.forEach(el => {
            if (el && firstDate && ((el.innerHTML > +lastDate.substr(0, 2) && currentDate.getMonth() + 1 === +lastDate.substr(3, 2)) || currentDate.getMonth() + 1 > +lastDate.substr(3, 2))){
               el.classList.add('calendar__unavailable');
            }else if (el) {
               el.classList.remove('calendar__unavailable');
            }
         })
      }
   }, [activeDate, firstDate, lastDate, currentDate])


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

   const changeDate = (e) => {
      if(!e.target.classList.contains('calendar__prev') && !e.target.classList.contains('calendar__prev-date') && !e.target.classList.contains('calendar__next-date') && !e.target.classList.contains('calendar__unavailable')){
         const day = e.target.innerHTML < 10 ? `0${e.target.innerHTML}` : e.target.innerHTML;
         const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
         const year = currentDate.getFullYear();

         if (activeDate == 'prev'){
            setFirstDate(`${day}.${month}.${year}`);
         }else if (activeDate == 'next'){
            setLastDate(`${day}.${month}.${year}`);
         }
         
         setCalendarActive(false);
         setActiveDate(null);
      }
   }
   
   return (
      <div className={`calendar ${small ? 'calendar_small' : ''} ${classes}`}>
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
         <div className="calendar__days" onClick={changeDate}>
            {calendarDays}
         </div>
      </div>
   )
}
export default CalendarProj;