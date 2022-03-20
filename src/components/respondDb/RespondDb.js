import { useState, useMemo, useEffect } from 'react';

import Popup from '../popup/Popup';
import { Dots } from '../../resources';
import './respondDb.scss';


const RespondDb = () => {
   const [respondentsList, setRespondentsList] = useState([]);
   const [popupActive, setPopupActive] = useState(false);

   const toggleSettings = () => {
      setPopupActive(!popupActive);
      // if (popupActive === false){//старое значение перед открытием
      //    // console.log('открыт');
      //    document.addEventListener('click', closeSelect);
      // }
   }

   useEffect(() => {
      getRespondents();
   }, []);

   const getRespondents = async () => {
      const response = await fetch("http://localhost/bookme-server/respondents.php", {
         method : 'GET',
         header : {
            'Content-Type': 'application/json'
         },
         body: null,
      });

      if (!response.ok) {
         throw new Error(`Could not fetch this, status: ${response.status}`);
      }

      const data = await response.json();
      setRespondentsList(data);

      //массив из массивов, в которых хранятся все значения из таблицы, в данном случае:
      //номер по порядку, id, name, email, phone, sex, age, education, sity, love, tags
      // console.log(data[0]);
   }

   function renderRespondList(arr) {
      console.log('рендер респондентов');
      const elements = arr.map((value) => {
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
                  <button className="button-reset more-functions" onClick={toggleSettings}>
                     <Dots/>
                  </button>
               </td>
            </tr>
         )

      });
      return elements;
   }

   const comicsItems = renderRespondList(respondentsList);
   
   
   
   return (
      <main className="respondDb">
         <div className="respondDb__table-container">
            {/* modal-closed */}
            <Popup popupClass={`respondDb__respondent-options`} popupOpened={popupActive}/>
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
                  {comicsItems}
               </tbody>
            </table>
         </div>

         <div className="respondDb__btns">
            <button className="button" disabled>Пригласить респондентов в проект</button>
            <button className="button respondDb__add-btn" data-popup-btn="add-respond">Добавить респондента</button>
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