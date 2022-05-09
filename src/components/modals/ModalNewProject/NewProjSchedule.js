import { CalendarArrowSmall} from '../../../resources';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import CalendarCreateSchedule from '../../calendar/CalendarCreateSchedule';
import Popup from '../../popup/Popup';


const NewProjSchedule = ({
      step, setStep, 
      popupCopyActive, setPopupCopyActive, 
      firstDate, lastDate, 
      setModalTimeActive,
      setDate,
      selectedDays,
      isProjectEdit
   }) => {

   return (
      <div className={`modal__content modal-new-project__schedule`}>
         <div className="modal-new-project__top">
            <div className="modal__back">
               <button className="button-reset modal__back-button" type="button" onClick={() => setStep(step - 1)}>
                  <CalendarArrowSmall/>
               </button>
               <h3 className="modal__title">{isProjectEdit == true ? 'Редактирование проекта' : 'Создание проекта'}</h3>
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
            <CalendarCreateSchedule classes="modal-new-project__schedule-calendar"
               step={step} firstDate={firstDate} lastDate={lastDate}
               setModalTimeActive={setModalTimeActive}
               setDate={setDate}
               selectedDays={selectedDays}
            />
         : null}
         

         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={2}/>
            <Button buttonClass="modal__btn modal__ready" onClick={() => setStep(step + 1)}>Готово</Button>
         </div>
      </div>
   )
}
export default NewProjSchedule;