import './record.scss';
import { Dots } from '../../resources';

const Record = ({time, name, email, comment}) => {

   return (
      <div className="recording respond-recordings__recording">
         <span className="recording__time">{time}</span>
         <div className="recording__content">
            <span className="recording__name">{name}</span>
            <span className="recording__email">{email}</span>
            {comment ? <span className="recording__comment">{comment}</span> : null}
            <button className="button-reset more-functions recording__btn" >
               <Dots/>
            </button>
         </div>
      </div>
   )
}
export default Record;