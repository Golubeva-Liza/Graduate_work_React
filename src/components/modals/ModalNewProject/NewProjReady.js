import '../otherModals.scss';

import { useState, useEffect} from 'react';
import useBookmeService from '../../../services/BookmeService';

import { CalendarArrowSmall } from '../../../resources';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import Loader from '../../loader/Loader';

const NewProjReady = ({
      setModalActive, 
      step, setStep, 
      name, 
      descr, 
      address, 
      formLink, 
      duration, 
      durationField, 
      selectedDays, 
      setProjects,
      clearFields,
      isProjectEdit,
      activeProjectId,
      projects
   }) => {
   
   const {universalRequest, loading, setLoading} = useBookmeService();
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);

      const obj = {
         projectName: name, 
         descr,
         address,
         linkToForm: formLink,
         linkForRespond: 'projects/',
         linkForCustomer: '',
         duration: duration == 'Другое' ? durationField : duration,
         dates: selectedDays,
         isProjectEdit,
         uniqueId: activeProjectId
      };

      universalRequest('addProject', JSON.stringify(obj)).then((res) => onProjectLoaded(res, obj));
   }, [])

   const onProjectLoaded = (res, newProject) => {
      if (res !== 'error'){
         delete newProject[isProjectEdit];
         newProject['linkForRespond'] += res;

         if (isProjectEdit){
            console.log(newProject);
            const projectIndex = projects.findIndex(el => el.uniqueId == newProject.uniqueId);
            const updatedProjects = [...projects.slice(0, projectIndex), newProject, ...projects.slice(projectIndex + 1)];
            setProjects(updatedProjects);
         } else {
            newProject['uniqueId'] = res;
            setProjects(projects => [...projects, newProject]);
         }
        
         setLoading(false);
      }
   }

   const closeModal = () => {
      setModalActive(false);
      setStep(1);
      clearFields();
   }

   return (
      <div className={`modal__content modal-new-project__ready}`}>
         {error ? (
            <div className="modal__back">
               <button className="button-reset modal__back-button" type="button" onClick={() => setStep(step - 1)}>
                  <CalendarArrowSmall/>
               </button>
               <h3 className="modal__title">{isProjectEdit == true ? 'Редактирование проекта' : 'Создание проекта'}</h3>
            </div>
         ) : null}
         
         {loading ? <Loader classes="modal-new-project__loader"/> : (
            <>
               <span className="modal__input-name modal-new-project__project-name">
                  Проект <span>{name}</span> успешно {isProjectEdit == true ? 'перезаписан' : 'создан'}!
               </span>
               <button className="button-reset modal-new-project__project-link">
                  {projects.find(el => el.projectName == name).linkForRespond}
               </button>
            </>
         )}

         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={3}/>
            <Button buttonClass="modal__btn modal__ready" onClick={closeModal}>Готово</Button>
         </div>
      </div>
   )
}
export default NewProjReady;