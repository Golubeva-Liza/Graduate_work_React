import './popup.scss';

const EntriesPopup = ({popupClass, link, removeEntry}) => {
 
   return (
      <div className={`popup show ${popupClass}`} ref={link}>
         <ul className="popup__list">
            <li className="popup__item">
               <button className="button-reset" onClick={null}>Редактировать запись</button>
            </li>
            <li className="popup__item">
               <button className="button-reset" onClick={removeEntry}>Удалить запись</button>
            </li>
            {/* <li className="popup__item">
               <button className="button-reset">Отправить письмо</button>
            </li>
            <li className="popup__item">
               <button className="button-reset">Пригласить в проект</button>
            </li> */}
         </ul>
      </div>
   )
}
export default EntriesPopup;