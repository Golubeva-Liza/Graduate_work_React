import './select.scss';
import { useState, useMemo, useRef } from 'react';

const Select = (props) => {
   const {values} = props;

   const defaultValue = useMemo(() => {
      return values[0];
   }, []);

   const [currentValue, setCurrentValue] = useState(defaultValue);
   const [selectOpened, setSelectOpened] = useState(false);
   const listItems = useRef([]); //ссылки на все элементы в dropdown
   const select = useRef([]); 


   const toggleDropdown = () => {
      setSelectOpened(!selectOpened);
      if (selectOpened === false){//старое значение перед открытием
         // console.log('открыт');
         document.addEventListener('click', closeSelect);
      }
   }

   const closeSelect = (e) => {
      if(!select.current.contains(e.target)){
         setSelectOpened(false);
         // document.removeEventListener('click', closeSelect);
      }
   }
   
   const selectingItem = (e) => {
      listItems.current.forEach(item => item.classList.remove('selected'));
      setCurrentValue(e.target.innerHTML);
      setSelectOpened(false);
      e.target.classList.add('selected');
   }


   function renderListItems(values){
      // console.log('вычисляем значения');
      const elements = values.map((value, index) => (
         <li className="select__item" key={index} onClick={selectingItem} ref={el => listItems.current[index] = el}>{value}</li>)
      );
      return elements;
   }

   const selectItems = useMemo(() => {
      return renderListItems(values);
   }, []);


   const dropdownClass = selectOpened ? 'select_open' : '';
   return (
      <div className={`select ${dropdownClass}`} ref={select}>
         <div className="select__input" data-type="input" onClick={toggleDropdown}>
            <span data-type="value">{currentValue}</span>
         </div>
         <div className="select__dropdown">
            <ul className="select__list">
               {selectItems}
            </ul>
         </div>
         {/* <input className="visually-hidden" type="text" value={currentValue} readOnly/> */}
      </div>
   )
}
export default Select;