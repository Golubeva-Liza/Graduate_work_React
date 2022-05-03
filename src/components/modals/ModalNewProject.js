import './otherModals.scss';
import 'react-dadata/dist/react-dadata.css';

import { useState, useRef} from 'react';

import NewProjData from './ModalNewProject/NewProjData';
import NewProjSchedule from './ModalNewProject/NewProjSchedule';
import NewProjReady from './ModalNewProject/NewProjReady';
import { useInput } from '../../hooks/useInput';


const ModalNewProject = ({setModalActive, setModalTimeActive, setSelectedDate, selectedDays, setSelectedDays}) => {
   const form = useRef();

   const nameInput = useInput('');
   const descrInput = useInput('');
   const addressInput = useInput('');
   const projFormLink = useInput('');
   const projLink = useInput('');
   const [durationRadio, setDurationRadio] = useState(null);
   const durationField = useInput('');

   const [step, setStep] = useState(1);
   const [popupCopyActive, setPopupCopyActive] = useState(false);
   const [firstDate, setFirstDate] = useState(null);
   const [lastDate, setLastDate] = useState(null);

   
   return (
      <form className="modal__form" method="POST" ref={form}>
         {step === 1 ? (
            <NewProjData 
               setModalActive={setModalActive} 
               nameInput={nameInput} 
               descrInput={descrInput} 
               addressInput={addressInput}
               projFormLink={projFormLink} 
               projLink={projLink} 
               durationField={durationField}
               step={step} setStep={setStep}
               durationRadio={durationRadio} setDurationRadio={setDurationRadio}
               firstDate={firstDate} setFirstDate={setFirstDate} 
               lastDate={lastDate} setLastDate={setLastDate}
               setSelectedDays={setSelectedDays}
            />
         ) : false}
         
         {step === 2 ? (
            <NewProjSchedule
               step={step} setStep={setStep}
               popupCopyActive={popupCopyActive} setPopupCopyActive={setPopupCopyActive}
               firstDate={firstDate} lastDate={lastDate}
               setModalTimeActive={setModalTimeActive}
               setDate={setSelectedDate}
               selectedDays={selectedDays}
            />
         ) : false}
         
         {step === 3 ? (
            <NewProjReady
               step={step} setStep={setStep}
               name={nameInput.value}
               descr={descrInput.value}
               address={addressInput.value}
               formLink={projFormLink.value}
               linkForRespond={projLink.value}
               duration={durationRadio}
               selectedDays={selectedDays}
               form={form}
            />
         ) : false}
         
      </form>
   )
}
export default ModalNewProject;