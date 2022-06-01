import './respondDb.scss';

import { useState, useRef, useEffect, useMemo } from 'react';
import useBookmeService from '../../services/BookmeService';

import RespondDbPopup from '../popup/RespondDbPopup';
import Popup from '../popup/Popup';
import { Dots } from '../../resources';
import Loader from '../loader/Loader';



const RespondDb = ({
      activeRespond, setActiveRespond,
      popupActive, setPopupActive,
      setModalActive, 
      setModalDeleteActive,
      respondents, setRespondents, 
      setEditRespond, 
      filteredResponds, 
      resultsFound, 
      loading
   }) => {

   
   const [rowNum, setRowNum] = useState(0);
   const [isLow, setIsLow] = useState(false);

   const dotBtns = useRef([]); 
   const respondList = useRef([]); 
   const popup = useRef(); 
   const table = useRef(); 


   const toggleSettings = (e) => {
      const currentItem = respondList.current.find(el => el == e.target.closest('.table__row'));
      setRowNum(currentItem.getBoundingClientRect().y);

      dotBtns.current.forEach(item => item ? item.classList.remove('active') : null);//у всех кнопок удалить класс активности
      dotBtns.current.find(item => item == e.target).classList.add('active');//поставить активность на текущую кнопку

      //если модальное окно всплывает очень низко и респондентов больше 11ти
      if (table.current.getBoundingClientRect().bottom - currentItem.getBoundingClientRect().bottom < 140 && filteredResponds.length > 11){
         setIsLow(true);
      } else{
         setIsLow(false);
      }
      
      if (popupActive === false){//старое значение перед открытием
         document.addEventListener('click', closePopup);
         table.current.addEventListener('scroll', closePopupFromScroll);
         setPopupActive(true);
      }

      const name = currentItem.childNodes[1].innerHTML;
      const phone = currentItem.childNodes[7].innerHTML.replace(/[^0-9]/g,"");
      const respondNum = respondents.findIndex(el => el.name == name && el.phone == phone);
      setActiveRespond(respondNum);
   }

   const closePopup = (e) => {
      if(popup.current && !popup.current.contains(e.target) && !e.target.classList.contains('more-functions')){
         setPopupActive(false);
         document.removeEventListener('click', closePopup);
         dotBtns.current.forEach(item => item ? item.classList.remove('active') : null);
      }
   }
   const closePopupFromScroll = (e) => {
      setPopupActive(false);
      table.current.removeEventListener('scroll', closePopupFromScroll);
      dotBtns.current.forEach(item => item ? item.classList.remove('active') : null);
   }
   

   function renderRespondList(arr) {
      // console.log('рендер респондентов');
      if (arr.length > 0){
         const elements = arr.map((value, index) => {
            const userPhone = value.phone.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 $3 $4 $5');
   
            return (
               <div className="table__row" key={value.id} ref={el => respondList.current[index] = el}>
                  <div>
                     <label className="checkbox">
                        <input className="checkbox__input" name="respondent" type="checkbox"/>
                        <div className="checkbox__check"></div>
                     </label>
                  </div>
                  <div>{value.name}</div>
                  <div>{value.gender}</div>
                  <div>{value.age}</div>
                  <div>{value.education}</div>
                  <div>{value.homecity}</div>
                  <div>{value.familyStatus}</div>
                  <div>{userPhone}</div>
                  <div>{value.tags}</div>
                  <div>
                     <button className="button-reset more-functions" onClick={toggleSettings} ref={el => dotBtns.current[index] = el}>
                        <Dots/>
                     </button>
                  </div>
               </div>
            )
   
         });
         return elements;
      }
   }

   const respondItems = useMemo(() => renderRespondList(filteredResponds), [filteredResponds]);   
   const loader = loading ? <Loader classes="respondDb__loader"/> : null; 
   return (
      <main className="respondDb">
         <RespondDbPopup link={popup} popupClass={`respondDb__respondent-options`} 
            popupOpened={popupActive} rowNum={rowNum} 
            activeRespond={activeRespond}
            setRemovedRespond={setModalDeleteActive}
            setEditModalActive={setModalActive}
            setEditRespond={setEditRespond}
            setPopupActive={setPopupActive}
            isLow={isLow} dotBtns={dotBtns}
         />
         <div className="table respondDb__table" ref={table}>
            <div className="table__title">
               <div>
                  <label className="checkbox">
                     <input className="checkbox__input" name="all" type="checkbox"/>
                     <div className="checkbox__check"></div>
                  </label>
               </div>
               <div>ФИО</div>
               <div>Пол</div>
               <div>Возраст</div>
               <div>Образование</div>
               <div>Место жительства</div>
               <div>Семейное положение</div>
               <div>Телефон</div>
               <div>Тэги</div>
            </div>
            <div className="table__content">
               {respondItems}
            </div>
            
         </div>

         <div className={`respondDb__message ${resultsFound ? '' : 'show'}`}>
            Таких респондентов нет в базе данных :(
         </div>
         
         {loader}

         <div className="respondDb__btns">
            <button className="button" disabled>Пригласить респондентов в проект</button>
            <button className="button respondDb__add-btn" onClick={() => setModalActive(true)} >Добавить респондента</button>
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