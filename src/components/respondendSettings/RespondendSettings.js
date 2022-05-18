import "./respondendSettings.scss";
import { useState, useEffect, useMemo, useRef } from 'react';
import { useInput } from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';
import useSelectValues from '../../hooks/useSelectValues';
import useBookmeService from "../../services/BookmeService";
import dateToAge from "../../hooks/dateToAge";
import checkInterval from "../../hooks/checkInterval";

import Select from "../select/Select";
import InputWithLabel from "../inputWithLabel/InputWithLabel";
import InputMask from 'react-input-mask';
import Input from "../input/Input";
import InputBtns from "../inputBtns/InputBtns";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Button from "../button/Button";


const RespondendSettings = ({selectedDay, time, formLink, projectId, setEntryReady}) => {

   const {errorMessage, setErrorMessage, validation} = useValidation();
   const {educationValues, familyStatusValues} = useSelectValues();
   const {universalRequest} = useBookmeService();

   const nameInput = useInput('');
   const emailInput = useInput('');
   const phoneInput = useInput('');
   const commentInput = useInput('');
   const dateInput = useInput('');
   const sityInput = useInput('');

   const [timeSelect, setTimeSelect] = useState(null);
   const [callActive, setCallActive] = useState(false);
   const [callRadio, setCallRadio] = useState(null);
   const [addInfoActive, setAddInfoActive] = useState(false);
   const [clearSelect, setClearSelect] = useState(false);

   const [educationValue, setEducationValue] = useState(null);
   const [familyStatusValue, setFamilyStatusValue] = useState(null);

   const months = useMemo(() => [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
   ], []);

   const date = useMemo(() => {
      if (selectedDay){
         const arr = selectedDay.split('-');
         const month =  months[+arr[1]-1];
         return `${+arr[2]} ${month}`;
      }
   }, [selectedDay]);

   const form = useRef();
   const currentYear = useMemo(() => (new Date().getFullYear().toString()), []);


   useEffect(() => {
      if (addInfoActive){
         dateInput.removeValue();
         sityInput.removeValue();
         setClearSelect(true);
      }
   }, [addInfoActive])

   const changeCallCheck = () => {
      if (callActive){
         setCallRadio(null);
      }
      setCallActive(!callActive)
   }

   const onSubmit = () => {

      const formData = new FormData(form.current);
      formData.set("date", selectedDay);
      formData.set("projId", projectId);

      if (formData.get('education') == 'Не важно' || !formData.get('education')){
         formData.set('education', '-');
      }
      if (formData.get('familyStatus') == 'Не важно' || !formData.get('familyStatus')){
         formData.set('familyStatus', '-');
      } 
      if (formData.get('birthday')){
         const strokeDate = dateInput.value.split('.').reverse().join('-');
         const age = dateToAge(strokeDate);
         formData.set('age', age);
         formData.set('birthday', strokeDate);
      } else{
         formData.set('age', 0);
      }

      // for (let [key, val] of formData.entries()) {
      //    console.log(key, val);
      // }
      universalRequest('addEntry', formData).then(onEntryPost);
   }

   const onEntryPost = (res) => {
      if (res == 'success'){
         setEntryReady(true);
      } else {
         console.log(res);
      }
   }


   return (
      <section className="respondent-settings">
         <div className="respondent-settings__container">
            <form action="#" ref={form}>
               <h2 className="respondent-settings__title">Выберите время</h2>
               <p className="respondent-settings__date">{date}</p>

               <div className="respondent-settings__select">
                  {time ? 
                     <Select 
                        selectValue={timeSelect} 
                        setSelectValue={setTimeSelect} 
                        selectName="time"
                        values={time}
                     />
                     : <span>Выберите дату для выбора времени</span>
                  }
               </div>

               <h2 className="respondent-settings__title">Личные данные</h2>

               <InputWithLabel labelClass="respondent-settings__label" labelTitle="Имя *">
                  <Input 
                     inputType="text" 
                     inputName="name" 
                     inputText="Введите свое ФИО" 
                     value={nameInput.value} 
                     onChange={nameInput.onChange}
                     onBlur={e => validation(e)}
                  />
                  {errorMessage.name ? <ErrorMessage message={errorMessage.name}/> : null}
               </InputWithLabel>

               <InputWithLabel labelClass="respondent-settings__label" labelTitle="Почта *">
                  <Input 
                     inputType="email" 
                     inputName="email" 
                     inputText="Введите свой почтовый адрес" 
                     value={emailInput.value} 
                     onChange={emailInput.onChange}
                     onBlur={e => validation(e)}
                  />
                  {errorMessage.email ? <ErrorMessage message={errorMessage.email}/> : null}
               </InputWithLabel>

               <InputWithLabel labelClass="respondent-settings__label" labelTitle="Телефон *">
                  <InputMask mask="+7 (999) 999-99-99" value={phoneInput.value} onChange={phoneInput.onChange} onBlur={e => validation(e)}>
                     <Input inputType="tel" inputName="phone" inputText="Введите номер телефона"/>
                  </InputMask>
                  {errorMessage.phone ? <ErrorMessage message={errorMessage.phone}/> : null}
               </InputWithLabel>
               
               <div className="respondent-settings__call">
                  <label className="checkbox respondent-settings__checkbox">
                     <Input inputType="checkbox" inputClass="visually-hidden checkbox__input" inputName="isCall" onChange={changeCallCheck}/>
                     <div className="checkbox__check"></div>
                     <span>Позвоните мне перед тестированием за...</span>
                  </label>
                  <InputBtns classes={`respondent-settings__time ${callActive ? '' : 'visually-hidden'}`} 
                     values={['1 час', '2 часа', '1 день', 'Не важно']}
                     radioValue={callRadio} setRadioValue={setCallRadio}
                  />
               </div>

               <div className="respondent-settings__call">
                  <label className="checkbox respondent-settings__checkbox">
                     <Input 
                        inputType="checkbox" 
                        inputClass="visually-hidden checkbox__input" 
                        inputName="isInfo" 
                        onChange={() => setAddInfoActive(!addInfoActive)}
                     />
                     <div className="checkbox__check"></div>
                     <span>Заполнить доп. информацию о себе</span>
                  </label>

                  {addInfoActive ? (
                     <div className="respondent-settings__another-info">
                        <InputWithLabel labelClass="modal__label" labelTitle="Дата рождения">
                           <div className="modal__some-inputs modal_respond__date">
                              <InputMask 
                                 mask={[
                                    /[0-3]/, 
                                    dateInput.value[0] == 3 ? /[0-1]/ : /[0-9]/, 
                                    ".", 
                                    /[0-1]/, 
                                    dateInput.value[3] == 1 ? /[0-2]/ : /[0-9]/, 
                                    ".", 
                                    /[1-2]/, 
                                    dateInput.value[6] == 1 ? /[9]/ : /[0]/, //19..-20..
                                    dateInput.value[6] == 1 ? /[0-9]/ : new RegExp("[0-" + currentYear.split('')[2] + "]"), 
                                    dateInput.value[8] == currentYear.split('')[2] ? new RegExp("[0-" + currentYear.split('')[3] + "]") : /[0-9]/ 
                                 ]}
                                 value={dateInput.value} 
                                 onChange={dateInput.onChange} 
                              >
                                 <Input inputType="text" inputName="birthday" inputText="Дата"/>
                              </InputMask>
                           </div>
                        </InputWithLabel>
                        <InputWithLabel labelClass="modal__label" labelTitle="Образование">
                           <Select 
                              selectName="education" 
                              selectValue={educationValue}
                              setSelectValue={setEducationValue}
                              values={educationValues}
                              clearSelect={clearSelect} setClearSelect={setClearSelect}
                           />
                        </InputWithLabel>
                        <InputWithLabel labelClass="modal__label" labelTitle="Место жительства">
                           <Input 
                              inputType="text" 
                              inputName="sity" 
                              inputText="Введите свой город" 
                              value={sityInput.value} onChange={sityInput.onChange}
                              onBlur={e => validation(e)}
                           />
                           {errorMessage.sity ? <ErrorMessage message={errorMessage.sity}/> : null}
                        </InputWithLabel>
                        <InputWithLabel labelClass="modal__label" labelTitle="Семейное положение">
                           <Select 
                              selectName="familyStatus" 
                              selectValue={familyStatusValue}
                              setSelectValue={setFamilyStatusValue}
                              values={familyStatusValues}
                              clearSelect={clearSelect} setClearSelect={setClearSelect}
                           />
                        </InputWithLabel>
                     </div>
                  ) : null}
                  
               </div>

               <InputWithLabel labelClass="respondent-settings__label" labelTitle="Комментарий">
                  <textarea className="input input_textarea" name="comment" autoComplete="off" placeholder="Пожелания, доп. информация или что-то ещё"
                     value={commentInput.value} onChange={commentInput.onChange}
                  ></textarea>
               </InputWithLabel>

               
               <div className="respondent-settings__agreement">
                  Отправляя настоящую форму я даю 
                  <a href="#">согласие на обработку персональных данных</a>
               </div>

               <div className="respondent-settings__btns">
                  
                  {formLink ? 
                     <a href={formLink} target="_blank" rel="noreferrer">
                        <Button linear>Заполнить анкету</Button> 
                     </a>
                  : null}
                  
                  <Button onClick={onSubmit}
                     disabled={
                        selectedDay !== null 
                        && nameInput.value !== '' 
                        && emailInput.value !== '' 
                        && phoneInput.value.replace(/[^0-9]/g,"").length === 11 
                        && (callActive !== true || callRadio !== null)
                        && Object.keys(errorMessage).length === 0
                        ? false : true}
                  >
                     Отправить
                  </Button>
               </div>
            </form>
         </div>
         
      </section>          
   )
}
export default RespondendSettings;