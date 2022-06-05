import './calendar.scss';
import { useMemo, useEffect, useRef } from 'react';
import { CalendarArrow, CalendarArrowSmall } from '../../resources';

const Calendar = ({classes, small}) => {
   const monthTitle = useRef();
   const yearTitle = useRef();
   const monthDays = useRef();

   const date = useMemo(() => new Date(), []);

   useEffect(() => {
      renderCalendar();
   }, [])

   const renderCalendar = () => {
      let days = "";
      const monthsNames = [
         "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
         "Сетрябрь", "Октрябрь", "Ноябрь", "Декабрь"
      ];

      //назначаем в шапку календаря актуальный месяц и год
      monthTitle.current.innerHTML = monthsNames[date.getMonth()];
      yearTitle.current.innerHTML = date.getFullYear();

      date.setDate(1);

      let firstDayIndex = date.getDay() - 1;//день недели первого дня месяца, где 0 - воскресенье, поэтому вычитаем единицу, чтобы 0 был понедельником
      if (firstDayIndex === -1){
         firstDayIndex = 6;
      }//а воскресенье станет 6

      let lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() - 1;
      if (lastDayIndex === -1){
         lastDayIndex = 6;
      }

      const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      const lastDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();//последний аргумент 0 дает последнее число предыдущего месяца. поэтому прибавляем к текущему месяцу 1
      const nextDays = 7 - lastDayIndex - 1;

      //формируем последние числа предыдущего месяца
      for (let x = firstDayIndex; x > 0; x--){
         days += `<div class="calendar__date calendar__prev-date">${prevLastDay - x + 1}</div>`
      }

      //формируем числа месяца
      for (let i = 1; i <= lastDayOfCurrentMonth; i++){
         if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
            days += `<div class="calendar__date calendar__today"><span>${i}</span></div>`;
         } else {
            days += `<div class="calendar__date"><span>${i}</span></div>`;
         }
         monthDays.current.innerHTML = days;
      }

      //формируем первые числа следующего месяца
      for (let j = 1; j <= nextDays; j++){
         days += `<div class="calendar__date calendar__next-date">${j}</div>`
         monthDays.current.innerHTML = days;
      }
   }

   const onLeftArrow = () => {
      date.setMonth(date.getMonth() - 1);
      renderCalendar();
   }
   const onRightArrow = () => {
      date.setMonth(date.getMonth() + 1);
      renderCalendar();
   }
   
   return (
      <div className={`calendar ${small ? 'calendar_small' : ''} ${classes}`}>
         <div className="calendar__month">
            <button className="button-reset calendar__arrow" onClick={onLeftArrow} type="button">
               {small ? <CalendarArrowSmall/>: <CalendarArrow/>}
            </button>
            <p>
               <span className="calendar__month-name" ref={monthTitle}></span> <span className="calendar__year" ref={yearTitle}></span>
            </p>
            <button className="button-reset calendar__arrow" onClick={onRightArrow} type="button">
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
         <div className="calendar__days" ref={monthDays}></div>
      </div>
   )
}
export default Calendar;