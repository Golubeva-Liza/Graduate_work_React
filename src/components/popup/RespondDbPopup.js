import './popup.scss';

const RespondDbPopup = (props) => {
   const {popupClass, popupOpened, setPopupActive, rowNum, link, activeRespond, setRemovedRespond, setEditModalActive, setEditRespond} = props;

   const popupShow = popupOpened ? 'show' : '';
   const popupTop = `${47 * (rowNum + 2)}px`;

   const removeRespond = () => {
      setRemovedRespond(activeRespond);
   }
   const modalEditRespond = () => {
      setEditModalActive(true);
      // console.log(activeRespond);
      setEditRespond(activeRespond);
      setPopupActive(false);
   }
 
   return (
      <div className={`popup ${popupClass} ${popupShow}`} style={{top: popupTop}} ref={link}>
         <ul className="popup__list">
            <li className="popup__item">
               <button className="button-reset">Смотреть анкету</button>
            </li>
            <li className="popup__item">
               <button className="button-reset" onClick={modalEditRespond}>Редактировать</button>
            </li>
            <li className="popup__item">
               <button className="button-reset" onClick={removeRespond}>Удалить</button>
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
