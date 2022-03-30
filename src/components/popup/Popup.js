import './popup.scss';
import { useState, useMemo, useEffect, useRef } from 'react';

const Popup = ({popupClass, popupOpened, setPopupActive, items, onClick, line}) => {
   //onClick - массив функций, которые должны выполнятся по клику определенного list item (должны совпадать индексы)
   const popup = useRef();

   function renderItems(values){
      let elements = values.map((value, index) => (
         <li className="popup__item" key={index} onClick={onClick[index]}>
            <button className="button-reset">{value}</button>
         </li>
      ));
      if (line){
         elements = [...elements.slice(0, line), <hr className="popup__line" key={Math.floor(Math.random() * (100 - 20)) + 20}/>, ...elements.slice(line)];
      }
      return elements;
   }

   const selectItems = useMemo(() => {
      return renderItems(items);
   }, []);

   
   useEffect(() => {
      if (popupOpened === true){
         document.addEventListener('click', closePopup);
      }
   }, [popupOpened]);

   const closePopup = (e) => {
      if(!popup.current.contains(e.target)){
         setPopupActive(false);
         document.removeEventListener('click', closePopup);
      }
   }

   return (
      <div className={`popup ${popupClass} ${popupOpened ? 'show' : ''}`} ref={popup}>
         <ul className="popup__list">
            {selectItems}
         </ul>
      </div>
   )
}
export default Popup;
