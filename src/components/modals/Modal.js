import './modal.scss';
import { useState, useMemo, useEffect } from 'react';

const Modal = ({children, modalClass, active, setActive}) => {

   return (
      // modal_respond
      <div className={`modal ${modalClass}`} onClick={() => setActive(false)}>
         <div className="modal__body" onClick={e => e.stopPropagation()}>
            {children}
         </div>
      </div>
   )
}
export default Modal;