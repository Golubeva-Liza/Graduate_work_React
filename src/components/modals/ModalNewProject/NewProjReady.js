import '../otherModals.scss';

import { useState, useEffect} from 'react';
import useBookmeService from '../../../services/BookmeService';

import { CalendarArrowSmall } from '../../../resources';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import Loader from '../../loader/Loader';

const NewProjReady = ({step, setStep, name, descr, address, formLink, linkForRespond, duration, selectedDays, form}) => {
   
   const {universalRequest, loading, setLoading} = useBookmeService();
   const [error, setError] = useState(null);

   useEffect(() => {
      const obj = {
         projName: name, 
         descr,
         address,
         formLink,
         duration,
         selectedDays
      };
      
      universalRequest('addProject', JSON.stringify(obj)).then(onProjectLoaded);
      // console.log(name, descr, address, formLink, linkForRespond, duration, selectedDays);
      //ссылка для респондентов, ссылка для заказчиков
   }, [])

   const onProjectLoaded = (res) => {
      console.log(res);
      setLoading(false);
   }

   return (
      <div className={`modal__content modal-new-project__ready}`}>
         <div className="modal__back">
            <button className="button-reset modal__back-button" type="button" onClick={() => setStep(step - 1)}>
               <CalendarArrowSmall/>
            </button>
            <h3 className="modal__title">Создание проекта</h3>
         </div>

         {loading ? <Loader classes="modal-new-project__loader"/> : null}
         
         {/* <span className="modal__input-name modal-new-project__project-name">Проект <span>Расписание1</span> успешно создан!</span>
         <button href="#" className="button-reset modal-new-project__project-link">https://book.me/maria/raspisanie1</button> */}

         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={3}/>
            <Button buttonClass="modal__btn modal__ready">Готово</Button>
         </div>
      </div>
   )
}
export default NewProjReady;