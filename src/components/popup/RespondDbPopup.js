import './popup.scss';
import { useState, useRef, useEffect } from 'react';

const RespondDbPopup = (props) => {
   const {popupClass, popupOpened, rowNum, link} = props;
   //popupOpened приходит из state компонента, в котором находится кнопка для взаимодействия popup

   const popupShow = popupOpened ? 'show' : '';
   const popupTop = `${47 * (rowNum + 2)}px`;

   return (
      <div className={`popup ${popupClass} ${popupShow}`} style={{top: popupTop}} ref={link}>
         <ul className="popup__list">
            <li className="popup__item">
               <button className="button-reset">Смотреть анкету</button>
            </li>
            <li className="popup__item">
               <button className="button-reset">Редактировать</button>
            </li>
            <li className="popup__item">
               <button className="button-reset">Удалить</button>
            </li>
            <li className="popup__item">
               <button className="button-reset">Отправить письмо</button>
            </li>
            <li className="popup__item">
               <button className="button-reset">Пригласить в проект</button>
               
            </li>
         </ul>
      </div>
   )
}
export default RespondDbPopup;


// {/* <div className="popup main__invite-to-proj" data-popup-target="invite-to-proj">
//    <ul className="popup__list">
//       <li className="popup__item">
//          <button className="button-reset">Расписание1</button>
//       </li>
//       <li className="popup__item">
//          <button className="button-reset">1 семестр 2019</button>
//       </li>
//       <li className="popup__item">
//          <button className="button-reset">Кампания Google март 2018 </button>
//       </li>
//       <li className="popup__item">
//          <button className="button-reset">Расписание на зиму 2018</button>
//       </li>
//    </ul>
// </div> */}