import './accordion.scss';
import { useMemo } from 'react';

const Accordion = ({accordClass, name, items, accordActive, setAccordActive, onClick, time, startTime, finalTime}) => {

   function renderItems(values){
      let elements = values.map((value, index) => (
         <li className="accordion__list-item" key={index} onClick={onClick[index]}>
            <button className="button-reset accordion__btn">{value}</button>
         </li>
      ));
      return elements;
   }

   const accordItems = useMemo(() => {
      return renderItems(items);
   }, []);

   return (
      <div className={`accordion ${accordActive === name ? "accordion_active" : ""} ${accordClass}`}>
         <button className="button-reset accordion__header" onClick={() => setAccordActive(name)}>{name}</button>
         <div className="accordion__body">
            {time ? <span className="accordion__time">с {startTime} по {finalTime}</span> : null}
            
            <ul className="accordion__list">
               {accordItems}
            </ul>
         </div>
      </div>
   )
}
export default Accordion;