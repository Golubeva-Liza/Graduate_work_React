import { useState, useEffect } from 'react';
import useBookmeService from '../services/BookmeService';
import useFetchError from '../hooks/useFetchError';

import RespondDbSettings from '../components/respondDbSettings/RespondDbSettings';
import RespondDb from '../components/respondDb/RespondDb';
import Modal from '../components/modals/Modal';
import ModalAddEditRespond from '../components/modals/ModalAddEditRespond';
import ModalDelete from '../components/modals/ModalDelete';


const RespondDBPage = () => {
   const {loading, setLoading, universalRequest} = useBookmeService();
   const {isFetchError} = useFetchError();

   const [modalRespondActive, setModalRespondActive] = useState(false);
   const [modalDeleteActive, setModalDeleteActive] = useState(false);

   const [respondents, setRespondents] = useState([]);
   const [activeRespond, setActiveRespond] = useState(null);// индекс в массиве respondents
   const [removedRespond, setRemovedRespond] = useState(null); // индекс в массиве respondents
   const [editRespond, setEditRespond] = useState(null);
   const [filteredResponds, setFilteredResponds] = useState([]);

   const [popupActive, setPopupActive] = useState(false); 
   const [resultsFound, setResultsFound] = useState(true);
   const [citiesValues, setCitiesValues] = useState([]);
   const [tagsValues, setTagsValues] = useState([]);


   //загрузка респондентов
   useEffect(() => {
      loadRespondents();
   }, []);

   const loadRespondents = async () => {
      const obj = {
         "user": localStorage.getItem('userKey'),
         "key": localStorage.getItem('authKey')
      };

      universalRequest('getAllRespondents', JSON.stringify(obj)).then((res) => {
         const isError = isFetchError(res);
         if (!isError){
            setRespondents(res);
            setLoading(false);
         }else{
            console.log(res);
         }
      });
   }

   //обновляем список городов и тэгов после обновления респондентов
   useEffect(() => {
      if (respondents.length){
         
         let citiesElements = [...new Set(respondents.map(item => item.homecity))]; //убираем повторяющиеся элементы
         citiesElements = citiesElements.filter(item => item !== '-'); //убираем '-'
         citiesElements.unshift('Не важно');
         setCitiesValues(citiesElements);

         let tagsElements = respondents.map(item => item.tags).join(', ').split(', '); //преобразуем все тэги в массив
         tagsElements = [...new Set(tagsElements.filter(item => item !== '-'))]; //избавляемся от дубликатов и '-'
         setTagsValues(tagsElements);
      }
   }, [respondents]);


   //удаление респондента
   useEffect(() => {
      if (removedRespond || removedRespond === 0){
         // console.log(respondents[removedRespond].id);
         const obj = {
            "user": localStorage.getItem('userKey'),
            "key": localStorage.getItem('authKey'),
            "respondId": respondents[removedRespond].id
         };
         setRemovedRespond(null);
         setActiveRespond(null);
         setModalDeleteActive(false);

         universalRequest('removeRespondent', JSON.stringify(obj))
            .then(onRespondentRemoved);
      }
   }, [removedRespond])

   const onRespondentRemoved = (res) => {
      const isError = isFetchError(res);

      if (!isError){
         const updateResponds = [...respondents.slice(0, removedRespond), ...respondents.slice(removedRespond + 1)];
         setRespondents(updateResponds);
         setPopupActive(false);
         setLoading(false);
      } else {
         console.log(res);
      }
   }
   

   return (
      <>
         <RespondDbSettings 
            respondents={respondents} 
            filteredResponds={filteredResponds} setFilteredResponds={setFilteredResponds}
            setResultsFound={setResultsFound}
            citiesValues={citiesValues} tagsValues={tagsValues}
            loading={loading}
         />
         <RespondDb 
            activeRespond={activeRespond} setActiveRespond={setActiveRespond}
            popupActive={popupActive} setPopupActive={setPopupActive}
            setModalActive={setModalRespondActive} 
            setModalDeleteActive={setModalDeleteActive}
            respondents={respondents} setRespondents={setRespondents}
            setEditRespond={setEditRespond} 
            filteredResponds={filteredResponds} 
            resultsFound={resultsFound}
            loading={loading}
         />
         <Modal modalClass={'modal_respond'} active={modalRespondActive} setActive={setModalRespondActive}>
            <ModalAddEditRespond
               setModalActive={setModalRespondActive} 
               respondents={respondents} setRespondents={setRespondents}
               editRespond={editRespond} setEditRespond={setEditRespond}
            />
         </Modal>
         <Modal modalClass={'modal-delete'} active={modalDeleteActive} setActive={setModalDeleteActive}>
            <ModalDelete 
               setModalActive={setModalDeleteActive} 
               removal={'респондента'}
               whatDelete={activeRespond ? respondents[activeRespond].name : null}
               info={'и его/её записи на тестирования'}
               deleteSubmit={() => setRemovedRespond(activeRespond)}
            />
         </Modal>
      </>
   )
}
export default RespondDBPage;