import { useState, useRef, useMemo } from 'react';
import {translit} from '../../../hooks/translit';
import useValidation from '../../../hooks/useValidation';
import { AddressSuggestions } from 'react-dadata';

import { CalendarArrowSmall } from '../../../resources';
import InputWithLabel from '../../inputWithLabel/InputWithLabel';
import InputBtns from '../../inputBtns/InputBtns';
import Input from '../../input/Input';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import CalendarProj from '../../calendar/CalendarProj';


const NewProjData = ({
      setModalActive,
      step, setStep, 
      nameInput, descrInput, 
      projSurveyLink, projLink,
      durationRadio, setDurationRadio,
      firstDate, setFirstDate, 
      lastDate, setLastDate,
      setSelectedDays
   }) => {

   const [calendarActive, setCalendarActive] = useState(false);
   const [activeDate, setActiveDate] = useState(null);
   const [errorMessage, setErrorMessage] = useState('');
   const [projAddress, setProjAddress] = useState();

   const {projectDataValidation} = useValidation();
   const modal = useRef();
   const defaultTimeInterval = useMemo(() => '15:00-19:00', []);


   const choosePrevDate = () => {
      if(!calendarActive){
         setActiveDate('prev');
      }else{
         setActiveDate(null);
      }
      setCalendarActive(!calendarActive);
   }
   const chooseNextDate = () => {
      if(!calendarActive){
         setActiveDate('next');
      }else{
         setActiveDate(null);
      }
      setCalendarActive(!calendarActive);
   }

   const getDaysArray = function(start, end) {
      for (var arr=[], date=new Date(start); date<=new Date(end); date.setDate(date.getDate()+1)){
         arr.push(new Date(date));
      }
      return arr;
   };

   const toSchedule = () => {
      // const successValid = projectDataValidation(modal.current, nameInput.value, descrInput.value, projAddress, durationRadio, firstDate, lastDate);
      
      // if (successValid === true){
      //    setErrorMessage('');
      //    console.log('всё норм');
      //    setStep(step + 1);
      // } else {
      //    setErrorMessage(successValid);
      // }

      // if (firstDate && lastDate){
      //    setStep(step + 1);
      // }
      const first = firstDate.split('.').reverse().join('-');
      const last = lastDate.split('.').reverse().join('-');
      const daysList = getDaysArray(first, last);
      const newd = daysList.map((date) => date.toISOString().slice(0,10));

      let datesArray = [];
      newd.forEach(el => {
         let obj = {
            date: el,
            time: [defaultTimeInterval]
         }
         datesArray.push(obj);
      })
      setSelectedDays(datesArray);
      setStep(step + 1);
   }

   const errorDiv = errorMessage ? <div className="error-message form__error-message">{errorMessage}</div> : null;
   return (
      <div className={`modal__content modal-new-project__data`} ref={modal}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={() => setModalActive(false)}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">Создание проекта</h3>
         </div>

         {errorDiv}

         <InputWithLabel labelClass="modal__label" labelTitle="Название проекта *">
            <Input inputType="text" inputName="name" inputText="Введите название" value={nameInput.value} onChange={nameInput.onChange}/>
         </InputWithLabel>
         <InputWithLabel labelClass="modal__label" labelTitle="Описание *">
            <textarea className="input modal__textarea" type="text" name="project-descr" autoComplete="off"
               placeholder="Опишите суть проекта или какие люди нужны для тестирования (требования)" value={descrInput.value} onChange={descrInput.onChange}
            ></textarea>
         </InputWithLabel>
         <div className="modal__label">
            <span className="modal__input-name">Адрес проведения тестирований *</span>
            <div className="modal__some-inputs modal-new-project__address">
               <AddressSuggestions 
                  token="abbb9f71a457db183a05fe468d78b9657ca2546a" 
                  value={projAddress} onChange={setProjAddress} 
                  minChars={6} 
                  inputProps={{name: "projAddress", placeholder: "Добавьте адрес", className: "input"}}
                  count={5} delay={500}
               />
               {/* <Input inputType="text" inputName="projAddress" inputText="Добавьте адрес" value={addressInput.value} onChange={addressInput.onChange}/> */}
               <Button linear>Выбрать сохраненный</Button>
            </div>
         </div>
         <InputWithLabel labelClass="modal__label" labelTitle="Ссылка на анкету для респондентов">
            <Input inputType="text" inputName="projSurveyLink" inputText="Ссылка на Google Form" value={projSurveyLink.value} onChange={projSurveyLink.onChange}/>
         </InputWithLabel>
         <InputWithLabel labelClass="modal__label" labelTitle="Ссылка для приглашения" question>
            <div className="modal__some-inputs modal-new-project__link">
               <span className="modal__input-name">bookme.ru/maria/</span>
               <Input inputType="text" inputName="projLink" inputText={translit(nameInput.value)} value={projLink.value} onChange={projLink.onChange}/>
            </div>
         </InputWithLabel>
         <InputWithLabel labelClass="modal__label" labelTitle="Длительность тестирования *" question>
            <InputBtns 
               values={['30 минут', '45 минут', '60 минут', '90 минут', 'Другое']}
               radioValue={durationRadio} setRadioValue={setDurationRadio}
            />
         </InputWithLabel>
         <div className="modal__label modal-new-project__period">
            <span className="modal__input-name">Период тестирования *</span>

            <div className="modal-new-project__period-content">
               <div className="modal-new-project__period-time">
                  С 
                  <button className="button-reset" type="button" onClick={choosePrevDate}>{firstDate ? firstDate : 'выбрать дату'}</button>
                  по 
                  <button className="button-reset" type="button" onClick={chooseNextDate} disabled={firstDate ? false : true}>{lastDate ? lastDate : 'выбрать дату'}</button>
                  <CalendarProj classes={`modal-new-project__calendar ${calendarActive ? 'active' : ''}`} small
                     firstDate={firstDate}
                     setFirstDate={setFirstDate} setCalendarActive={setCalendarActive}
                     lastDate={lastDate} setLastDate={setLastDate} 
                     activeDate={activeDate} setActiveDate={setActiveDate}
                  /> 
               </div>

               {/* <div className="modal-new-project__choose-time">
                  <button className="button-reset" type="button">Выбрать даты</button>
                  <CalendarProj classes="modal-new-project__calendar" small
                     setFirstDate={setFirstDate}
                     setLastDate={setLastDate}
                  />
               </div> */}
            </div>
         </div>

         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={1}/>
            <Button buttonClass="modal__btn modal__ready" onClick={toSchedule}>Выбор дат и времени</Button>
         </div>
      </div>
   )
}
export default NewProjData;