import './aboutProjectsAside.scss';
import { useState, useMemo } from 'react';

const AboutProjectsAside = () => {

   return (
      <section className="about-project">
         <h2 className="about-project__title">Проект 1</h2>
         <p className="about-project__descr">
            Добрый день.
            <br/><br/>
            На тестирование приглашаются респонденты, у которых есть своя машина и которые не менее 5 раз уже обслуживались в автомастерской или проходили ТО.
            <br/><br/>
            Будем рады каждому отклику!
            <br/><br/>
            Вознаграждения: нет
         </p>
         <div className="about-project__info">
            Модератор: <span>Мария</span> 
         </div>
         <div className="about-project__info">
            Адрес: <span>Биржевая линия, 14, лит.А, Санкт-Петербург, ауд. 436</span> 
         </div>
      </section>
   )
}
export default AboutProjectsAside;