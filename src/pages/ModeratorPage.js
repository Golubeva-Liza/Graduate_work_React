import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import HeaderSide from '../components/headerSide/HeaderSide';
import RespondDbSettings from '../components/respondDbSettings/RespondDbSettings';
import RespondDb from '../components/respondDb/RespondDb';
import Modal from '../components/modals/Modal';
import ModalAddRespond from '../components/modals/ModalAddRespond';
import ModalEditRespond from '../components/modals/ModalEditRespond';
import useBookmeService from '../services/BookmeService';


const ModeratorPage = () => {
   let navigate = useNavigate();
   const {loading, setLoading, getAllRespondents, getLoggedUser} = useBookmeService();
   const [user, setUser] = useState('');

   useEffect(() => {
      if (!localStorage.getItem('authorized')){
         navigate('/');
      }else{
         getLoggedUser(localStorage.getItem('authorized'))
            .then(res => {
               setUser(res[0]);
            })
      }
   }, []);

   const [modalAddActive, setModalAddActive] = useState(false);
   const [modalEditActive, setModalEditActive] = useState(false);
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
      getAllRespondents().then(onRespondentsLoaded);
   }

   const onRespondentsLoaded = (res) => {
      setRespondents(res);
      setLoading(false);
   }

   useEffect(() => {
      if (respondents.length){
         // setFilteredResponds(respondents);

         //обновляем список городов
         let citiesElements = [...new Set(respondents.map(item => item[8]))]; //убираем повторяющиеся элементы
         citiesElements = citiesElements.filter(item => item !== '-'); //убираем '-'
         citiesElements.unshift('Не важно');
         setCitiesValues(citiesElements);

         //обновляем список тэгов
         let tagsElements = respondents.map(item => item[10]).join(', ').split(', '); //преобразуем все тэги в массив
         tagsElements = [...new Set(tagsElements.filter(item => item !== '-'))]; //избавляемся от дубликатов и '-'
         setTagsValues(tagsElements);
      }
   }, [respondents]);

   
   return (
      <>
         <div className='wrapper'>
            <HeaderSide user={user}/>
            <RespondDbSettings 
               respondents={respondents} 
               filteredResponds={filteredResponds} setFilteredResponds={setFilteredResponds}
               setResultsFound={setResultsFound}
               citiesValues={citiesValues} tagsValues={tagsValues}
            />
            <RespondDb 
               setAddModalActive={setModalAddActive} 
               setEditModalActive={setModalEditActive} 
               respondents={respondents} setRespondents={setRespondents}
               setEditRespond={setEditRespond} 
               filteredResponds={filteredResponds} 
               resultsFound={resultsFound}
               loading={loading}
            />
         </div>
         <Modal modalClass={'modal_respond'} active={modalAddActive} setActive={setModalAddActive}>
            <ModalAddRespond 
               setModalActive={setModalAddActive} 
               respondents={respondents} setRespondents={setRespondents} 
            />
         </Modal>
         <Modal modalClass={'modal_respond'} active={modalEditActive} setActive={setModalEditActive}>
            <ModalEditRespond 
               setModalActive={setModalEditActive} 
               respondents={respondents} setRespondents={setRespondents}
               editRespond={editRespond}
            />
         </Modal>
      </>
   )
}
export default ModeratorPage;