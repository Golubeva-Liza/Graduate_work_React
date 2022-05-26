import { useState, useEffect } from 'react';
import useBookmeService from '../services/BookmeService';
import useFetchError from '../hooks/useFetchError';

import RespondDbSettings from '../components/respondDbSettings/RespondDbSettings';
import RespondDb from '../components/respondDb/RespondDb';
import Modal from '../components/modals/Modal';
import ModalAddEditRespond from '../components/modals/ModalAddEditRespond';



const RespondDBPage = () => {
   const {loading, setLoading, universalRequest} = useBookmeService();
   const {isFetchError} = useFetchError();

   const [modalRespondActive, setModalRespondActive] = useState(false);
   const [respondents, setRespondents] = useState([]);
   const [editRespond, setEditRespond] = useState(null);
   const [filteredResponds, setFilteredResponds] = useState([]);
   const [resultsFound, setResultsFound] = useState(true);
   const [citiesValues, setCitiesValues] = useState([]);
   const [tagsValues, setTagsValues] = useState([]);

   useEffect(() => {
      loadRespondents();
   }, []);

   const loadRespondents = async () => {
      const obj = {
         "user": sessionStorage.getItem('userKey'),
         "key": sessionStorage.getItem('authKey')
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

   useEffect(() => {
      if (respondents.length){
         //обновляем список городов
         let citiesElements = [...new Set(respondents.map(item => item.homecity))]; //убираем повторяющиеся элементы
         citiesElements = citiesElements.filter(item => item !== '-'); //убираем '-'
         citiesElements.unshift('Не важно');
         setCitiesValues(citiesElements);

         //обновляем список тэгов
         let tagsElements = respondents.map(item => item.tags).join(', ').split(', '); //преобразуем все тэги в массив
         tagsElements = [...new Set(tagsElements.filter(item => item !== '-'))]; //избавляемся от дубликатов и '-'
         setTagsValues(tagsElements);
      }
   }, [respondents]);

   
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
            setModalActive={setModalRespondActive} 
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
      </>
   )
}
export default RespondDBPage;