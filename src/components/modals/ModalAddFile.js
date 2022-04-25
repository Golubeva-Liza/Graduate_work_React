import { useState, useRef, useEffect } from 'react';
import useBookmeService from '../../services/BookmeService';

import './otherModals.scss';
import { UploadIcon, DefaultUser } from '../../resources'; 


const ModalAddFile = ({modalActive, setModalActive, user, setUser}) => {
   const uploadBtn = useRef();
   const form = useRef();
   const {updateUserData} = useBookmeService();

   const [image, setImage] = useState('');

   useEffect(() => {
      if(modalActive){
         setImage('');
      }
   }, [modalActive])

   const onUpload = (e) => {
      if (!e.target.files.length){
         return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
         setImage(event.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
   }

   const formSubmit = () => {
      const formData = new FormData(form.current);
      formData.append("id", user[1]);

      updateUserData(formData).then(res => {
         if (res !== 'error'){
            const updatedUser = [...user.slice(0, 4), res];
            setUser(updatedUser);
            setImage('');
            setModalActive(false);
         }
      });
   }

   return (
      <div className="modal__content modal-add-file__content" onClick={e => e.stopPropagation()}>
         <div className={`modal-add-file__upload ${image ? 'disabled' : ''}`}>
            <button className="button-reset modal-add-file__arrow">
               <UploadIcon/>
            </button>
            <h3 className="modal-add-file__title">Добавить файлы</h3>
            <span className="modal-add-file__descr">Drag & Drop или</span>
         </div>

         <div className={`modal-add-file__photo ${image ? '' : 'disabled'}`}>
            <img src={image ? image : DefaultUser} alt="Загруженный файл"/>
            {/* <button className="button-reset" onClick={removePhoto}>Удалить</button> */}
         </div>
         
         <form className="modal__form" method="POST" ref={form} onSubmit={e => e.preventDefault()} encType="multipart/form-data">
            <input ref={uploadBtn} className="visually-hidden" type="file" name="photo" onChange={onUpload} accept=".png,.jpg,.jpeg"/>
            <button className="button-reset button button_linear modal__btn modal-add-file__btn" type="button" onClick={() => uploadBtn.current.click()}>Выбрать файл</button>
            <button className={`button-reset button modal__btn modal-add-file__save ${image ? '' : 'disabled'}`} type="submit" onClick={formSubmit}>Сохранить</button>
         </form>
      </div>
   )
}
export default ModalAddFile;