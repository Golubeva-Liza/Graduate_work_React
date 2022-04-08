
import './otherModals.scss';
import { useState, useMemo, useRef } from 'react';
import InputMask from 'react-input-mask';
import useBookmeService from '../../services/BookmeService';
import useValidation from '../../hooks/useValidation';
import dateToAge from '../../hooks/dateToAge';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Select from '../select/Select';
import Button from '../button/Button';
import { useInput } from '../../hooks/useInput';
import { PlusAdd } from '../../resources';

const ModalAddRespond = ({setModalActive, respondents, setRespondents, validation}) => {
   const nameInput = useInput('');
   const emailInput = useInput('');
   const phoneInput = useInput('');
   const dateInput = useInput('');
   const ageInput = useInput('');
   const sityInput = useInput('');
   const tagsInput = useInput([]);

   const modal = useRef();
   const form = useRef();
   
   const [errorMessage, setErrorMessage] = useState('');
   const [genderInput, setGenderInput] = useState('М');
   const [clearSelect, setClearSelect] = useState(false);
   const [tagsList, setTagsList] = useState([]);

   const {addRespondent} = useBookmeService();
   const {respondDbValidation} = useValidation();
   

   const addTag = () => {
      setTagsList(tags => [...tags, tagsInput.value]);
      tagsInput.removeValue();
   }

   const submitForm = async () => {
      const successValid = respondDbValidation(modal.current, nameInput.value, emailInput.value, phoneInput.value, dateInput.value, ageInput.value);
      
      if (successValid === true){
         setErrorMessage('');

         const formData = new FormData(form.current);
         
         //перезапись возраста с учетом даты рождения
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

         addRespondent(formData).then(onRespondentLoaded);
      } else {
         setErrorMessage(successValid);
      }
   }

   const onRespondentLoaded = (newRespond) => {
      setRespondents(respondents => [...respondents, ...newRespond]);
      setModalActive(false);
      
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
   }

   const errorDiv = errorMessage ? <div className="error-message">{errorMessage}</div> : null;
   return (
      <div className="modal__content" ref={modal} onClick={e => e.stopPropagation()}>
         <h3 className="modal__title">Добавить респондента</h3>
         {errorDiv}
         <form className="modal__form" ref={form} onSubmit={e => e.preventDefault()}>
            <InputWithLabel labelClass="modal__label" labelTitle="ФИО">
               <Input inputType="text" inputName="name" inputText="Введите ФИО" value={nameInput.value} onChange={nameInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Почта">
               <Input inputType="email" inputName="email" inputText="Введите почту" value={emailInput.value} onChange={emailInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Телефон">
               <InputMask mask="+7 (999) 999-99-99" value={phoneInput.value} onChange={phoneInput.onChange}>
                  <Input inputType="tel" inputName="phone" inputText="Введите номер телефона"/>
               </InputMask>
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
            <InputWithLabel labelClass="modal__label" labelTitle="Дата рождения или возраст">
               <div className="modal__some-inputs modal_respond__date">
                  <InputMask mask="99.99.9999" value={dateInput.value} onChange={dateInput.onChange}>
                     <Input inputType="text" inputName="birthday-date" inputText="Дата"/>
                  </InputMask>
                  {/* <Input inputType="date" inputName="birthday-date" inputText="Дата" value={dateInput.value} onChange={dateInput.onChange}/> */}
                  <Input inputType="number" inputName="age" inputText="0" value={ageInput.value} onChange={ageInput.onChange}/>
               </div>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Образование">
               <Select clearSelect={clearSelect} setClearSelect={setClearSelect} selectName="education"
                  values={['Не важно', 'Среднее общее', 'Среднее профессиональное', 'Высшее', 'Школьник', 'Студент']}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Место жительства">
               <Input inputType="text" inputName="sity" inputText="Введите свой город" value={sityInput.value} onChange={sityInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Семейное положение">
               <Select clearSelect={clearSelect} setClearSelect={setClearSelect} selectName="familyStatus"
                  values={['Не важно', 'Разведен(а)', 'Состоит в браке', 'В отношениях', 'Не в отношениях']}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Добавить тэги">
               <div className="modal__some-inputs modal_respond__tags-input">
                  {/* <Input inputType="text" inputText="Название тэга" value={tagsInput.value} onChange={tagsInput.onChange}/> */}
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
                  <input className="visually-hidden" type="text" name="tags" value={tagsList.join(', ')} readOnly/>
               </div>

               <ul className="modal_respond__tags">
                  {tagsList.map((el, id) => <li key={id}><div className="tag">{el}</div></li>)}
               </ul>
            </InputWithLabel>

            <div className="modal__bottom-btns">
               <Button buttonClass="modal__btn modal__close" onClick={() => setModalActive(false)}>Отмена</Button>
               <Button buttonClass="modal__btn modal__ready" onClick={submitForm} type="submit">Готово</Button>
            </div>
         </form>
      </div>
   )
}
export default ModalAddRespond;