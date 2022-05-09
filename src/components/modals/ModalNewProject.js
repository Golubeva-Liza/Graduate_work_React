import './otherModals.scss';
import 'react-dadata/dist/react-dadata.css';

import { useState, useMemo, useEffect } from 'react';

import NewProjData from './ModalNewProject/NewProjData';
import NewProjSchedule from './ModalNewProject/NewProjSchedule';
import NewProjReady from './ModalNewProject/NewProjReady';
import { useInput } from '../../hooks/useInput';


const ModalNewProject = ({
      modalActive, 
      setModalActive, 
      setModalTimeActive, 
      setSelectedDate, 
      selectedDays, setSelectedDays, 
      projects, projectActive, 
      setProjects,
      isProjectEdit, setIsProjectEdit
   }) => {

   const durationValues = useMemo(() => ['15 минут', '30 минут', '45 минут', '60 минут', 'Другое'], []);

   const nameInput = useInput('');
   const descrInput = useInput('');
   const [projAddress, setProjAddress] = useState('');
   const projFormLink = useInput('');
   const projLink = useInput('');
   const [durationRadio, setDurationRadio] = useState(null);
   const durationField = useInput('');

   const [step, setStep] = useState(1);
   const [popupCopyActive, setPopupCopyActive] = useState(false);
   const [calendarValues, setCalendarValues] = useState(null);
   const [errorMessage, setErrorMessage] = useState({});


   const clearFields = () => {
      nameInput.removeValue();
      descrInput.removeValue();
      projFormLink.removeValue();
      setProjAddress('');
      setDurationRadio(null);
      setCalendarValues(null);
      setSelectedDays(null);
      setErrorMessage({});
   }
   
   useEffect(() => {
      if (modalActive == true && isProjectEdit == true){
         const currentProj = projects.find(proj => proj.projectName === projectActive);
         
         nameInput.setValue(currentProj.projectName);
         descrInput.setValue(currentProj.descr);
         projFormLink.setValue(currentProj.linkToForm);
         setProjAddress(currentProj.address);
         setCalendarValues([new Date(currentProj.dates[0].date), new Date(currentProj.dates[currentProj.dates.length-1].date)]);
         setSelectedDays(currentProj.dates);

         if (durationValues.find(el => el === currentProj.duration)){
            setDurationRadio(currentProj.duration);
         } else {
            setDurationRadio('Другое');
            durationField.setValue(currentProj.duration);
         }
      }
      
   }, [modalActive])


   return (
      <form className="modal__form" method="POST">
         {step === 1 ? (
            <NewProjData 
               durationValues={durationValues}
               setModalActive={setModalActive} 
               nameInput={nameInput} 
               descrInput={descrInput} 
               addressInput={projAddress} setAddressInput={setProjAddress}
               projFormLink={projFormLink} 
               projLink={projLink} 
               durationField={durationField}
               step={step} setStep={setStep}
               durationRadio={durationRadio} setDurationRadio={setDurationRadio}
               selectedDays={selectedDays} setSelectedDays={setSelectedDays}
               clearFields={clearFields}
               calendarValues={calendarValues} setCalendarValues={setCalendarValues}
               isProjectEdit={isProjectEdit}
               errorMessage={errorMessage} setErrorMessage={setErrorMessage}
            />
         ) : false}
         
         {step === 2 ? (
            <NewProjSchedule
               step={step} setStep={setStep}
               popupCopyActive={popupCopyActive} setPopupCopyActive={setPopupCopyActive}
               setModalTimeActive={setModalTimeActive}
               setDate={setSelectedDate}
               selectedDays={selectedDays}
               isProjectEdit={isProjectEdit}
            />
         ) : false}
         
         {step === 3 ? (
            <NewProjReady
               setModalActive={setModalActive} 
               step={step} setStep={setStep}
               name={nameInput.value}
               descr={descrInput.value}
               address={projAddress}
               formLink={projFormLink.value}
               linkForRespond={projLink.value}
               duration={durationRadio}
               durationField={durationField.value}
               selectedDays={selectedDays}
               setProjects={setProjects}
               clearFields={clearFields}
               isProjectEdit={isProjectEdit} setIsProjectEdit={setIsProjectEdit}
               activeProjectId={isProjectEdit ? projects.find(el => el.projectName == projectActive).uniqueId : null}
               projects={projects}
            />
         ) : false}
         
      </form>
   )
}
export default ModalNewProject;