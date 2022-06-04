import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useBookmeService from '../services/BookmeService';

import Button from '../components/button/Button';
import Modal from '../components/modals/Modal';
import ModalCustomer from '../components/modals/ModalCustomer';
import ModalSetTime from '../components/modals/ModalSetTime';


const ClientPage = () => {
   const {projectHash} = useParams();
   const {universalRequest} = useBookmeService();

   const [project, setProject] = useState(null);
   const [datesList, setDatesList] = useState([]);
   const [currentDate, setCurrentDate] = useState(null);

   useEffect(() => {
      universalRequest('getProjectSchedule', `schedule/${projectHash}`).then(onProjectLoaded);
   }, [projectHash])


   const onProjectLoaded = (res) => {
      console.log(res);
      if (!res.error){
         setProject(res);
      }
   }

   const [modalActive, setModalActive] = useState(false);
   const [modalTimeActive, setModalTimeActive] = useState(false);
   
   return (
      <>
         <section className="customer-greeting">
            <div className="my-container">
               <h1 className="customer-greeting__title">Добро пожаловать в BookMe!</h1>
               <p className="customer-greeting__descr">Вас пригласили к созданию совместного расписания</p>
               <p className="customer-greeting__text">
                  Вам будут представлены существующие настройки и расписание модератора Юзабилити-лаборатории.
                  <br/><br/>
                  Вы можете добавить удобное Вам время, после чего система сгенерирует общее расписание с совпадающими днями и отправит Вам его на почту.
               </p>
               <Button buttonClass="customer-greeting__btn" onClick={() => setModalActive(true)}>Начать</Button>
            </div>
         </section>

         {project ? (
            <>
               <Modal modalClass={'modal-customer'} active={modalActive} setActive={setModalActive}>
                  <ModalCustomer 
                     setModalActive={setModalActive} 
                     project={project}
                     datesList={datesList} setDatesList={setDatesList}
                     setModalTimeActive={setModalTimeActive}
                     setCurrentDate={setCurrentDate}
                  />
               </Modal>
               <Modal modalClass={'modal-set-time'} active={modalTimeActive} setActive={setModalTimeActive}>
                  <ModalSetTime 
                     setModalActive={setModalTimeActive} 
                     date={currentDate} setDate={setCurrentDate}
                     selectedDays={datesList} setSelectedDays={setDatesList}
                  />
               </Modal>
            </>
         ) : null}
      </>
   )
}
export default ClientPage;