import './otherModals.scss';
import 'react-dadata/dist/react-dadata.css';

import { useState, useRef, useEffect } from 'react';
import useBookmeService from '../../services/BookmeService';
import {translit} from '../../hooks/translit';
import useValidation from '../../hooks/useValidation';
import { AddressSuggestions } from 'react-dadata';

import { CalendarArrowSmall, Info } from '../../resources';
import { useInput } from '../../hooks/useInput';
import InputWithLabel from '../inputWithLabel/InputWithLabel';
import InputBtns from '../inputBtns/InputBtns';
import Input from '../input/Input';
import ProgressBtns from '../progressBtns/ProgressBtns';
import Button from '../button/Button';
import Calendar from '../calendar/Calendar';
import CalendarProj from '../calendar/CalendarProj';
import CalendarCreateSchedule from '../calendar/CalendarCreateSchedule';
import Popup from '../popup/Popup';

const ModalNewProject = ({setModalActive, setModalTimeActive, setDate, setTime}) => {
   const form = useRef();

   const nameInput = useInput('');
   const descrInput = useInput('');
   const addressInput = useInput('');
   const projSurveyLink = useInput('');
   const projLink = useInput('');
   const [durationRadio, setDurationRadio] = useState(null);

   const [step, setStep] = useState(1);
   const [popupCopyActive, setPopupCopyActive] = useState(false);
   const [firstDate, setFirstDate] = useState(null);
   const [lastDate, setLastDate] = useState(null);
   

   const formSubmit = () => {
      // const formData = new FormData(form.current);
      // formData.append("id", user[1]);

      // updateUserData(formData).then(res => {
      // });
   }

   
   return (
      <form className="modal__form" method="POST" ref={form}>
         <NewProjData setModalActive={setModalActive} 
            nameInput={nameInput} descrInput={descrInput} addressInput={addressInput}
            projSurveyLink={projSurveyLink} projLink={projLink} 
            active={step === 1 ? true : false} step={step} setStep={setStep}
            durationRadio={durationRadio} setDurationRadio={setDurationRadio}
            firstDate={firstDate} setFirstDate={setFirstDate} lastDate={lastDate} setLastDate={setLastDate}
         />
         <NewProjCalendar
            active={step === 2 ? true : false} step={step} setStep={setStep}
            popupCopyActive={popupCopyActive} setPopupCopyActive={setPopupCopyActive}
            firstDate={firstDate} lastDate={lastDate}
            setModalTimeActive={setModalTimeActive}
            setDate={setDate} setTime={setTime}
         />
         <NewProjReady
            active={step === 3 ? true : false} step={step} setStep={setStep}
         />
      </form>
   )
}
export default ModalNewProject;


const NewProjData = ({setModalActive, active, 
      step, setStep, 
      nameInput, descrInput, projSurveyLink, projLink,
      durationRadio, setDurationRadio,
      firstDate, setFirstDate, lastDate, setLastDate,
   }) => {
   
   const [calendarActive, setCalendarActive] = useState(false);
   const [activeDate, setActiveDate] = useState(null);
   const [errorMessage, setErrorMessage] = useState('');
   const [projAddress, setProjAddress] = useState();

   const {projectDataValidation} = useValidation();
   const modal = useRef();


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

   const toSchedule = () => {
      // const successValid = projectDataValidation(modal.current, nameInput.value, descrInput.value, projAddress, durationRadio, firstDate, lastDate);
      
      // if (successValid === true){
      //    setErrorMessage('');
      //    console.log('всё норм');
      //    setStep(step + 1);
      // } else {
      //    setErrorMessage(successValid);
      // }
      if (firstDate && lastDate){
         setStep(step + 1);
      }
      // setStep(step + 1);
   }

   const errorDiv = errorMessage ? <div className="error-message form__error-message">{errorMessage}</div> : null;
   return (
      <div className={`modal__content modal-new-project__content_first ${active ? 'active' : ''}`} ref={modal}>
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

const NewProjCalendar = ({
      active, step, setStep, 
      popupCopyActive, setPopupCopyActive, 
      firstDate, lastDate, 
      setModalTimeActive,
      setDate, setTime
   }) => {
   return (
      <div className={`modal__content modal-new-project__content_second ${active ? 'active' : ''}`}>
         <div className="modal-new-project__top">
            <div className="modal__back">
               <button className="button-reset modal__back-button" type="button" onClick={() => setStep(step - 1)}>
                  <CalendarArrowSmall/>
               </button>
               <h3 className="modal__title">Создание проекта</h3>
            </div>
            <Button linear onClick={() => setPopupCopyActive(!popupCopyActive)}>Скопировать время из</Button>

            <Popup 
               items={['Кампания Google март 2018', 'Расписание на зиму 2018', 'Excel', 'Google Calendar']}
               popupClass={'modal-new-project__copy-schedule'} 
               popupOpened={popupCopyActive}
               setPopupActive={setPopupCopyActive}
               onClick={[null, null]}
               line={2}
            />
         </div>

         {step === 2 
         ? 
            <CalendarCreateSchedule classes="modal-new-project__schedule" firstDate={firstDate} lastDate={lastDate}
               step={step}
               setModalTimeActive={setModalTimeActive}
               setDate={setDate} setTime={setTime}
            />
         : null}
         

         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={2}/>
            <Button buttonClass="modal__btn modal__ready" onClick={() => setStep(step + 1)}>Готово</Button>
         </div>
      </div>
   )
}

const NewProjReady = ({active, step, setStep}) => {
   
   return (
      <div className={`modal__content modal-new-project__content_third ${active ? 'active' : ''}`}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={() => setStep(step - 1)}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">Создание проекта</h3>
         </div>

         <span className="modal__input-name modal-new-project__project-name">Проект <span>Расписание1</span> успешно создан!</span>
         <button href="#" className="button-reset modal-new-project__project-link">https://book.me/maria/raspisanie1</button>

         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={3}/>
            <Button buttonClass="modal__btn modal__ready">Готово</Button>
         </div>
      </div>
   )
}