import Select from '../select/Select';
import RangeSlider from '../rangeSlider/RangeSlider';


import './respondDbSettings.scss';

const RespondDbSettings = () => {
   return (
      <aside className="respond-db-settings">
         <div className="respond-db-settings__search">
            <input type="text" className="input input_search" placeholder="Поиск респондента"/>
         </div>
         <label className="label respond-db-settings__label">
            <span>Пол:</span>
            <Select 
               values={['Не важно', 'Мужской', 'Женский']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Возраст:</span>
            <RangeSlider/>
         </label>
         <label className="label respond-db-settings__label">
            <span>Образование:</span>
            <Select 
               values={['Не важно', 'Среднее общее', 'Среднее профессиональное', 'Высшее', 'Школьник', 'Студент']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Место жительства:</span>
            <Select 
               values={['Не важно', 'Санкт-Петербург', 'Москва', 'Ростов-на-Дону', 'Нижний Новгород', 'Волгоград']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Семейное положение:</span> 
            <Select 
               values={['Не важно', 'Разведен(а)', 'Состоит в браке', 'В отношениях', 'Не в отношениях']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Теги:</span>
            <div className="select respond-db-settings__tags">
               <ul className="respond-db-settings__tag-wrapper">
                  <li><span className="tag tag_selected respond-db-settings__tag">Есть дети</span></li>
                  <li><span className="tag respond-db-settings__tag">Машина</span></li>
                  <li><span className="tag respond-db-settings__tag">Дача</span></li>
                  <li><span className="tag respond-db-settings__tag">Метеоролог</span></li>
                  <li><span className="tag respond-db-settings__tag">Рыбалка</span></li>
                  <li><span className="tag respond-db-settings__tag">Велосипед</span></li>
                  <li><span className="tag respond-db-settings__tag">Рыбалка</span></li>
                  <li><span className="tag respond-db-settings__tag">Велосипед</span></li>
               </ul>
            </div>
         </label>
      </aside>
   )
}
export default RespondDbSettings;