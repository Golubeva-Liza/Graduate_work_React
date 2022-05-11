import "./respondendSettings.scss";
import { useState, useEffect, useMemo } from 'react';
import { useInput } from '../../hooks/useInput';

import Select from "../select/Select";
import InputWithLabel from "../inputWithLabel/InputWithLabel";
import InputMask from 'react-input-mask';
import Input from "../input/Input";
import InputBtns from "../inputBtns/InputBtns";


const RespondendSettings = ({selectedDay, time}) => {
   const nameInput = useInput('');
   const emailInput = useInput('');
   const phoneInput = useInput('');
   const commentInput = useInput('');

   const [callActive, setCallActive] = useState(false);
   const [callRadio, setCallRadio] = useState(null);
   const [timeSelect, setTimeSelect] = useState(null);

   const [errorNameMessage, setErrorNameMessage] = useState("Ошибка");
   const [errorEmailMessage, setErrorEmailMessage] = useState("Ошибка");
   const [errorTelMessage, setErrorTelMessage] = useState("Ошибка");

   const changeCallCheck = () => {
      if (callActive){
         setCallRadio(null);
      }
      setCallActive(!callActive)
   }

   const errorName = errorNameMessage ? <div className="respondent-settings__error-message">{errorNameMessage}</div> : null;
   const errorEmail = errorEmailMessage ? <div className="respondent-settings__error-message">{errorEmailMessage}</div> : null;
   const errorTel = errorTelMessage ? <div className="respondent-settings__error-message">{errorTelMessage}</div> : null;
   return (
      <section className="respondent-settings">
         <form action="#">
            <h2 className="respondent-settings__title">Выберите время</h2>
            <p className="respondent-settings__date">25 декабря</p>

            {time ? 
               <Select selectValue={timeSelect} setSelectValue={setTimeSelect} selectName="timeOfRecording"
                  values={time}
               />
               : null
            }
            {/* <Select clearSelect={clearSelect} setClearSelect={setClearSelect} selectName="familyStatus"
               values={['Не важно', 'Разведен(а)', 'Состоит в браке', 'В отношениях', 'Не в отношениях']}
            /> */}
            <div className="respondent-settings__select" id="select-time"></div>

            <h2 className="respondent-settings__title">Личные данные</h2>

            <InputWithLabel labelClass="respondent-settings__label" labelTitle="Имя *">
               <Input inputType="text" inputName="name" inputText="Введите свое ФИО" value={nameInput.value} onChange={nameInput.onChange}/>
               {errorName}
            </InputWithLabel>

            <InputWithLabel labelClass="respondent-settings__label" labelTitle="Почта *">
               <Input inputType="email" inputName="email" inputText="Введите свой почтовый адрес" value={emailInput.value} onChange={emailInput.onChange}/>
               {errorEmail}
            </InputWithLabel>

            <InputWithLabel labelClass="respondent-settings__label" labelTitle="Телефон *">
               <InputMask mask="+7 (999) 999-99-99" value={phoneInput.value} onChange={phoneInput.onChange}>
                  <Input inputType="tel" inputName="phone" inputText="Введите номер телефона"/>
               </InputMask>
               {errorTel}
            </InputWithLabel>
            
            <div className="respondent-settings__call">
               <label className="checkbox respondent-settings__checkbox">
                  <Input inputType="checkbox" inputClass="visually-hidden checkbox__input" inputName="all" onChange={changeCallCheck}/>
                  <div className="checkbox__check"></div>
                  <span>Позвоните мне перед тестированием за</span>
               </label>
               <InputBtns classes={`respondent-settings__time ${callActive ? '' : 'visually-hidden'}`} 
                  values={['1 час', '2 часа', '1 день', 'Другое']}
                  radioValue={callRadio} setRadioValue={setCallRadio}
               />

               {/* <div className="respondent-settings__another-time">

               </div> */}
               
            </div>

            <InputWithLabel labelClass="respondent-settings__label" labelTitle="Комментарий">
               <textarea className="input input_textarea" name="comment" autoComplete="off" placeholder="Пожелания или что-то ещё"
                  value={commentInput.value} onChange={commentInput.onChange}
               ></textarea>
            </InputWithLabel>

            <div className="respondent-settings__agreement">Отправляя настоящую форму я даю <a href="#">согласие на обработку персональных данных</a></div>

            <div className="respondent-settings__btns">
               <button className="button-reset button button_linear" type="button">Заполнить анкету</button>
               <button className="button-reset button" type="submit">Отправить</button>
            </div>
         </form>
      </section>          
   )
}
export default RespondendSettings;