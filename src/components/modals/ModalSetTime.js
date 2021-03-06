import './otherModals.scss';
import { useState, useMemo, useEffect } from 'react';

import { CalendarArrowSmall } from '../../resources';
import InputMask from 'react-input-mask/lib/react-input-mask.development';
import Input from '../input/Input';
import Button from '../button/Button';
import { Delete } from '../../resources';
import CheckboxList from '../checkboxList/CheckboxList';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useValidation from '../../hooks/useValidation';


const ModalSetTime = ({setModalActive, date, setDate, selectedDays, setSelectedDays}) => {

   const [inputFields, setInputFields] = useState([{firstTime: '', lastTime: ''}]);  
   const {timeValidation, errorMessage, setErrorMessage} = useValidation();


   //когда меняется выбранная дата, применяются ииеющиеся интервалы
   useEffect(() => {
      if (date){
         const day = selectedDays.find(item => item.date == date);
         if (day){
            const obj = day.intervals.map(item => 
               ({firstTime: item.split('-')[0], lastTime: item.split('-')[1]})
            )
            setInputFields(obj);
         } else {
            setInputFields([{ firstTime: '', lastTime: '' }]);
         }
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

      let error = {};
      Object.assign(error, errorMessage);
      delete error[`first${id}`];
      delete error[`last${id}`];
      setErrorMessage(error);
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
      setErrorMessage({});
   }

   const clearFields = () => {
      setRadioTime('current');
      setInputFields([{ firstTime: '', lastTime: '' }]);
   }

   const applyTime = () => {

      const withoutEmpty = inputFields.filter(item => item.firstTime !== '' && item.lastTime !== '' );
      const intervals = withoutEmpty.map(item => item.firstTime ? `${item.firstTime}-${item.lastTime}` : null);

      //если применяем интервал только к выбранному дню
      if (radioTime == 'current' || checkWeekdays.length == 0){

         const id = selectedDays.findIndex(item => item.date == date); //id этого дня в списке всех дней
         let updatedDays = [];

         //если интервалов времени нет на этот день
         if (withoutEmpty.length == 0){
            //то убираем этот день из списка
            updatedDays = [...selectedDays.slice(0, id), ...selectedDays.slice(id + 1)];
         
         //если этого дня в списке не было, то добавляем интервал
         } else if (id === -1){
            const newSelectedDay = {date: date, intervals: intervals};
            updatedDays = [...selectedDays, newSelectedDay];

         //если просто обновился список интервалов, то обновляем их   
         } else {
            const newSelectedDay = {date: selectedDays[id].date, intervals: [...selectedDays[id].intervals]};
            newSelectedDay.intervals = intervals;
            updatedDays = [...selectedDays.slice(0, id), newSelectedDay, ...selectedDays.slice(id + 1)];
         }

         setSelectedDays(updatedDays);


      } else if (radioTime == 'weekdays'){
         //применяем интервалы времени ко всем дням, которые попадают под условие checkWeekdays (выбранный день недели)

         const newSelectedDays = JSON.parse(JSON.stringify(selectedDays));
         const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

         newSelectedDays.forEach(date => {
            checkWeekdays.forEach(weekday => {
               if (new Date(date.date).getDay() == weekdays.findIndex(item => item == weekday)){
                  date.intervals = intervals;
               }
            })
         });

         const readySelectedDays = newSelectedDays.filter((date) => date.intervals.length !== 0); //убираем даты, из которых удалились интервалы
         setSelectedDays(readySelectedDays);
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
                  <div>
                     <span>С</span>
                     <InputMask 
                        mask={[/[0-2]/, field.firstTime[0]==='2' ? /[0-3]/ : /[0-9]/, ":", /[0-5]/, /[0-9]/]} 
                        value={field.firstTime} 
                        onChange={e => changeInput(e, index)}
                        onBlur={() => timeValidation(field.firstTime, 'first', index, index > 0 ? inputFields[index-1].lastTime : null)}
                     >
                        <Input inputType="num" inputName="firstTime"/>
                     </InputMask>
                     <span>До</span>
                     <InputMask 
                        mask={[/[0-2]/, field.lastTime[0]==='2' ? /[0-3]/ : /[0-9]/, ":", /[0-5]/, /[0-9]/]} 
                        value={field.lastTime} 
                        onChange={e => changeInput(e, index)}
                        onBlur={() => timeValidation(field.lastTime, 'last', index, field.firstTime)}
                     >
                        <Input inputType="num" inputName="lastTime"/>
                     </InputMask>

                     {index !== 0 ? 
                        <button className="button-reset modal-set-time__delete" onClick={() => deleteFields(index)}><Delete/></button> 
                        : null}
                  </div>
                  {errorMessage[`first${index}`]? <ErrorMessage message={errorMessage[`first${index}`]}/> : null}
                  {errorMessage[`last${index}`]? <ErrorMessage message={errorMessage[`last${index}`]}/> : null}
               </div>
            ))}
         </div>
         <div className="modal-set-time__add-btns">
            <Button 
               linear 
               onClick={addFields} 
               disabled={
                  Object.keys(errorMessage).length == 0 
                  && (!inputFields[inputFields.length-1].firstTime.length || inputFields[inputFields.length-1].lastTime.length !== 0)
                  ? false : true
               }
            >Добавить интервал</Button>
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
            <Button onClick={applyTime} disabled={
               Object.keys(errorMessage).length == 0
               && (!inputFields[inputFields.length-1].firstTime.length || inputFields[inputFields.length-1].lastTime.length !== 0)
               ? false : true}
            >Сохранить</Button>
         </div>
         
      </div>
   )
}
export default ModalSetTime;