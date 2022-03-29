import './modal.scss';
// import { useState, useMemo, useEffect } from 'react';

const Modal = ({children, modalClass, active, setActive, outClick}) => {
   const activeClass = active ? 'active' : '';
   return (
      <div className={`modal ${modalClass} ${activeClass}`}>
         <div className="modal__body" onClick={outClick ? () => setActive(false) : null}>
            {children}
         </div>
      </div>
   )
}
export default Modal;