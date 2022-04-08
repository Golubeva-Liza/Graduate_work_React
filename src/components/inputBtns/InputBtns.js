import './inputBtns.scss';
import {translit} from '../../hooks/translit';

const InputBtns = (props) => {
   const {classes, values, radioValue, setRadioValue} = props;

   function renderItems(values){
      const elements = values.map((value, index) => {
         return (
            <label key={index}>
               <input type="radio" className="visually-hidden" name="duration" value={value} 
                  onChange={(e) => setRadioValue(e.target.value)}
                  checked={radioValue == value ? true : false}
               />
               <div className="button button_linear">{value}</div>
            </label>
         )
      });
      return elements;
   }
   
   const selectItems = renderItems(values);

   return(
      <div className={`input-btns ${classes}`}>
         {selectItems}
      </div>
   )
   
}
export default InputBtns;