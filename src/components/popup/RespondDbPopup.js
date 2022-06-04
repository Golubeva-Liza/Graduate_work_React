import './popup.scss';

const RespondDbPopup = (props) => {
   const {popupClass, popupOpened, setPopupActive, rowNum, link, activeRespond, setRemovedRespond, setEditModalActive, setEditRespond, isLow, dotBtns} = props;

   const removeRespond = () => {
      setRemovedRespond(true);//открывается модальное окно для удаления
      setPopupActive(false);
   }
   
   const modalEditRespond = () => {
      setEditModalActive(true);
      // console.log(activeRespond);
      setEditRespond(activeRespond);
      setPopupActive(false);
      dotBtns.current.forEach(item => item ? item.classList.remove('active') : null);
   }
 
   return (
      //rowNum - 195
      <div className={`popup ${popupClass} ${popupOpened ? 'show' : ''}`} 
         style={{top: `${isLow == true ? rowNum - 80 : rowNum + 40}px`}} 
         ref={link}
      >
         <ul className="popup__list">
            <li className="popup__item">
               <button className="button-reset" onClick={modalEditRespond}>Редактировать</button>
            </li>
            <li className="popup__item">
               <button className="button-reset" onClick={removeRespond}>Удалить</button>
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
export default RespondDbPopup;
