import { useState, useRef, useEffect } from 'react';
import useBookmeService from '../../services/BookmeService';
import useFetchError from '../../hooks/useFetchError';

import './otherModals.scss';
import Button from '../button/Button';


const ModalDelete = ({setModalActive, removal, whatDelete, info, deleteSubmit, onClose}) => {

   const closeModal = () => {
      setModalActive(false);
      if (onClose){
         onClose();
      };
   }

   return (
      <div className="modal__content modal-delete__content" onClick={e => e.stopPropagation()}>
         <h3 className="modal__title">Удаление {removal}</h3>

         <p>Вы точно хотите удалить <span>{whatDelete}</span>{info}?</p>

         <div className="modal__bottom-btns">
            <Button buttonClass="modal__btn modal__close" onClick={closeModal}>Отмена</Button>
            <Button red buttonClass="modal__btn modal__ready" onClick={deleteSubmit} type="submit">
               Удалить
            </Button>
         </div>
      </div>
   )
}
export default ModalDelete;