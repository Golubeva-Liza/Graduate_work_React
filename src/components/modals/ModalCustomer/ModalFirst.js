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
import InputWithLabel from '../../inputWithLabel/InputWithLabel';
import Input from '../../input/Input';
import InputMask from 'react-input-mask';
import Loader from '../../loader/Loader';
import ErrorMessage from '../../errorMessage/ErrorMessage';



const ModalFirst = ({
      setModalActive,
      step, setStep,
      nameInput,
      emailInput,
      phoneInput
   }) => {
   
   const {universalRequest, loading, setLoading} = useBookmeService();
   const {errorMessage, setErrorMessage, validation} = useValidation();
   const {hostUrl} = useAddressValues();

   const [error, setError] = useState(null);
   const {isFetchError} = useFetchError();



   return (
      <div className={`modal__content modal-customer__first`}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={() => setModalActive(false)}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">Создание календаря</h3>
         </div>

         <InputWithLabel labelClass="modal__label" labelTitle="ФИО">
            <Input 
               inputType="text" 
               inputName="name" 
               inputText="Введите ФИО" 
               value={nameInput.value} 
               onChange={nameInput.onChange} 
               onBlur={e => validation(e)}
            />
            {errorMessage.name ? <ErrorMessage message={errorMessage.name}/> : null}
         </InputWithLabel>

         <InputWithLabel labelClass="modal__label" labelTitle="Почта">
            <Input 
               inputType="text" 
               inputName="email" 
               inputText="Введите почту" 
               value={emailInput.value} 
               onChange={emailInput.onChange} 
               onBlur={e => validation(e)}
            />
            {errorMessage.email ? <ErrorMessage message={errorMessage.email}/> : null}
         </InputWithLabel>

         <InputWithLabel labelClass="modal__label" labelTitle="Телефон">
            <InputMask mask="+7 (999) 999-99-99" value={phoneInput.value} onChange={phoneInput.onChange} onBlur={e => validation(e)}>
               <Input inputType="tel" inputName="phone" inputText="Введите номер телефона"/>
            </InputMask>
            {errorMessage.phone ? <ErrorMessage message={errorMessage.phone}/> : null}
         </InputWithLabel>
         
         <div className="modal__btns modal__steps">
            <ProgressBtns steps={4} activeStep={1}/>
            <Button 
               buttonClass="modal__btn modal__ready" 
               onClick={() => setStep(step + 1)}
               disabled={
                  nameInput.value !== '' 
                  && emailInput.value !== '' 
                  && phoneInput.value !== '' 
                  && Object.keys(errorMessage).length == 0
                  ? false : true}
            >
               Приступить
            </Button>
         </div>
      </div>
   )
}
export default ModalFirst;