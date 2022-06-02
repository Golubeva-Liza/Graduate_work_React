import './record.scss';
import { Dots } from '../../resources';
import EntriesPopup from '../popup/EntriesPopup';

const Record = ({date, time, name, email, comment, id, targetEntry, setTargetEntry, link, removeListener, setEntryDeleteActive, setRemovedEntry}) => {

   const onClickDots = () => {
      if (targetEntry && targetEntry.id == id){
         setTargetEntry(null);
      } else {
         setTargetEntry({date, id});
      }
      removeListener();
   }

   const removeEntry = () => {
      setEntryDeleteActive(true); //открытие модального окна
      setRemovedEntry(targetEntry); //установка удаляемой записи
      setTargetEntry(null);
      removeListener();
   }

   return (
      <div className="recording respond-recordings__recording">
         <span className="recording__time">{time}</span>
         <div className="recording__content">
            <span className="recording__name">{name}</span>
            <span className="recording__email">{email}</span>
            {comment ? <span className="recording__comment">{comment}</span> : null}
            <button className="button-reset more-functions recording__btn" onClick={onClickDots}>
               <Dots/>
            </button>
            {targetEntry && targetEntry.id == id ? (
               <EntriesPopup
                  link={link}
                  popupClass={`recording__popup`}
                  entry={id}
                  removeEntry={removeEntry}
               />
            ) : null}
         </div>
      </div>
   )
}
export default Record;