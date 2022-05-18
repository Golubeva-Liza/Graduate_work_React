import { useState, useRef, useMemo, useEffect } from 'react';
import {translit} from '../../../hooks/translit';
import useValidation from '../../../hooks/useValidation';
import { AddressSuggestions } from 'react-dadata';
import useBookmeService from '../../../services/BookmeService';

import { CalendarArrowSmall } from '../../../resources';
import InputWithLabel from '../../inputWithLabel/InputWithLabel';
import InputBtns from '../../inputBtns/InputBtns';
import Input from '../../input/Input';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import Calendar from 'react-calendar';

const NewProjData = ({
      durationValues,
      setModalActive,
      step, setStep, 
      nameInput, 
      descrInput,
      addressInput, setAddressInput,
      projFormLink, 
      projLink,
      durationRadio, setDurationRadio,
      durationField,
      calendarValues, setCalendarValues,
      selectedDays, setSelectedDays,
      clearFields,
      isProjectEdit,
      errorMessage, setErrorMessage,
      validation
   }) => {

   const {universalRequest} = useBookmeService();

   const modal = useRef();
   const defaultTimeInterval = useMemo(() => '11:00-19:00', []);
   const [calendarActive, setCalendarActive] = useState(false);


   useEffect(() => {
      if (durationRadio !== 'Другое'){
         durationField.removeValue();
         let error = {};
         Object.assign(error, errorMessage);
         delete error['duration'];
         setErrorMessage({...error});
      }
   }, [durationRadio])

   useEffect(() => {
      if (calendarValues && calendarValues.length == 2){
         // console.log(calendarValues);
         setCalendarActive(false);
      }
   }, [calendarValues])


   const chooseDate = () => {
      setCalendarActive(!calendarActive);
   }

   const transformDate = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${day}.${month}.${year}`;
   }

   const getDaysArray = function(start, end) {
      for (var arr=[], date=new Date(start); date<=new Date(end); date.setDate(date.getDate()+1)){
         arr.push(new Date(date));
      }
      return arr;
   };

   const toSchedule = () => {
      //если есть ошибки в полях ввода
      if (Object.keys(errorMessage).length !== 0){
         return;
      }
      if (isProjectEdit === false){
         universalRequest('getProjectName', nameInput.value).then(res => {
            if (res == 'success'){
               onCheckedProject();
            } else{
               setErrorMessage(errorMessage => ({...errorMessage, ...{projName: res}}));
            }
         });
      } else {
         onCheckedProject();
      }
   }

   const onCheckedProject = () => {
      const first = transformDate(calendarValues[0]).split('.').reverse().join('-');
      const last = transformDate(calendarValues[1]).split('.').reverse().join('-');
      const daysList = getDaysArray(first, last);
      const newd = daysList.map((date) => date.toISOString().slice(0,10));

      let datesArray = [];

      //формирование дат и интервалов исходя из выбранного периода. если уже есть selectedDays, то оставляем те даты, которые подходят в новый выбранный период
      if (selectedDays == null){
         newd.forEach(el => {
            let obj = {
               date: el,
               intervals: [defaultTimeInterval]
            }
            datesArray.push(obj);
         })
         
      } else {
         newd.forEach(el => {
            const isElSelected = selectedDays.find(date => date.date === el);

            if (isElSelected){
               datesArray.push(isElSelected);
            } else {
               datesArray.push({
                  date: el,
                  intervals: [defaultTimeInterval]
               });
            }
         })
      }

      setSelectedDays(datesArray);
      setStep(step + 1);
   }

   const closeModal = () => {
      setModalActive(false);
      clearFields();
      setCalendarActive(false);
   }


   return (
      <div className={`modal__content modal-new-project__data`} ref={modal}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={closeModal}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">{isProjectEdit == true ? 'Редактирование проекта' : 'Создание проекта'}</h3>
         </div>

         <InputWithLabel labelClass="modal__label" labelTitle="Название проекта *">
            <Input 
               inputType="text" 
               inputName="projName" 
               inputText="Введите название" 
               value={nameInput.value} 
               onChange={nameInput.onChange} 
               onBlur={e => validation(e)}
            />
            {errorMessage.projName ? <ErrorMessage message={errorMessage.projName}/> : null}
         </InputWithLabel>
         <InputWithLabel labelClass="modal__label" labelTitle="Описание *">
            <textarea 
               className="input input_textarea" 
               type="text" 
               name="descr" 
               autoComplete="off"
               placeholder="Опишите суть проекта или какие люди нужны для тестирования (требования)" 
               value={descrInput.value} 
               onChange={descrInput.onChange} 
               onBlur={e => validation(e)}
            ></textarea>
            {errorMessage.descr ? <ErrorMessage message={errorMessage.descr}/> : null}
         </InputWithLabel>
         <div className="modal__label">
            <span className="modal__input-name">Адрес проведения тестирований *</span>
            <div className="modal__some-inputs modal-new-project__address">
               {/* <AddressSuggestions 
                  token="abbb9f71a457db183a05fe468d78b9657ca2546a" 
                  value={addressInput} 
                  onChange={setAddressInput} 
                  minChars={6} 
                  inputProps={{name: "projAddress", placeholder: "Добавьте адрес", className: "input", onBlur: changeAddress}}
                  count={5} delay={500}
               /> */}
               <Input 
                  inputType="text" 
                  inputName="projAddress" 
                  inputText="Добавьте адрес" 
                  value={addressInput} 
                  onChange={e => setAddressInput(e.target.value)}
                  onBlur={e => validation(e)}
               />
               <Button linear>Выбрать сохраненный</Button>
            </div>
            {errorMessage.projAddress ? <ErrorMessage message={errorMessage.projAddress}/> : null}
         </div>
         <InputWithLabel labelClass="modal__label" labelTitle="Ссылка на анкету для респондентов">
            <Input 
               inputType="text" 
               inputName="projFormLink" 
               inputText="Ссылка на Google Form" 
               value={projFormLink.value} 
               onChange={projFormLink.onChange}
               onBlur={e => validation(e)}
            />
            {errorMessage.projFormLink ? <ErrorMessage message={errorMessage.projFormLink}/> : null}
         </InputWithLabel>
         {/* <InputWithLabel labelClass="modal__label" labelTitle="Ссылка для приглашения" question>
            <div className="modal__some-inputs modal-new-project__link">
               <span className="modal__input-name">bookme.ru/maria/</span>
               <Input inputType="text" inputName="projLink" inputText={translit(nameInput.value)} value={projLink.value} onChange={projLink.onChange}/>
            </div>
         </InputWithLabel> */}

         <div className="modal__label">
            <span className="modal__input-name">Длительность тестирования *</span>
            <InputBtns 
               values={durationValues}
               radioValue={durationRadio} setRadioValue={setDurationRadio}
            />
            {durationRadio == 'Другое' ? (
               <Input 
                  inputClass="modal-new-project__duration"
                  inputType="number" 
                  inputName="duration" 
                  inputText={'Укажите число минут'} 
                  value={durationField.value} 
                  onChange={durationField.onChange}
                  onBlur={e => validation(e)}
               />
            ) : null}
            {errorMessage.duration ? <ErrorMessage message={errorMessage.duration}/> : null}
         </div>
         

         <div className="modal__label modal-new-project__period">
            <span className="modal__input-name">Период тестирования *</span>

            <div className="modal-new-project__period-content">
               <div className="modal-new-project__period-time">
                  С 
                  <button className="button-reset" type="button" onClick={chooseDate}>
                     {calendarValues && calendarValues.length == 2 
                     ? transformDate(calendarValues[0])
                     : 'выбрать дату'}
                  </button>
                  по 
                  <button className="button-reset" type="button" onClick={chooseDate}>
                     {calendarValues && calendarValues.length == 2 
                     ? transformDate(calendarValues[1])
                     : 'выбрать дату'}
                  </button>
                  
               </div>
            </div>
            <Calendar 
               value={calendarValues} 
               onChange={setCalendarValues}
               selectRange={true}
               className={`react-calendar__duration ${calendarActive ? 'active' : ''}`}
               minDate={new Date()}
               prev2Label={null} next2Label={null}
               prevLabel={<CalendarArrowSmall/>} nextLabel={<CalendarArrowSmall/>}
            />
         </div>


         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={1}/>
            <Button 
               buttonClass="modal__btn modal__ready" 
               onClick={toSchedule}
               disabled={
                  nameInput.value !== '' 
                  && descrInput.value !== '' 
                  && addressInput !== '' 
                  && (durationRadio !== null && (durationRadio !== 'Другое' || durationField.value.length > 0))
                  && calendarValues && calendarValues.length == 2
                  ? false : true}
            >
               Выбор дат и времени
            </Button>
         </div>
      </div>
   )
}
export default NewProjData;