import './inputWithLabel.scss';
import { Info } from '../../resources';

const InputWithLabel = (props) => {
   const {labelClass, labelTitle, children, question} = props;

   const labelClasses = labelClass ? labelClass : '';
   
   if (question){
      return (
         <div className={`form-label ${labelClasses}`}>
            <div className="modal__question">
               <span>{labelTitle}</span>
               <button className="button-reset modal__question-btn" type="button">
                  <Info/>
               </button>
            </div>
            {children}
         </div>
      )
   } else {
      return (
         <label className={`form-label ${labelClasses}`}>
            <span>{labelTitle}</span>
            {children}
         </label>
      )
   }
   
}
export default InputWithLabel;