import { useState, useRef, useEffect } from 'react';
import useBookmeService from '../../services/BookmeService';

import './otherModals.scss';


const ModalSetTime = ({setModalActive, date, time}) => {

   return (
      <div className="modal__content modal-set-time__content" onClick={e => e.stopPropagation()}>
         {date}, {time}
      </div>
   )
}
export default ModalSetTime;