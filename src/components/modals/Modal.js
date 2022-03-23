import './modal.scss';
// import { useState, useMemo, useEffect } from 'react';

const Modal = ({children, modalClass, active, setActive}) => {
   const activeClass = active ? 'active' : '';
   return (
      <div className={`modal ${modalClass} ${activeClass}`}>
         <div className="modal__body">
            {children}
         </div>
      </div>
   )
}
export default Modal;