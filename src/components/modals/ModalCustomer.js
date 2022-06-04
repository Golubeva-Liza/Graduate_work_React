import './otherModals.scss';
import 'react-dadata/dist/react-dadata.css';

import { useState, useMemo, useEffect } from 'react';
import useValidation from '../../hooks/useValidation';

import ModalFirst from './ModalCustomer/ModalFirst';
import ModalParams from './ModalCustomer/ModalParams';
import ModalSchedule from './ModalCustomer/ModalSchedule';
import { useInput } from '../../hooks/useInput';


const ModalCustomer = ({
      setModalActive,
      project,
      datesList, setDatesList,
      setModalTimeActive,
      setCurrentDate
   }) => {


   const nameInput = useInput('');
   const emailInput = useInput('');
   const phoneInput = useInput('');
   const comment = useInput('');
   const [projAddress, setProjAddress] = useState('');
   const projFormLink = useInput('');
   const [durationRadio, setDurationRadio] = useState(null);
   const durationField = useInput('');

   const [step, setStep] = useState(1);


   // const clearFields = () => {
   //    // console.log(errorMessage);
   //    nameInput.removeValue();
   //    descrInput.removeValue();
   //    projFormLink.removeValue();
   //    setProjAddress('');
   //    setDurationRadio(null);
   //    setCalendarValues(null);
   //    setSelectedDays(null);
   //    setErrorMessage({});
   // }

      //4
   return (
      <form className="modal__form" method="POST">
         {step === 1 ? (
            <ModalFirst 
               step={step} setStep={setStep}
               setModalActive={setModalActive}
               nameInput={nameInput}
               emailInput={emailInput}
               phoneInput={phoneInput}
            />
         ) : false}
         
         {step === 2 ? (
            <ModalParams
               step={step} setStep={setStep}
               comment={comment} project={project}
            />
         ) : false}
         
         {step === 3 ? (
            <ModalSchedule
               step={step} setStep={setStep}
               dates={project.dates}
               datesList={datesList} setDatesList={setDatesList}
               setModalTimeActive={setModalTimeActive}
               setCurrentDate={setCurrentDate}
            />
         ) : false}

         {/* {step === 4 ? (
            <NewProjReady
               step={step} setStep={setStep}

            />
         ) : false} */}
         
      </form>
   )
}
export default ModalCustomer;