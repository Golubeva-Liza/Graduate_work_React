import './popup.scss';
import { useState, useRef, useEffect } from 'react';

const Popup = (props) => {
   const {popupClass, popupOpened} = props;
   //popupOpened приходит из state компонента, в котором находится кнопка для взаимодействия popup
   // const [popupActive, setPopupActive] = useState(false);

   useEffect(() => {
      // console.log(popupOpened);
      // if (popupOpened === true){
      //    // console.log('открыт');
      //    document.addEventListener('click', closePopup);
      // }
   }, [popupOpened]);

   const toggleSettings = () => {
      // setPopupActive(!popupActive);
   }
   const closePopup = (e) => {
      // if(!select.current.contains(e.target)){
      //    setSelectOpened(false);
      //    // document.removeEventListener('click', closeSelect);
      // }
   }
   const popupShow = popupOpened ? 'show' : '';

   return (
      <div className={`popup ${popupClass} ${popupShow}`}>
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
               {/* <div className="popup main__invite-to-proj" data-popup-target="invite-to-proj">
                  <ul className="popup__list">
                     <li className="popup__item">
                        <button className="button-reset">Расписание1</button>
                     </li>
                     <li className="popup__item">
                        <button className="button-reset">1 семестр 2019</button>
                     </li>
                     <li className="popup__item">
                        <button className="button-reset">Кампания Google март 2018 </button>
                     </li>
                     <li className="popup__item">
                        <button className="button-reset">Расписание на зиму 2018</button>
                     </li>
                  </ul>
               </div> */}
            </li>
         </ul>
      </div>
   )
}
export default Popup;
