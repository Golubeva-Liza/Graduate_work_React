import { useMemo } from "react";

const useValidation = () => {
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


   const registrationValid = (name, email, password) => {
      if (name.length < 3 || name.length >= 30){
         return 'Имя пользователя должно быть длиной от 3 до 30 символов';
         
      } else if (!regForEmail.test(String(email).toLocaleLowerCase())){
         return 'Введите корректный почтовый адрес';

      } else if(password.length < 6 || password.length > 30){
         return 'Пароль должен быть длиной от 6 до 30 символов';
      }
      return true;
   }

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
               return 'Имя пользователя должно быть длиной от 3 до 30 символов';
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

         default:
            break;
      }
      // && regForLink.length > 0
   }

   // const respondDbValidation = (modal, name, email, phone, date, age) => {
   //    const phoneNum = phone.replace(/[^0-9]/g,"");
   //    const dateInputNum = date.replace(/[^0-9]/g,"");
   //    if (name.length < 3 || name.length >= 50){
   //       scrollIntoTop(modal);
   //       return 'Имя пользователя должно быть длиной от 3 до 50 символов';
         
   //    } else if (!regForEmail.test(String(email).toLocaleLowerCase())){
   //       scrollIntoTop(modal);
   //       return 'Введите корректный почтовый адрес';

   //    } else if(phoneNum.length !== 11){
   //       scrollIntoTop(modal);
   //       return 'Введите корректный номер телефона';

   //    } else if (!dateInputNum && !age){
   //       scrollIntoTop(modal);
   //       return 'Укажите возраст или дату рождения';
   //    } else if (dateInputNum && (date.split('.')[0] > 31 || date.split('.')[1] > 12
   //       || date.split('.')[2] > new Date().getFullYear() 
   //       || date.split('.')[2].replace(/[^0-9]/g,"") < new Date().getFullYear() - 100)){
   //       scrollIntoTop(modal);
   //       return 'Укажите корректную дату рождения';
   //    } //если день > 31, если месяц > 12, если год больше текущего, если год раньше, чем 100 лет назад

   //    return true;
   // }
   const respondDbValidation = (modal, name, email, phone, date, age) => {
      const phoneNum = phone.replace(/[^0-9]/g,"");
      const dateInputNum = date.replace(/[^0-9]/g,"");
      if (!dateInputNum && !age){
         scrollIntoTop(modal);
         return 'Укажите возраст или дату рождения';
      } else if (dateInputNum && (date.split('.')[0] > 31 || date.split('.')[1] > 12
         || date.split('.')[2] > new Date().getFullYear() 
         || date.split('.')[2].replace(/[^0-9]/g,"") < new Date().getFullYear() - 100)){
         scrollIntoTop(modal);
         return 'Укажите корректную дату рождения';
      }

      return true;
   }

   const projectDataValidation = (modal, projName, descr, address, durationRadio, firstDate, lastDate) => {
      if (projName.length < 5 || projName.length >= 50){
         scrollIntoTop(modal);
         return 'Название проекта должно быть длиной от 5 до 50 символов';
         
      } else if (!descr){
         scrollIntoTop(modal);
         return 'Описание не должно быть пустым';

      } else if (!address){
         scrollIntoTop(modal);
         return 'Адрес не должен быть пустым';

      } else if (!durationRadio){
         scrollIntoTop(modal);
         return 'Выберите длительность тестирования';

      } else if (!firstDate || !lastDate){
         scrollIntoTop(modal);
         return 'Выберите период тестирования';
      }

      return true;
   }

   return {respondDbValidation, projectDataValidation, registrationValid, loginValid, fieldsValid};
}

export default useValidation;