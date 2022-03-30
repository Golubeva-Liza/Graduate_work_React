import './inputBtns.scss';
import { useMemo, } from 'react';
import {translit} from '../../hooks/translit';

const InputBtns = (props) => {
   const {classes, values} = props;

   function renderItems(values){
      const elements = values.map((value, index) => {
         return (
            <label key={index}>
               <input type="radio" className="visually-hidden" name="duration" value={translit(value)}/>
               <div className="button button_linear">{value}</div>
            </label>
         )
      });
      return elements;
   }

   const selectItems = useMemo(() => {
      return renderItems(values);
   }, []);
   
   return(
      <div className={`input-btns ${classes}`}>
         {selectItems}
      </div>
   )
   
}
export default InputBtns;