import { useState, useRef, useEffect } from 'react';
import useBookmeService from '../../services/BookmeService';
import useFetchError from '../../hooks/useFetchError';

import './otherModals.scss';
import { UploadIcon, DefaultUser } from '../../resources'; 
import Button from '../button/Button';


const ModalAddFile = ({modalActive, setModalActive, user, setUser}) => {
   const uploadBtn = useRef();
   const form = useRef();
   const {universalRequest} = useBookmeService();
   const {isFetchError} = useFetchError();

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

      formData.set('userKey', localStorage.getItem('userKey'));
      formData.set('authKey', localStorage.getItem('authKey'));

      universalRequest('updateUserData', formData).then(res => {

         const isError = isFetchError(res);
         if (!isError){
            const updatedUser = {...user};
            updatedUser.img = res.imgName;
            setUser(updatedUser);
            setImage('');
            setModalActive(false);

         } else{
            console.log(res);
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
         </div>
         
         <form className="modal__form" method="POST" ref={form} onSubmit={e => e.preventDefault()} encType="multipart/form-data">
            <input ref={uploadBtn} className="visually-hidden" type="file" name="photo" onChange={onUpload} accept=".png,.jpg,.jpeg"/>
            <Button buttonClass="modal__btn modal-add-file__btn" linear onClick={() => uploadBtn.current.click()}>Выбрать файл</Button>
            <Button buttonClass={`modal__btn modal-add-file__save ${image ? '' : 'disabled'}`} onClick={formSubmit}>Сохранить</Button>
         </form>
      </div>
   )
}
export default ModalAddFile;