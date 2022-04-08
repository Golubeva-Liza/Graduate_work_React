import { useState, useEffect, useMemo } from 'react';
import { useInput } from '../../hooks/useInput';

import './respondDbSettings.scss';
import Input from '../input/Input';
import Select from '../select/Select';
import RangeSlider from '../rangeSlider/RangeSlider';

const RespondDbSettings = ({respondents, filteredResponds, setFilteredResponds, setResultsFound}) => {

   const searchInput = useInput('');
   const [genderSelect, setGenderSelect] = useState(null);
   const [educationSelect, setEducationSelect] = useState(null);
   const [familySelect, setFamilySelect] = useState(null);

   const applyFilters = () => {
      let updatedList = respondents;

      //Search Filter
      if (searchInput.value) {
         updatedList = updatedList.filter(
            (item) =>
            item[2].toLowerCase().search(searchInput.value.toLowerCase().trim()) !== -1
         );
      }
   
      //Gender Filter
      if (genderSelect && genderSelect !== "Не важно") {
         updatedList = updatedList.filter(
            (item) => item[5] === genderSelect[0]
         );
      }

      //Age Filter


      //Education Filter
      if (educationSelect && educationSelect !== "Не важно") {
         updatedList = updatedList.filter(
            (item) => item[7] === educationSelect
         );
      }

      //City Filter

      //Family status Filter
      if (familySelect && familySelect !== "Не важно") {
         updatedList = updatedList.filter(
            (item) => item[9] === familySelect
         );
      }

      setFilteredResponds(updatedList);

      !updatedList.length ? setResultsFound(false) : setResultsFound(true);
   };

   useEffect(() => {
      //для того, чтобы не было доп. рендера при первой загрузке
      if (respondents.length){ 
         applyFilters();
      }
   }, [genderSelect, educationSelect, searchInput.value, familySelect]);
   

   return (
      <aside className="respond-db-settings">
         <div className="respond-db-settings__search">
            <Input inputType="text" inputName="search" inputText="Поиск респондента" inputClass="input_search"
               value={searchInput.value} onChange={searchInput.onChange}
            />
         </div>
         <label className="label respond-db-settings__label">
            <span>Пол:</span>
            <Select selectName="gender" setSelectValue={setGenderSelect}
               values={['Не важно', 'Мужской', 'Женский']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Возраст:</span>
            <RangeSlider/>
         </label>
         <label className="label respond-db-settings__label">
            <span>Образование:</span>
            <Select selectName="education" setSelectValue={setEducationSelect}
               values={['Не важно', 'Среднее общее', 'Среднее профессиональное', 'Высшее', 'Школьник', 'Студент']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Место жительства:</span>
            <Select 
               values={['Не важно', 'Санкт-Петербург', 'Москва', 'Ростов-на-Дону', 'Нижний Новгород', 'Волгоград', 'Юпитер']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Семейное положение:</span> 
            <Select selectName="familyStatus" setSelectValue={setFamilySelect}
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