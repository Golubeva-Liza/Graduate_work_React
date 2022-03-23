import './otherModals.scss';
import { useState, useMemo, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import useBookmeService from '../../services/BookmeService';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Select from '../select/Select';
import Button from '../button/Button';
import { useInput } from '../../hooks/useInput';
import { PlusAdd } from '../../resources';

const ModalEditRespond = ({setModalActive, respondents, setRespondents, editRespond, regForEmail}) => {

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
   const [familyStatusValue, setFamilyStatusValue] = useState(null);
   const [educationValue, setEducationValue] = useState(null);
   const [respondId, setRespondId] = useState('');

   const {editRespondent} = useBookmeService();


   useEffect(() => {
      if (editRespond || editRespond === 0){
         // console.log(`хотим редактировать респондента ${respondents[editRespond]}`);

         //заполняем поля формы имеющимися данными
         nameInput.setValue(respondents[editRespond][2]);
         emailInput.setValue(respondents[editRespond][3]);
         phoneInput.setValue(respondents[editRespond][4]);
         dateInput.setValue('');//!
         ageInput.setValue(respondents[editRespond][6]);
         sityInput.setValue(respondents[editRespond][8]);
         tagsInput.setValue(respondents[editRespond][10]);
         setGenderInput(respondents[editRespond][5]);
         setEducationValue(respondents[editRespond][7]);
         setFamilyStatusValue(respondents[editRespond][9]);
         setRespondId(respondents[editRespond][1]);
      }
   }, [editRespond])


   const scrollIntoTop = () => {
      modal.current.scrollIntoView({
         behavior: "smooth"
      });
   }

   const changeRadio = (e) => {
      setGenderInput(e.target.value);
   }

   const submitForm = async () => {
      const phoneNum = phoneInput.value.replace(/[^0-9]/g,"");

      if (nameInput.value.length < 3 || nameInput.value.length >= 50){
         setErrorMessage('Имя пользователя должно быть длиной от 3 до 50 символов');
         scrollIntoTop();
         return;
         
      } else if (!regForEmail.test(String(emailInput.value).toLocaleLowerCase())){
         setErrorMessage('Введите корректный почтовый адрес');
         scrollIntoTop();
         return;

      } else if(phoneNum.length !== 11){
         setErrorMessage('Введите корректный номер телефона');
         scrollIntoTop();
         return;
      } else if (!dateInput.value && !ageInput.value){
         setErrorMessage('Укажите возраст или дату рождения');
         scrollIntoTop();
         return;
      }
      
      setErrorMessage('');

      const formData = new FormData(form.current);

      editRespondent(formData)
         .then(onRespondentUpdate);
   }

   const onRespondentUpdate = (editedRespond) => {
      const updatedResponds = [...respondents.slice(0, editRespond), ...editedRespond, ...respondents.slice(editRespond + 1)];
      console.log(updatedResponds);
      setRespondents(updatedResponds);
      setModalActive(false);
   }

   const errorDiv = errorMessage ? <div className="error-message">{errorMessage}</div> : null;
   return (
      <div className="modal__content" ref={modal} onClick={e => e.stopPropagation()}>
         <h3 className="modal__title">Редактировать респондента</h3>
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
                        onChange={changeRadio}
                        checked={genderInput == "М" ? true : false}
                     />
                     <div className="checkbox__check"></div>
                  </label>
                  <label className="checkbox modal__checkbox">
                     <span>Женский</span>
                     <input className="visually-hidden checkbox__input" type="radio" name="gender" value="Ж" 
                        onChange={changeRadio}
                        checked={genderInput == "Ж" ? true : false}
                     />
                     <div className="checkbox__check"></div>
                  </label>
               </div>
            </div>
            <InputWithLabel labelClass="modal__label" labelTitle="Дата рождения / возраст">
               <div className="modal__some-inputs modal_respond__date">
                  <Input inputType="date" inputName="birthday-date" inputText="Дата" value={dateInput.value} onChange={dateInput.onChange}/>
                  <Input inputType="number" inputName="age" inputText="0" value={ageInput.value} onChange={ageInput.onChange}/>
               </div>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Образование">
               <Select clearSelect={clearSelect} setClearSelect={setClearSelect} selectName="education" selectValue={educationValue}
                  values={['Не важно', 'Среднее общее', 'Среднее профессиональное', 'Высшее', 'Школьник', 'Студент']}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Место жительства">
               <Input inputType="text" inputName="sity" inputText="Введите свой город" value={sityInput.value} onChange={sityInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Семейное положение">
               <Select clearSelect={clearSelect} setClearSelect={setClearSelect} selectName="familyStatus" selectValue={familyStatusValue}
                  values={['Не важно', 'Разведен(а)', 'Состоит в браке', 'В отношениях', 'Не в отношениях']}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Добавить тэги">
               <div className="modal__some-inputs modal_respond__tags-input">
                  <Input inputType="text" inputName="tags" inputText="Название тэга" value={tagsInput.value} onChange={tagsInput.onChange}/>
                  <button className="button-reset button modal_respond__tag-btn" disabled type="button">
                     <PlusAdd/>
                  </button>
               </div>
            </InputWithLabel>
            <input className="visually-hidden" type="text" value={respondId} name="uniqueid" readOnly/>

            <div className="modal__bottom-btns">
               <button className="button-reset button modal__btn modal__close" type="button" onClick={() => setModalActive(false)}>Отмена</button>
               <button className="button-reset button modal__btn modal__ready" type="submit" onClick={submitForm}>Готово</button>
            </div>
         </form>
      </div>
   )
}
export default ModalEditRespond;