import './select.scss';
import { useState, useMemo, useRef, useEffect } from 'react';

const Select = ({values, selectName, clearSelect, setClearSelect, selectValue, setSelectValue}) => {

   const defaultValue = useMemo(() => {
      return values[0];
   }, [values]);

   const [currentValue, setCurrentValue] = useState(defaultValue);
   const [selectOpened, setSelectOpened] = useState(false);
   const listItems = useRef([]); //ссылки на все элементы в dropdown
   const select = useRef([]); 

   useEffect(() => {
      if (values){
         // console.log('поменять значения', values);
         setCurrentValue(values[0]);
         listItems.current.forEach(item => item ? item.classList.remove('selected') : null);
      }
   }, [values]);

   useEffect(() => {
      if (clearSelect){
         setCurrentValue(defaultValue);
         listItems.current.forEach(item => item ? item.classList.remove('selected') : null);
         setClearSelect(false);
      }
   }, [clearSelect]);

   useEffect(() => {
      if (selectValue){
         listItems.current.forEach(item => item ? item.classList.remove('selected') : null);
         setCurrentValue(selectValue);
         listItems.current.forEach(item => {
            if (item && item.innerHTML == selectValue){
               item.classList.add('selected');
            }
         });
      }
   }, [selectValue]);


   const toggleDropdown = () => {
      setSelectOpened(!selectOpened);
      if (selectOpened === false){//старое значение перед открытием
         // console.log('открыт');
         document.addEventListener('click', closeSelect);
      }
   }

   const closeSelect = (e) => {
      if(select.current && !select.current.contains(e.target)){
         setSelectOpened(false);
         // document.removeEventListener('click', closeSelect);
      }
   }
   
   const selectingItem = (e) => {
      // console.log(listItems.current);
      listItems.current.forEach(item => item ? item.classList.remove('selected') : null);
      setCurrentValue(e.target.innerHTML);
      setSelectOpened(false);
      e.target.classList.add('selected');
      if (setSelectValue){
         setSelectValue(e.target.innerHTML);
      }
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
   }, [values]);


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
         <input className="visually-hidden" type="text" value={currentValue} name={selectName} readOnly/>
      </div>
   )
}
export default Select;