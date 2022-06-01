import './respondRecordings.scss';
import { useState, useEffect, useMemo } from 'react';
import Record from './Record';
import useCalendarValues from '../../hooks/useCalendarValues';

const RespondRecordings = ({activeDate, entries}) => {

   const {monthsForDays} = useCalendarValues(); 

   const [activeEntries, setActiveEntries] = useState(null);
   const [entriesCount, setEntriesCount] = useState(0);


   //отображаемые записи зависят от всего списка записей и выбранной даты
   useEffect(() => {
      if (entries && activeDate){
         const arr = [...entries];
         const newArr = arr.filter(
            (item) => item.date === activeDate
         );
         setActiveEntries(newArr);

      } else if (entries && !activeDate) {
         setActiveEntries(entries);
      }

   }, [entries, activeDate])

   //установка количества записей, тк в данном случае не подходит использование activeEntries.length
   useEffect(() => {
      if (activeEntries){
         let arr = [];
         activeEntries.forEach(proj => arr = [...arr, ...proj.entries]);
         setEntriesCount(arr.length);
      }
   }, [activeEntries])


   function renderEntries(arr) {
      if (arr){

         let elements = arr.map((value, index) => {

            const day = +value.date.split('-').reverse()[0];
            const month = monthsForDays.find((el, id) => id + 1 == +value.date.split('-').reverse()[1]);

            return (<div className="respond-recordings__per-day" key={index}>
               <h3 className="respond-recordings__date">{`${day} ${month}`}</h3>

               {value.entries.map((entry, id) => (
                  <Record key={id} time={entry.time} name={entry.name} email={entry.email} comment={entry.comment} />
               ))}
            </div>)
         });

         return elements;
      }
   }

   const respondItems = useMemo(() => renderEntries(activeEntries), [activeEntries]);

   return (
      <section className="respond-recordings">

         {activeEntries && activeEntries.length ? (
            <h2 className="respond-recordings__title">Записи респондентов (<span>{entriesCount}</span>)</h2>
         ) : (<h2 className="respond-recordings__title">Записей респондентов нет</h2>)}

         <div className="respond-recordings__content">
            {/* <div className="popup recording__popup" data-popup-target="respond-recording">
               <ul className="popup__list">
                  <li className="popup__item">
                     <button className="button-reset">Отправить письмо</button>
                  </li>
                  <li className="popup__item">
                     <button className="button-reset">Редактировать</button>
                  </li>
                  <li className="popup__item">
                     <button className="button-reset">Удалить</button>
                  </li>
                  <li className="popup__item">
                     <button className="button-reset">Пригласить в проект</button>
                  </li>
               </ul>
            </div> */}

            {respondItems}
         </div>
      </section>
   )
}
export default RespondRecordings;