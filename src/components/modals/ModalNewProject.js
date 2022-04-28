import './otherModals.scss';
import 'react-dadata/dist/react-dadata.css';

import { useState, useRef} from 'react';

import NewProjData from './ModalNewProject/NewProjData';
import NewProjSchedule from './ModalNewProject/NewProjSchedule';

import { CalendarArrowSmall } from '../../resources';
import { useInput } from '../../hooks/useInput';
import ProgressBtns from '../progressBtns/ProgressBtns';
import Button from '../button/Button';


const ModalNewProject = ({setModalActive, setModalTimeActive, setSelectedDate, setTime, selectedDays, setSelectedDays}) => {
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
         {step === 1 ? (
            <NewProjData setModalActive={setModalActive} 
               nameInput={nameInput} descrInput={descrInput} addressInput={addressInput}
               projSurveyLink={projSurveyLink} projLink={projLink} 
               step={step} setStep={setStep}
               durationRadio={durationRadio} setDurationRadio={setDurationRadio}
               firstDate={firstDate} setFirstDate={setFirstDate} lastDate={lastDate} setLastDate={setLastDate}
               setSelectedDays={setSelectedDays}
            />
         ) : false}
         
         {step === 2 ? (
            <NewProjSchedule
               step={step} setStep={setStep}
               popupCopyActive={popupCopyActive} setPopupCopyActive={setPopupCopyActive}
               firstDate={firstDate} lastDate={lastDate}
               setModalTimeActive={setModalTimeActive}
               setDate={setSelectedDate} setTime={setTime}
               selectedDays={selectedDays} setSelectedDays={setSelectedDays}
            />
         ) : false}
         
         {step === 3 ? (
            <NewProjReady
               step={step} setStep={setStep}
            />
         ) : false}
         
      </form>
   )
}
export default ModalNewProject;

const NewProjReady = ({step, setStep}) => {
   
   return (
      <div className={`modal__content modal-new-project__ready}`}>
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