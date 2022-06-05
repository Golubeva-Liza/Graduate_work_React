import { useMemo, useState } from "react";

const useValidation = () => {
   const [errorMessage, setErrorMessage] = useState({});

   const scrollIntoTop = (modal) => {
      modal.scrollIntoView({
         behavior: "smooth"
      });
   }

   const regForEmail = useMemo(() => {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
   }, []);

   const regForLink = useMemo(() => {
      return /(https?:\/\/forms\.gle\/([-a-zA-Z0-9()@:%_\+.~#?&\\=]*)|https?:\/\/docs\.google\.com\/forms\/([-a-zA-Z0-9()@:%_\+.~#?&\\=]*))/;
      // return /(https:\/\/docs.google.com\forms\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\\=]*)| https?:\/\/forms.gle\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\\=]*))/gi;
   }, []);

   const sqlInjection = useMemo(() => {
      return /((\%3D)|(=))|((\%27)|(\'))|(\-\-)|(\%3B)|(;)|(\*)/i;
   })


   const loginValid = (email, password) => {
      if (!regForEmail.test(String(email).toLocaleLowerCase())){
         return 'Введите корректный почтовый адрес';

      } else if(password.length === 0){
         return 'Пароль не должен быть пустым';
      }
      return true;
   }

   const fieldsValid = (field, value) => {
      switch(field) {
         case 'name':
            if (value.length < 3 || value.length >= 30){
               return 'Имя должно быть длиной от 3 до 30 символов';
            } else {return true}
            
         case 'email':
            return !regForEmail.test(String(value).toLocaleLowerCase()) ? 'Введите корректный почтовый адрес' : true;

         case 'phone':
            return value.replace(/[^0-9]/g,"").length !== 11 ? 'Введите корректный номер телефона' : true;

         case 'birthdayDate':
            if (value.replace(/[^0-9]/g,"") && (value.split('.')[0] > 31 || value.split('.')[1] > 12
            || value.split('.')[2] > new Date().getFullYear() 
            || value.split('.')[2].replace(/[^0-9]/g,"") < new Date().getFullYear() - 100)){
               return 'Укажите корректную дату рождения'
            } else { return true }

         case 'age':
            return value > 100 ? 'Укажите корректный возраст' : true;

         case 'sity':
            return sqlInjection.test(String(value)) ? 'Поле ввода содержит недопустимые символы' : true;

         case 'projName':
            if (value.length < 3 || value.length >= 60){
               return 'Название проекта должно быть длиной от 3 до 60 символов';
            } else if (sqlInjection.test(String(value))){
               return 'Поле ввода содержит недопустимые символы';
            } else {return true}

         case 'descr':
            if (value.length < 10 || value.length >= 400){
               return 'Описание должно быть длиной от 10 до 400 символов';
            } else if (sqlInjection.test(String(value))){
               return 'Поле ввода содержит недопустимые символы';
            } else {return true}
         
         case 'projAddress':
            return sqlInjection.test(String(value)) ? 'Поле ввода содержит недопустимые символы' : true;
         
         case 'duration':
            return sqlInjection.test(String(value)) ? 'Поле ввода содержит недопустимые символы' : true;
         
         case 'projFormLink':
            return !regForLink.test(String(value)) && value.length > 0 ? 'Неккоректная ссылка для Google формы' : true;

         case 'newPass':
            return value.length < 6 || value.length >= 60 ? 'Пароль должен быть длиной от 6 до 30 символов' : true;

         case 'comment':
            return sqlInjection.test(String(value)) ? 'Поле ввода содержит недопустимые символы' : true;

         case 'password':
            return value.length < 6 || value.length >= 30 ? 'Пароль должен быть длиной от 6 до 30 символов' : true;

         default:
            break;
      }
   }

   const validation = (e) => {
      const validRes = fieldsValid(e.target.name, e.target.value);
      let error = {};
      if (validRes === true){
         Object.assign(error, errorMessage);
         delete error[e.target.name];
         setErrorMessage({...error});
      } else {
         error[e.target.name] = validRes;
         setErrorMessage(errorMessage => ({...errorMessage, ...error}));
      }
   }


   const timeValid = (field, whatField, index, prevField) => {
      //при whatField == first  prevField = конечное время из предыдущего интервала
      //при whatField == last  prevField = начальное время текущего интервала

      if (field.replace(/[^\d]/g, '') && field.replace(/[^\d]/g, '').length !== 4){
         return 'Введите корректное время';
      }

      if (whatField == 'first'){
         if (prevField && +prevField.replace(/[^\d]/g, '') >= +field.replace(/[^\d]/g, '')){
            return 'Начальное время следующего интервала должно быть больше предыдущего';
         }
      } else {
         if (prevField.replace(/[^\d]/g, '') && !field.replace(/[^\d]/g, '')){
            return 'Введите конечное время';
         } else if (field.length && +prevField.replace(/[^\d]/g, '') >= +field.replace(/[^\d]/g, '')){
            return 'Конечное время интервала должно быть больше начального';
         }
      }

      return true;
   }

   const timeValidation = (field, whatField, index, prevField) => {

      const validRes = timeValid(field, whatField, index, prevField);
      let error = {};
      if (validRes === true){
         Object.assign(error, errorMessage);
         delete error[`${whatField}${index}`];
         setErrorMessage({...error});
      } else {
         error[`${whatField}${index}`] = validRes;
         setErrorMessage(errorMessage => ({...errorMessage, ...error}));
      }
   }


   return {loginValid, fieldsValid, validation, errorMessage, setErrorMessage, scrollIntoTop, timeValidation};
}

export default useValidation;