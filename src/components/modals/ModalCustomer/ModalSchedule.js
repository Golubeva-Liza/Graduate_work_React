import '../otherModals.scss';

import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useBookmeService from '../../../services/BookmeService';
import useAddressValues from '../../../hooks/useAddressValues';
import useValidation from '../../../hooks/useValidation';
import useFetchError from '../../../hooks/useFetchError';

import { CalendarArrowSmall } from '../../../resources';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import CalendarCustomer from '../../calendar/CalendarCustomer';
import InputWithLabel from '../../inputWithLabel/InputWithLabel';
import Input from '../../input/Input';
import InputMask from 'react-input-mask';
import Loader from '../../loader/Loader';
import getIntervals from '../../../hooks/getIntervals';
import ErrorMessage from '../../errorMessage/ErrorMessage';



const ModalSchedule = ({
      step, setStep,
      dates,
      datesList, setDatesList,
      setModalTimeActive,
      setCurrentDate
   }) => {

   const {errorMessage, setErrorMessage, validation} = useValidation();

   return (
      <div className={`modal__content modal-customer__schedule`}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={() => setStep(step - 1)}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">Создание расписания</h3>
         </div>

         <CalendarCustomer 
            classes={'modal-customer__calendar'} 
            dates={dates}
            datesList={datesList} setDatesList={setDatesList}
            setModalTimeActive={setModalTimeActive}
            setDate={setCurrentDate}
         />
         
         <div className="modal__btns modal__steps">
            <ProgressBtns steps={4} activeStep={3}/>
            <Button 
               buttonClass="modal__btn modal__ready" 
               onClick={() => setStep(step + 1)}
            >
               Далее
            </Button>
         </div>
      </div>
   )
}
export default ModalSchedule;