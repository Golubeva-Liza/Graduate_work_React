import './respondRecordings.scss';
import { useState, useEffect, useMemo, useRef } from 'react';
import Record from './Record';
import useCalendarValues from '../../hooks/useCalendarValues';


const RespondRecordings = ({
      activeDate, 
      entries, 
      targetEntry, setTargetEntry, 
      setEntryDeleteActive, 
      setRemovedEntry,
      changeViewEntries, setChangeViewEntries
   }) => {

   const {monthsForDays} = useCalendarValues(); 

   const [activeEntries, setActiveEntries] = useState(null);
   const [entriesCount, setEntriesCount] = useState(0);

   const popup = useRef();
   const entriesList = useRef();


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

   //и от изменения в записях, их редактирование или удаление
   useEffect(() => {
      if (changeViewEntries == true){
         let arr = [...entries];

         if (activeDate){
            arr = arr.filter(
               (item) => item.date === activeDate
            );
         }
         
         setActiveEntries(arr);
         setChangeViewEntries(false);
      }
      
   }, [changeViewEntries])

   //установка количества записей, тк в данном случае не подходит использование activeEntries.length
   useEffect(() => {
      if (activeEntries){
         let arr = [];
         activeEntries.forEach(proj => arr = [...arr, ...proj.entries]);
         setEntriesCount(arr.length);
      }
   }, [activeEntries])

   const removeListener = () => {
      document.removeEventListener('click', closePopup);
   }


   function renderEntries(arr) {
      if (arr){
         // console.log('entries render');
         let elements = arr.map((value, index) => {

            const day = +value.date.split('-').reverse()[0];
            const month = monthsForDays.find((el, id) => id + 1 == +value.date.split('-').reverse()[1]);

            return (<div className="respond-recordings__per-day" key={index}>
               <h3 className="respond-recordings__date">{`${day} ${month}`}</h3>

               {value.entries.map((entry, id) => (
                  <Record 
                     key={id} 
                     date={value.date}
                     time={entry.time} 
                     name={entry.name} 
                     email={entry.email} 
                     comment={entry.comment} 
                     id={entry.id}
                     targetEntry={targetEntry}
                     setTargetEntry={setTargetEntry}
                     link={popup}
                     removeListener={removeListener}
                     setEntryDeleteActive={setEntryDeleteActive}
                     setRemovedEntry={setRemovedEntry}
                  />
               ))}
            </div>)
         });

         return elements;
      }
   }

   const respondItems = useMemo(() => 
      renderEntries(activeEntries)
   , [activeEntries, targetEntry]);

   
   //когда открылся popup у записи
   useEffect(() => {
      if (targetEntry){
         // накапливаются обработчики, если кликать только на другие кнопки. нет подсветки выбранной кнопки.
         // console.log(targetEntry);
         document.addEventListener('click', closePopup);
      }
   }, [targetEntry])

   const closePopup = (e) => {
      if(popup.current && !popup.current.contains(e.target) && !e.target.classList.contains('more-functions')){
         setTargetEntry(null);
         removeListener();
         // dotBtns.current.forEach(item => item ? item.classList.remove('active') : null);
      }
   }


   return (
      <section className="respond-recordings">

         {activeEntries && activeEntries.length ? (
            <h2 className="respond-recordings__title">Записи респондентов (<span>{entriesCount}</span>)</h2>
         ) : (<h2 className="respond-recordings__title">Записей респондентов нет</h2>)}

         <div className="respond-recordings__content" ref={entriesList}>
            {respondItems}
         </div>
      </section>
   )
}
export default RespondRecordings;