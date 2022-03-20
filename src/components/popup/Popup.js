import './popup.scss';
import { useState, useMemo, useEffect } from 'react';

const Popup = (props) => {
   const {popupClass, popupOpened, items} = props;
   const popupShow = popupOpened ? 'show' : '';

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

   return (
      <div className={`popup ${popupClass} ${popupShow}`}>
         <ul className="popup__list">
            {selectItems}
         </ul>
      </div>
   )
}
export default Popup;
