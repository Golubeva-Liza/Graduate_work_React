import './respondDbSettings.scss';

import { useState, useEffect, useMemo } from 'react';
import { useInput } from '../../hooks/useInput';

import Input from '../input/Input';
import Select from '../select/Select';
import RangeSlider from '../rangeSlider/RangeSlider';
import Loader from '../loader/Loader';

const RespondDbSettings = ({respondents, filteredResponds, setFilteredResponds, setResultsFound, citiesValues, tagsValues, loading}) => {

   const searchInput = useInput('');
   const [genderSelect, setGenderSelect] = useState(null);
   const [educationSelect, setEducationSelect] = useState(null);
   const [familySelect, setFamilySelect] = useState(null);
   const [citySelect, setCitySelect] = useState(null);
   const [tagsSelect, setTagsSelect] = useState([]);

   const [ageNow, setAgeNow] = useState([0, 100]);
   const [agePrev, setAgePrev] = useState([]);

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
      if (ageNow[0] !== 0 || ageNow[1] !== 100) {
         updatedList = updatedList.filter(
            (item) => +item[6] >= ageNow[0] && +item[6] <= ageNow[1]
         );
      }

      //Education Filter
      if (educationSelect && educationSelect !== "Не важно") {
         updatedList = updatedList.filter(
            (item) => item[7] === educationSelect
         );
      }

      //City Filter
      if (citySelect && citySelect !== "Не важно") {
         updatedList = updatedList.filter(
            (item) => item[8] === citySelect
         );
      }

      //Family status Filter
      if (familySelect && familySelect !== "Не важно") {
         updatedList = updatedList.filter(
            (item) => item[9] === familySelect
         );
      }

      //Tags Filter
      if (tagsSelect.length) {
         updatedList = updatedList.filter((item) => (
            item[10].split(', ').find(value =>
               tagsSelect.some(element => value === element)
            )
         ));
      }
      
      console.log('у фильтров');
      setFilteredResponds(updatedList);

      !updatedList.length ? setResultsFound(false) : setResultsFound(true);
   };

   useEffect(() => {
      //для того, чтобы не было доп. рендера при первой загрузке
      if (respondents.length){ 
         applyFilters();
      }
   }, [respondents, genderSelect, educationSelect, searchInput.value, familySelect, citySelect, tagsSelect]);

   const applyAge = () => {
      if(ageNow[0] !== agePrev[0] || ageNow[1] !== agePrev[1]){
         setAgePrev(ageNow);
      }
   }

   useEffect(() => {
      if (agePrev.length){ 
         console.log('применить фильтры')
         applyFilters();
      }
   }, [agePrev]);


   const selectingTag = (e) => {
      if (e.target.classList.contains('tag_selected')){
         e.target.classList.remove('tag_selected');
         //удаляем из массива выбранный элемент
         setTagsSelect(tagsSelect => [...tagsSelect.slice(0, tagsSelect.indexOf(e.target.innerHTML)), ...tagsSelect.slice(tagsSelect.indexOf(e.target.innerHTML) + 1)]);

      } else {
         e.target.classList.add('tag_selected')
         setTagsSelect(tagsSelect => [...tagsSelect, e.target.innerHTML]);
      }      
   }


   function renderTagsItems(values){
      const elements = values.sort().map((value) => (
         <li key={value}>
            <span className="tag respond-db-settings__tag" onClick={selectingTag}>{value}</span>
         </li>
         // <li className="select__item" key={index} onClick={selectingItem} ref={el => listItems.current[index] = el}>{value}</li>
      ));
      return elements;
   }

   const tagsItems = useMemo(() => {
      if (tagsValues.length){
         return renderTagsItems(tagsValues);
      }
   }, [tagsValues]);

   
   const loader = loading ? <Loader classes="respond-db-settings__loader"/> : null; 
   return (
      <aside className="respond-db-settings">
         <div className="respond-db-settings__search">
            <Input inputType="text" inputName="search" inputText="Поиск респондента" inputClass="input_search"
               value={searchInput.value} onChange={searchInput.onChange}
            />
         </div>
         <label className="label respond-db-settings__label">
            <span>Пол</span>
            <Select selectName="gender" setSelectValue={setGenderSelect}
               values={['Не важно', 'Мужской', 'Женский']}
            />
         </label>
         <div className="label respond-db-settings__label">
            <div style={{'display': 'flex', 'justifyContent': 'space-between', 'marginBottom': '6px'}}>
               <span>Возраст:</span>
               <button className="button-reset respond-db-settings__apply" 
                  disabled={(ageNow[0] == 0 && ageNow[1] == 100 && !agePrev.length) ? true : false}
                  onClick={applyAge}
               >
                  Применить
               </button>
            </div>
            <RangeSlider setAge={setAgeNow}/>
         </div>
         <label className="label respond-db-settings__label">
            <span>Образование:</span>
            <Select selectName="education" setSelectValue={setEducationSelect}
               values={['Не важно', 'Среднее общее', 'Среднее профессиональное', 'Высшее', 'Школьник', 'Студент']}
            />
         </label>
         <label className="label respond-db-settings__label">
            <span>Место жительства:</span>
            <Select selectName="city" setSelectValue={setCitySelect} 
               values={citiesValues.length ? citiesValues : ['Не важно']}
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
            {loader}
            <div className="select respond-db-settings__tags">
               <ul className="respond-db-settings__tag-wrapper">
                  {tagsItems}
                  {/* <li><span className="tag tag_selected respond-db-settings__tag">Есть дети</span></li> */}
               </ul>
            </div>
         </label>
      </aside>
   )
}
export default RespondDbSettings;