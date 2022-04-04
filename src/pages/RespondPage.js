import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import useBookmeService from '../services/BookmeService';

import HeaderTop from '../components/headerTop/HeaderTop';
import AboutProjectsAside from '../components/aboutProjectsAside/AboutProjectsAside';
import RespondendCalendar from '../components/respondentCalendar/RespondentCalendar';
import RespondendSettings from '../components/respondendSettings/RespondendSettings';

import Modal from '../components/modals/Modal';


const RespondPage = () => {
   let navigate = useNavigate();
   const {getLoggedUser} = useBookmeService();

   // useEffect(() => {
   //    if (!localStorage.getItem('authorized')){
   //       navigate('/');
   //    }else{
   //       navigate('/');
   //    }
   // }, []);


   return (
      <> 
         <HeaderTop/>

         <main className="respondent-main">
            <div className="my-container">
               <AboutProjectsAside/>
               <RespondendCalendar/>
               <RespondendSettings/>
            </div>
         </main>
         {/* <Modal modalClass={'modal-new-project'} active={modalProjectActive} setActive={setModalProjectActive}>
            <ModalNewProject setModalActive={setModalProjectActive}/>
         </Modal> */}
      </>
   )
}
export default RespondPage;