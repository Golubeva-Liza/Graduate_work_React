import './popup.scss';
import { useState, useMemo, useEffect, useRef } from 'react';

const Popup = ({popupClass, popupOpened, setPopupActive, items}) => {
   const popupShow = popupOpened ? 'show' : '';
   const popup = useRef();

   function renderItems(values){
      const elements = values.map((value, index) => (
         <li className="popup__item" key={index}>
            <button className="button-reset" data-modal-btn="add-respond">{value}</button>
         </li>
      ));
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
      <div className={`popup ${popupClass} ${popupShow}`} ref={popup}>
         <ul className="popup__list">
            {selectItems}
         </ul>
      </div>
   )
}
export default Popup;
