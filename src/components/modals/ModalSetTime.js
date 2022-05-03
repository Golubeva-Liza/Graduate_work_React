import './otherModals.scss';
import { useState, useMemo, useEffect } from 'react';
import useBookmeService from '../../services/BookmeService';

import { CalendarArrowSmall } from '../../resources';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import Input from '../input/Input';
import Button from '../button/Button';
import Select from '../select/Select';
import { Delete } from '../../resources';
import CheckboxList from '../checkboxList/CheckboxList';


const ModalSetTime = ({setModalActive, date, setDate, selectedDays, setSelectedDays}) => {

   const [inputFields, setInputFields] = useState([{firstTime: '', lastTime: ''}]);  

   useEffect(() => {
      if (date){
         const day = selectedDays.find(item => item.date == date);
         // console.log(selectedDays, date);
         const obj = day.time.map(item => 
            ({firstTime: item.split('-')[0], lastTime: item.split('-')[1]})
         )
         setInputFields(obj);
      }
      
   }, [date])
   
   const changeInput = (e, id) => {
      const values = [...inputFields];
      values[id][e.target.name] = e.target.value;
      setInputFields(values);
   }

   const addFields = () => {
      setInputFields([...inputFields, { firstTime: '', lastTime: '' }]);
   }

   const deleteFields = (id) => {
      const values = [...inputFields];
      values.splice(id, 1);
      setInputFields(values);
   }

   const removeAllFields = () => {
      setInputFields([{ firstTime: '', lastTime: '' }]);
   }


   const [radioTime, setRadioTime] = useState('current');
   const [checkWeekdays, setCheckWeekdays] = useState([]);

   const changeRadio = (e) => {
      setRadioTime(e.target.value);
   }


   const closeModal = () => {
      setModalActive(false);
      setDate(null);
      setTimeout(clearFields, 400);
   }
   const clearFields = () => {
      setRadioTime('current');
      setInputFields([{ firstTime: '', lastTime: '' }]);
   }


   const applyTime = () => {
      const withoutEmpty = inputFields.filter(item => item.firstTime !== '' && item.lastTime !== '' );
      const intervals = withoutEmpty.map(item => item.firstTime ? `${item.firstTime}-${item.lastTime}` : null);

      if (radioTime == 'current' || checkWeekdays.length == 0){
         //обновление интервалов выбранного дня в объекте selectedDays

         const id = selectedDays.findIndex(item => item.date == date);
         const newSelectedDay = {date: selectedDays[id].date, time: [...selectedDays[id].time]};
         newSelectedDay.time = intervals;

         const updatedDays = [...selectedDays.slice(0, id), newSelectedDay, ...selectedDays.slice(id + 1)];
         setSelectedDays(updatedDays);

      } else if (radioTime == 'weekdays'){
         //применяем интервалы времени ко всем дням, которые попадают под условие checkWeekdays (выбранный день недели)

         const newSelectedDays = [...selectedDays];
         const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

         newSelectedDays.forEach(date => {
            checkWeekdays.forEach(weekday => {
               if (new Date(date.date).getDay() == weekdays.findIndex(item => item == weekday)){
                  date.time = intervals;
               }
            })
         });

         setSelectedDays(newSelectedDays);
      }

      setModalActive(false);
      closeModal();
   }

   return (
      <div className="modal__content modal-set-time__content" onClick={e => e.stopPropagation()}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={closeModal}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">Установить время</h3>
         </div>

         <div className="modal-set-time__title">Выбрать интервал(ы)</div>
         <div className="modal-set-time__intervals">
            {inputFields.map((field, index) => (
               <div className="modal-set-time__interval" key={index}>
                  <span>С</span>
                  <InputMask mask="99:99" value={field.firstTime} onChange={e => changeInput(e, index)}>
                     <Input inputType="num" inputName="firstTime"/>
                  </InputMask>
                  <span>До</span>
                  <InputMask mask="99:99" value={field.lastTime} onChange={e => changeInput(e, index)}>
                     <Input inputType="num" inputName="lastTime"/>
                  </InputMask>

                  {index !== 0 ? 
                     <button className="button-reset modal-set-time__delete" onClick={() => deleteFields(index)}><Delete/></button> 
                     : null}
               </div>
            ))}
         </div>
         <div className="modal-set-time__add-btns">
            <Button linear onClick={addFields}>Добавить интервал</Button>
            <Button linearRed onClick={removeAllFields}>Удалить всё</Button>
         </div>
         
         <div className="modal-set-time__title">Применить к дням</div>
         <div className="modal-set-time__radio">
            <label className="radio">
               <input 
                  className="radio__input" 
                  name="whichDate" 
                  type="radio" 
                  value="current" 
                  checked={radioTime == "current" ? true : false}
                  onChange={changeRadio}
               />
               <div className="radio__check"></div>
               <span>Применить к {date ? date.split('-').reverse().join('.') : ''}</span> 
            </label>
            <label className="radio">
               <input 
                  className="radio__input" 
                  name="whichDate" 
                  type="radio" 
                  value="weekdays" 
                  checked={radioTime == "weekdays" ? true : false}
                  onChange={changeRadio}
               />
               <div className="radio__check"></div>
               <span>Применить к дням недели</span> 
            </label>
         </div>
         
         {radioTime == "weekdays" ? (
            <div className="modal-set-time__weekdays">
               <div className="modal-set-time__title">Дни недели</div>
               <CheckboxList 
                  values={['Все дни', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']} 
                  firstCheckAll
                  parentClass="modal-set-time__weekdays-list"
                  setCheckValues={setCheckWeekdays}
                  // checkedValue={}
               />
            </div>
         ) : null}
         
         
         <div className="modal-set-time__apply-btns">
            {/* <Button onClick={null}>Применить к 24 декабря</Button>*/}
            {/* <Button linearRed onClick={null}>Удалить из расписания</Button>  */}
            <Button onClick={applyTime}>Сохранить</Button>
         </div>
         
      </div>
   )
}
export default ModalSetTime;