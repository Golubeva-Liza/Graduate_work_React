import { useState } from 'react';

const CheckboxList = ({values, parentClass, firstCheckAll, setCheckValues}) => {
   //firstCheckAll - параметр, отвечающий за то, что первый элемент чеклиста отмечает все другие чекбоксы (выбрать всё)

   const [checked, setChecked] = useState([]);

   const changeCheckbox = (value) => {
      
      const currentIndex = checked.indexOf(value);
      let newChecked = [...checked];

      if (currentIndex === -1){
         newChecked.push(value);
      } else{
         newChecked.splice(currentIndex, 1);
      }

      if (firstCheckAll && newChecked.length == values.length - 1 && checked.indexOf(values[0]) === -1){
         newChecked = values;
      } else if (firstCheckAll && newChecked.length == values.length - 1 && checked.indexOf(values[0]) !== -1){
         newChecked.splice(checked.indexOf(values[0]), 1);
      }
      
      setChecked(newChecked);

      if (setCheckValues){
         setCheckValues(newChecked);
      }
   }

   const checkAll = (value) => {
      const currentIndex = checked.indexOf(value);
      let newChecked = [];

      if (currentIndex === -1){
         newChecked = values;
      }
      
      setChecked(newChecked);
      
      if (setCheckValues){
         setCheckValues(newChecked);
      }
   }


   return (
      <div className={parentClass}>
         {values.map((value, index) => {
            if (firstCheckAll && index == 0){
               return (<label className="checkbox checkbox_main" key={index}>
                        <input 
                           className="checkbox__input"
                           type="checkbox" 
                           value={value}
                           checked={checked.indexOf(value) === -1 ? false : true}
                           onChange={() => checkAll(value)}
                        />
                        <div className="checkbox__check"></div>
                        <span>{value}</span> 
                     </label>)
            } else {
               return (<label className="checkbox" key={index}>
                     <input 
                        className="checkbox__input"
                        type="checkbox" 
                        value={value}
                        checked={checked.indexOf(value) === -1 ? false : true}
                        onChange={() => changeCheckbox(value)}
                     />
                     <div className="checkbox__check"></div>
                     <span>{value}</span> 
                  </label>
               )
            }
         })}
      </div>
   )
}
export default CheckboxList;