import './respondRecordings.scss';
import { useState, useMemo } from 'react';
import Record from './Record';

const RespondRecordings = () => {

   return (
      <section className="respond-recordings">
         <h2 className="respond-recordings__title">Записи респондентов (<span>7</span>)</h2>
         <div className="respond-recordings__content">
            {/* <div className="popup recording__popup" data-popup-target="respond-recording">
               <ul className="popup__list">
                  <li className="popup__item">
                     <button className="button-reset">Отправить письмо</button>
                  </li>
                  <li className="popup__item">
                     <button className="button-reset">Редактировать</button>
                  </li>
                  <li className="popup__item">
                     <button className="button-reset">Удалить</button>
                  </li>
                  <li className="popup__item">
                     <button className="button-reset">Пригласить в проект</button>
                  </li>
               </ul>
            </div> */}
            <div className="respond-recordings__per-day">
               <h3 className="respond-recordings__date">26 мая</h3>
               <Record time="13:00-14:00" name="Ольга" email="olgavolga@gmail.com" comment="Очень интересно" />
            </div>
            <div className="respond-recordings__per-day">
               <h3 className="respond-recordings__date">28 мая</h3>

               <Record time="9:00-10:00" name="Тимур Николаевич" email="timnik@gmail.com"/>
               <Record time="11:00-12:00" name="Константин" email="kostyahover@yandex.ru"/>
               <Record time="17:00-18:00" name="Владислав Маслёнников" email="masleonka@gmail.com"
                  comment="Пожалуйста, приглашайте меня на тестирования, связанный также с финансовыми отчётами, бухгалтерией и т.д., так как я финансист"
               />
            </div>
            <div className="respond-recordings__per-day">
               <h3 className="respond-recordings__date">30 мая</h3>

               <Record time="10:00-11:00" name="Анна" email="annakovalenko@gmail.com"
                  comment="Добрый вечер. Если случится форс-мажор и запись перенесётся, прошу позвонить мне по номеру +7 808 487 44 25"
               />
               <Record time="14:00-15:00" name="Виктор Иннокентьевич" email="bestvictor@mail.ru"
                  comment="Я на самом деле не автослесарь, но 10 лет владел автомастерской, поэтому считаю, что подойду для тестирования"
               />
               <Record time="14:00-15:00" name="Виктор Иннокентьевич" email="bestvictor@mail.ru"
                  comment="Я на самом деле не автослесарь, но 10 лет владел автомастерской, поэтому считаю, что подойду для тестирования"
               />
            </div>
         </div>
      </section>
   )
}
export default RespondRecordings;