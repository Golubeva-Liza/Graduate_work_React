import { useState, useRef, useEffect, useMemo } from 'react';

import RespondDbPopup from '../popup/RespondDbPopup';
import Popup from '../popup/Popup';
import { Dots } from '../../resources';
import './respondDb.scss';
import useBookmeService from '../../services/BookmeService';


const RespondDb = ({setAddModalActive, setEditModalActive, respondents, setRespondents, setEditRespond, filteredResponds, resultsFound, loading}) => {
   
   const [popupActive, setPopupActive] = useState(false);

   const [activeRespond, setActiveRespond] = useState(null);
   const [removedRespond, setRemovedRespond] = useState(null);
   

   const [rowNum, setRowNum] = useState(0);
   const dotBtns = useRef([]); 
   const popup = useRef(); 

   const {removeRespondent} = useBookmeService();


   useEffect(() => {
      if (removedRespond || removedRespond === 0){
         // console.log(`хотим удалить респондента ${respondents[removedRespond]}`);
         const respondId = respondents[removedRespond][1];
         removeRespondent(respondId)
            .then(onRespondentRemoved);
         
      }
   }, [removedRespond])

   const onRespondentRemoved = (res) => {
      const updateResponds = [...respondents.slice(0, removedRespond), ...respondents.slice(removedRespond + 1)];
      setRespondents(updateResponds);
      setPopupActive(false);
   }


   const toggleSettings = (e) => {
      if (popupActive === false){//старое значение перед открытием
         document.addEventListener('click', closePopup);
      }
      if (popupActive == true && e.target != dotBtns.current[rowNum]){
         console.log('нажали не на ту, которая открыла popup');
         setPopupActive(true);
      }else{
         setPopupActive(!popupActive);
      }
      
      let btnNum = dotBtns.current.findIndex(item => item == e.target);

      //ищем респондента, к которому относилась кнопка (3 точки), предполагая, что не будет двух респондентов с одинаковым именем и телефоном
      const name = e.target.closest('tr').childNodes[1].innerHTML;
      const phone = e.target.closest('tr').childNodes[7].innerHTML.replace(/[^0-9]/g,"");
      const repondNum = respondents.findIndex(el => el[2] == name && el[4] == phone);
      // console.log(respondents, repondNum, phone);

      setRowNum(btnNum);
      setActiveRespond(repondNum);
   }

   const closePopup = (e) => {
      if(popup.current && !popup.current.contains(e.target) && !e.target.classList.contains('more-functions')){
         setPopupActive(false);
         document.removeEventListener('click', closePopup);
      }
   }
   

   function renderRespondList(arr) {
      console.log('рендер респондентов');
      if (arr.length > 0){
         const elements = arr.map((value, index) => {
            const userPhone = value[4].replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 $3 $4 $5');
   
            return (
               <tr key={value[1]}>
                  <td>
                     <label className="checkbox respondents-list__label">
                        <input className="checkbox__input" name="respondent" type="checkbox"/>
                        <div className="checkbox__check"></div>
                     </label>
                  </td>
                  <td>{value[2]}</td>
                  <td>{value[5]}</td>
                  <td>{value[6]}</td>
                  <td>{value[7]}</td>
                  <td>{value[8]}</td>
                  <td>{value[9]}</td>
                  <td>{userPhone}</td>
                  <td>{value[10]}</td>
                  <td>
                     <button className="button-reset more-functions" onClick={toggleSettings} ref={el => dotBtns.current[index] = el}>
                        <Dots/>
                     </button>
                  </td>
               </tr>
            )
   
         });
         return elements;
      }
   }

   const respondItems = useMemo(() => renderRespondList(filteredResponds), [filteredResponds]);   
   const loader = loading ? <div className="respondDb__loader"><div className="loader"></div></div> : null;
   // const loader = loading;
   return (
      <main className="respondDb">
         <div className="respondDb__table-container">
            {/* modal-closed */}
            <RespondDbPopup link={popup} popupClass={`respondDb__respondent-options`} 
               popupOpened={popupActive} rowNum={rowNum} 
               activeRespond={activeRespond}
               setRemovedRespond={setRemovedRespond}
               setEditModalActive={setEditModalActive}
               setEditRespond={setEditRespond}
               setPopupActive={setPopupActive}
            />
            <table className="respondents-list">
               <thead>
                  <tr>
                     <th>
                        <label className="checkbox respondents-list__label">
                           <input className="checkbox__input" name="all" type="checkbox"/>
                           <div className="checkbox__check"></div>
                        </label>
                     </th>
                     <th>ФИО</th>
                     <th>Пол</th>
                     <th>Возраст</th>
                     <th>Образование</th>
                     <th>Место жительства</th>
                     <th>Семейное положение</th>
                     <th>Телефон</th>
                     <th>Тэги</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {respondItems}
               </tbody>
            </table>
         </div>

         <div className={`respondDb__message ${resultsFound ? '' : 'show'}`}>
            Таких респондентов нет в базе данных :(
         </div>
         
         {loader}

         <div className="respondDb__btns">
            <button className="button" disabled>Пригласить респондентов в проект</button>
            <button className="button respondDb__add-btn" onClick={() => setAddModalActive(true)} >Добавить респондента</button>
            {/* <Popup 
               items={['Добавить одного респондента', 'Импорт из Excel']}
               popupClass={`respondDb__btns-popup`} 
               popupOpened={popupActive}
            /> */}
            {/* <div className="popup respondDb__btns-popup" data-popup-target="add-respond">
               <ul className="popup__list">
                  <li className="popup__item">
                     <button className="button-reset" data-modal-btn="add-respond">Добавить одного респондента</button>
                  </li>
                  <li className="popup__item">
                     <button className="button-reset" data-modal-btn="add-file">Импорт из Excel</button>
                  </li>
               </ul>
            </div> */}
         </div>
      </main>
   )
}
export default RespondDb;