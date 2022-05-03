import './otherModals.scss';
import { useState, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import useBookmeService from '../../services/BookmeService';
import useValidation from '../../hooks/useValidation';
import dateToAge from '../../hooks/dateToAge';
import selectValues from '../../hooks/selectValues';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Select from '../select/Select';
import Button from '../button/Button';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useInput } from '../../hooks/useInput';
import { PlusAdd } from '../../resources';

const ModalAddEditRespond = ({setModalActive, respondents, setRespondents, editRespond, setEditRespond}) => {

   const nameInput = useInput('');
   const emailInput = useInput('');
   const phoneInput = useInput('');
   const dateInput = useInput('');
   const ageInput = useInput('');
   const sityInput = useInput('');
   const tagsInput = useInput('');

   const modal = useRef();
   const form = useRef();
   
   const [errorMessage, setErrorMessage] = useState({});
   const [genderInput, setGenderInput] = useState('М');
   const [clearSelect, setClearSelect] = useState(false);
   const [tagsList, setTagsList] = useState([]);

   const [familyStatusValue, setFamilyStatusValue] = useState(null);
   const [educationValue, setEducationValue] = useState(null);
   const [respondId, setRespondId] = useState('');

   const {universalRequest} = useBookmeService();
   const {respondDbValidation, fieldsValid} = useValidation();
   const {educationValues, familyStatusValues} = selectValues();


   useEffect(() => {
      if (editRespond || editRespond === 0){
         const currentRespond = respondents[editRespond];
         //заполняем поля формы имеющимися данными
         nameInput.setValue(currentRespond[2]);
         emailInput.setValue(currentRespond[3]);
         phoneInput.setValue(currentRespond[4]);
         dateInput.setValue('');//!
         ageInput.setValue(currentRespond[6]);
         setGenderInput(currentRespond[5]);

         sityInput.setValue(currentRespond[8] === '-' ? '' : currentRespond[8]);
         setTagsList(currentRespond[10] === '-' ? [] : currentRespond[10].split(', '));
         setEducationValue(currentRespond[7] === '-' ? 'Не важно' : currentRespond[7]);
         setFamilyStatusValue(currentRespond[9] === '-' ? 'Не важно' : currentRespond[9]);

         setRespondId(currentRespond[1]);
      }
   }, [editRespond])

   const scrollIntoTop = (modal) => {
      modal.scrollIntoView({
         behavior: "smooth"
      });
   }

   const submitForm = async () => {

      //если есть ошибки в полях ввода
      if (Object.keys(errorMessage).length !== 0){
         scrollIntoTop(modal.current);
         return;
      }

      const formData = new FormData(form.current);

      if (respondId){
         formData.set("uniqueid", respondId);
      }

      // перезапись возраста с учетом даты рождения
      if (dateInput.value.replace(/[^0-9]/g,"")){
         const strokeDate = dateInput.value.split('.').reverse().join('-');
         const age = dateToAge(strokeDate);
         formData.set('age', age);
      } 
      if (formData.get('education') == 'Не важно'){
         formData.set('education', '-');
      }
      if (formData.get('familyStatus') == 'Не важно'){
         formData.set('familyStatus', '-');
      }  
      if (tagsList.length){
         const strokeTags = tagsList.map(el => (
            el[0].toUpperCase() + el.slice(1)
         ));
         formData.set('tags', strokeTags.join(', '));
      }

      if (editRespond == null){
         //отправка формы добавления
         universalRequest('addRespondent', formData).then(onRespondentLoaded);
      } else {
         //отправка формы редактирования
         universalRequest('editRespondent', formData).then(onRespondentLoaded);
      }
   }

   const onRespondentLoaded = (newRespond) => {
      setModalActive(false);
      if (editRespond == null){
         //при форме добавления
         setRespondents(respondents => [...respondents, ...newRespond]);
      } else {
         //при форме редактирования
         const updatedResponds = [...respondents.slice(0, editRespond), ...newRespond, ...respondents.slice(editRespond + 1)];
         setRespondents(updatedResponds);
      }
      clearInputs();
   }

   const clearInputs = () => {
      //очистка формы
      form.current.reset();
      nameInput.removeValue();
      emailInput.removeValue();
      phoneInput.removeValue();
      dateInput.removeValue();
      ageInput.removeValue();
      sityInput.removeValue();
      tagsInput.removeValue();
      setGenderInput('М');
      setClearSelect(true);
      setTagsList([]);
      setErrorMessage({});
      setRespondId('');
   }

   const closeModal = () => {
      setEditRespond(null);
      setModalActive(false);
      clearInputs();
   }

   const addTag = () => {
      setTagsList(tags => [...tags, tagsInput.value]);
      tagsInput.removeValue();
   }
   const onTagDelete = (e) => {
      const removedTag = tagsList.findIndex(el => el === e.target.innerHTML);
      const updatedTags = [...tagsList.slice(0, removedTag), ...tagsList.slice(removedTag + 1)];
      setTagsList(updatedTags);
   }

   const validation = (e) => {
      const validRes = fieldsValid(e.target.name, e.target.value);
      let error = {};
      if (validRes === true){
         Object.assign(error, errorMessage);
         delete error[e.target.name];
         setErrorMessage({...error});
      } else {
         error[e.target.name] = validRes;
         setErrorMessage(errorMessage => ({...errorMessage, ...error}));
      }
   }

   return (
      <div className="modal__content" ref={modal} onClick={e => e.stopPropagation()}>
         <h3 className="modal__title">Редактировать респондента</h3>
         <form className="modal__form" ref={form} onSubmit={e => e.preventDefault()}>
            <InputWithLabel labelClass="modal__label" labelTitle="ФИО *">
               <Input inputType="text" inputName="name" inputText="Введите ФИО" value={nameInput.value} onChange={nameInput.onChange} onBlur={e => validation(e)}/>
               {errorMessage.name ? <ErrorMessage message={errorMessage.name}/> : null}
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Почта *">
               <Input inputType="email" inputName="email" inputText="Введите почту" value={emailInput.value} onChange={emailInput.onChange} onBlur={e => validation(e)}/>
               {errorMessage.email ? <ErrorMessage message={errorMessage.email}/> : null}
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Телефон *">
               <InputMask mask="+7 (999) 999-99-99" value={phoneInput.value} onChange={phoneInput.onChange} onBlur={e => validation(e)}>
                  <Input inputType="tel" inputName="phone" inputText="Введите номер телефона"/>
               </InputMask>
               {errorMessage.phone ? <ErrorMessage message={errorMessage.phone}/> : null}
            </InputWithLabel>
            <div className="modal__label">
               <span className="modal__input-name">Пол</span>
               <div className="modal__some-inputs">
                  <label className="checkbox modal__checkbox">
                     <span>Мужской</span>
                     <input className="visually-hidden checkbox__input" type="radio" name="gender" value="М" 
                        onChange={(e) => setGenderInput(e.target.value)}
                        checked={genderInput == "М" ? true : false}
                     />
                     <div className="checkbox__check"></div>
                  </label>
                  <label className="checkbox modal__checkbox">
                     <span>Женский</span>
                     <input className="visually-hidden checkbox__input" type="radio" name="gender" value="Ж" 
                        onChange={(e) => setGenderInput(e.target.value)}
                        checked={genderInput == "Ж" ? true : false}
                     />
                     <div className="checkbox__check"></div>
                  </label>
               </div>
            </div>
            <InputWithLabel labelClass="modal__label" labelTitle="Дата рождения / возраст *">
               <div className="modal__some-inputs modal_respond__date">
                  <InputMask mask="99.99.9999" value={dateInput.value} onChange={dateInput.onChange} onBlur={e => validation(e)}>
                     <Input inputType="text" inputName="birthdayDate" inputText="Дата"/>
                  </InputMask>
                  <Input inputType="number" inputName="age" inputText="0" value={ageInput.value} onChange={ageInput.onChange} onBlur={e => validation(e)}/>
               </div>
               {errorMessage.birthdayDate ? <ErrorMessage message={errorMessage.birthdayDate}/> : null}
               {errorMessage.age ? <ErrorMessage message={errorMessage.age}/> : null}
               {dateInput.value == '' && ageInput.value == '' ? <ErrorMessage warning message={"Укажите дату рождения или возраст"}/> : null}
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Образование">
               <Select clearSelect={clearSelect} setClearSelect={setClearSelect} selectName="education" selectValue={educationValue}
                  values={educationValues}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Место жительства">
               <Input inputType="text" inputName="sity" inputText="Введите свой город" value={sityInput.value} onChange={sityInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Семейное положение">
               <Select clearSelect={clearSelect} setClearSelect={setClearSelect} selectName="familyStatus" selectValue={familyStatusValue}
                  values={familyStatusValues}
               />
            </InputWithLabel>

            <InputWithLabel labelClass="modal__label" labelTitle="Добавить тэги">
               <div className="modal__some-inputs modal_respond__tags-input">
                  <input className="input" type="text" placeholder="Название тэга" 
                     value={tagsInput.value} onChange={tagsInput.onChange}
                     onKeyPress={(e) => {
                        if (e.code == 'Enter'){
                           e.preventDefault();
                           addTag();
                        }
                     }}
                  />

                  <button className="button-reset button modal_respond__tag-btn" 
                     disabled={tagsInput.value == '' ? true : false} 
                     type="button" onClick={addTag}
                  >
                     <PlusAdd/>
                  </button>
               </div>

               <ul className="modal_respond__tags">
                  {tagsList.map((el, id) => <li key={id} onClick={onTagDelete}><div className="tag tag_can-delete">{el}</div></li>)}
               </ul>
            </InputWithLabel>

            <div className="modal__bottom-btns">
               <Button buttonClass="modal__btn modal__close" onClick={closeModal}>Отмена</Button>
               <Button buttonClass="modal__btn modal__ready" onClick={submitForm} type="submit" 
                  disabled={
                     nameInput.value !== '' 
                     && emailInput.value !== '' 
                     && phoneInput.value !== '' 
                     && (dateInput.value !== '' || ageInput.value !== '')
                     ? false : true}
                  >
                     Готово
               </Button>
            </div>
         </form>
      </div>
   )
}
export default ModalAddEditRespond;

//&& (dateInput.value !== '' || ageInput.value !== '') 