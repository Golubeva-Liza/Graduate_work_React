import '../otherModals.scss';

import { useState, useEffect} from 'react';
import useValidation from '../../../hooks/useValidation';
import useAddressValues from '../../../hooks/useAddressValues';

import { CalendarArrowSmall } from '../../../resources';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import InputWithLabel from '../../inputWithLabel/InputWithLabel';
import ErrorMessage from '../../errorMessage/ErrorMessage';



const ModalParams = ({
      step, setStep,
      comment,
      project
   }) => {

   const {errorMessage, setErrorMessage, validation} = useValidation();
   const {hostUrl} = useAddressValues();

   return (
      <div className={`modal__content modal-customer__params`}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={() => setStep(step - 1)}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">Основные параметры</h3>
         </div>

         <InputWithLabel labelClass="modal__label" labelTitle={project.projectName}>
            <p className='modal-customer__info'>{project.descr}</p>
         </InputWithLabel>

         <InputWithLabel labelClass="modal__label" labelTitle="Комментарий">
            <textarea 
               className="input input_textarea modal-customer__comment" 
               type="text" 
               name="comment" 
               autoComplete="off"
               placeholder="Ваш комментарий к проекту" 
               value={comment.value} 
               onChange={comment.onChange} 
               onBlur={e => validation(e)}
            ></textarea>
            {errorMessage.comment ? <ErrorMessage message={errorMessage.comment}/> : null}
         </InputWithLabel>

         <InputWithLabel labelClass="modal__label" labelTitle="Ссылка для приглашения респондентов">
            <p className='modal-customer__info'>{`${hostUrl}${project.linkForRespond}`}</p>
         </InputWithLabel>

         <InputWithLabel labelClass="modal__label" labelTitle="Длительность тестирования">
            <p className='modal-customer__info'>{`${project.duration} минут`}</p>
         </InputWithLabel>

         <InputWithLabel labelClass="modal__label" labelTitle="Период тестирования">
            <p className='modal-customer__info'>
               {`С ${project.dates[0].date.split('-').reverse().join('.')} 
               по ${project.dates[project.dates.length-1].date.split('-').reverse().join('.')}`}
            </p>
         </InputWithLabel>
         
         <div className="modal__btns modal__steps">
            <ProgressBtns steps={4} activeStep={2}/>
            <Button 
               buttonClass="modal__btn modal__ready" 
               onClick={() => setStep(step + 1)}
               disabled={Object.keys(errorMessage).length == 0 ? false : true}
            >
               Выбор времени
            </Button>
         </div>
      </div>
   )
}
export default ModalParams;