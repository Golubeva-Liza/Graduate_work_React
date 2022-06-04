import '../otherModals.scss';

import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useBookmeService from '../../../services/BookmeService';
import useAddressValues from '../../../hooks/useAddressValues';

import { CalendarArrowSmall } from '../../../resources';
import ProgressBtns from '../../progressBtns/ProgressBtns';
import Button from '../../button/Button';
import Loader from '../../loader/Loader';
import getIntervals from '../../../hooks/getIntervals';
import useFetchError from '../../../hooks/useFetchError';


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
      projectActive,
      projects
   }) => {
   
   const {universalRequest, loading, setLoading} = useBookmeService();
   const {hostUrl} = useAddressValues();
   const [error, setError] = useState(null);
   const {isFetchError} = useFetchError();


   useEffect(() => {
      setLoading(true);
      
      //сортировка дат по возрастанию
      const dates = JSON.parse(JSON.stringify(selectedDays)); //глубокая копия массива
      dates.sort(function(a, b) {
         return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      const projObj = {
         projectName: name, 
         descr,
         address,
         linkToForm: formLink,
         duration: duration == 'Другое' ? durationField : duration.replace(/[^0-9]/g,""),
         dates: dates,
         projId: isProjectEdit ? projectActive.projId : null,
      };

      const obj = {
         ...projObj, 
         isProjectEdit,
         user: localStorage.getItem('userKey'),
         key: localStorage.getItem('authKey')
      };
      // console.log(projObj);
      universalRequest('addProject', JSON.stringify(obj)).then((res) => onProjectLoaded(res, projObj));
   }, [])

   const onProjectLoaded = (res, newProject) => {
      const isError = isFetchError(res);

      if (!isError && res.projId){

         if (isProjectEdit){
            const project = projects.find(el => el.projId == newProject.projId);
            //переносим статичные данные
            newProject['linkForRespond'] = project.linkForRespond;
            newProject['linkForCustomer'] = project.linkForCustomer;
            newProject['entriesInfo'] = project.entriesInfo;

            const projectIndex = projects.findIndex(el => el.projId == newProject.projId);
            const updatedProjects = [...projects.slice(0, projectIndex), newProject, ...projects.slice(projectIndex + 1)];
            setProjects(updatedProjects);

         } else {
            newProject['linkForRespond'] = res.linkForRespond;
            newProject['linkForCustomer'] = res.linkForCustomer;
            newProject['entriesInfo'] = [];
            newProject['projId'] = res.projId;
            setProjects(projects => [...projects, newProject]);
         }
        
         setLoading(false);

      }else{
         console.log(res);
      }
   }

   const closeModal = () => {
      setModalActive(false);
      setStep(1);
      clearFields();
   }


   const thisProject = projects.find(el => el.projectName == name);
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
         
         {loading
            ? <Loader classes="modal-new-project__loader"/> 
            : projects.find(el => el.projectName == name) ? (
               <div style={{'marginBottom': '48px'}}>
                  <span className="modal__input-name modal-new-project__project-name">
                     Проект <span>{name}</span> успешно {isProjectEdit == true ? 'перезаписан' : 'создан'}!
                  </span>
      
                  <span className="modal-new-project__project-link">
                     Ссылка для респондентов:
                     <a rel="noreferrer" target="_blank" href={`${hostUrl}${thisProject.linkForRespond}`}>{hostUrl}{thisProject.linkForRespond}</a>
                  </span>
      
                  <span className="modal-new-project__project-link">
                     Ссылка для заказчиков:
                     <a rel="noreferrer" target="_blank" href={`${hostUrl}${thisProject.linkForCustomer}`}>{hostUrl}{thisProject.linkForCustomer}</a>
                  </span>
               </div>
            ) : null
         }


         <div className="modal__btns modal__steps">
            <ProgressBtns steps={2} activeStep={3}/>
            <Button buttonClass="modal__btn modal__ready" onClick={closeModal}>Готово</Button>
         </div>
      </div>
   )
}
export default NewProjReady;