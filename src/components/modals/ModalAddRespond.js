
import './otherModals.scss';
import { useState, useMemo, useEffect } from 'react';

import InputWithLabel from '../inputWithLabel/InputWithLabel';
import Input from '../input/Input';
import Select from '../select/Select';
import Button from '../button/Button';
import { useInput } from '../../hooks/useInput';
import { PlusAdd } from '../../resources';

const ModalAddRespond = () => {
   const nameInput = useInput('');
   const emailInput = useInput('');
   const phoneInput = useInput('');
   const dateInput = useInput('');
   const ageInput = useInput('');
   const sityInput = useInput('');
   const tagsInput = useInput([]);

   return (
      <div className="modal__content">
         <h3 className="modal__title">Добавить респондента</h3>
         <form className="modal__form" action="/" method="POST">
            <InputWithLabel labelClass="modal__label" labelTitle="ФИО">
               <Input inputType="text" inputName="name" inputText="Введите ФИО" value={nameInput.value} onChange={nameInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Почта">
               <Input inputType="email" inputName="email" inputText="Введите почту" value={emailInput.value} onChange={emailInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Телефон">
               <Input inputType="tel" inputName="phone" inputText="Введите номер телефона" value={phoneInput.value} onChange={phoneInput.onChange}/>
            </InputWithLabel>
            <div className="modal__label">
               <span className="modal__input-name">Пол</span>
               <div className="modal__some-inputs">
                  <label className="checkbox modal__checkbox">
                     <span>Мужской</span>
                     <input className="visually-hidden checkbox__input" type="radio" name="sex" value="male"/>
                     <div className="checkbox__check"></div>
                  </label>
                  <label className="checkbox modal__checkbox">
                     <span>Женский</span>
                     <input className="visually-hidden checkbox__input" type="radio" name="sex" value="female"/>
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
               <Select 
                  values={['Не важно', 'Среднее общее', 'Среднее профессиональное', 'Высшее', 'Школьник', 'Студент']}
               />
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Место жительства">
               <Input inputType="text" inputName="sity" inputText="Введите свой город" value={sityInput.value} onChange={sityInput.onChange}/>
            </InputWithLabel>
            <InputWithLabel labelClass="modal__label" labelTitle="Семейное положение">
               <Select 
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

            <div className="modal__bottom-btns">
               <button className="button-reset button modal__btn modal__close" type="button" data-modal-close>Отмена</button>
               <button className="button-reset button modal__btn modal__ready" type="submit">Готово</button>
            </div>
         </form>
      </div>
   )
}
export default ModalAddRespond;