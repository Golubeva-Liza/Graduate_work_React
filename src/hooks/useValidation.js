import { useMemo } from "react";

const useValidation = () => {
   const scrollIntoTop = (modal) => {
      modal.scrollIntoView({
         behavior: "smooth"
      });
   }

   const regForEmail = useMemo(() => {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   }, []);

   const respondDbValidation = (modal, name, email, phone, date, age) => {
      const phoneNum = phone.replace(/[^0-9]/g,"");
      const dateInputNum = date.replace(/[^0-9]/g,"");
      if (name.length < 3 || name.length >= 50){
         scrollIntoTop(modal);
         return 'Имя пользователя должно быть длиной от 3 до 50 символов';
         
      } else if (!regForEmail.test(String(email).toLocaleLowerCase())){
         scrollIntoTop(modal);
         return 'Введите корректный почтовый адрес';

      } else if(phoneNum.length !== 11){
         scrollIntoTop(modal);
         return 'Введите корректный номер телефона';

      } else if (!dateInputNum && !age){
         scrollIntoTop(modal);
         return 'Укажите возраст или дату рождения';
      } else if (dateInputNum && (date.split('.')[0] > 31 || date.split('.')[1] > 12
         || date.split('.')[2] > new Date().getFullYear() 
         || date.split('.')[2].replace(/[^0-9]/g,"") < new Date().getFullYear() - 100)){
         scrollIntoTop(modal);
         return 'Укажите корректную дату рождения';
      } //если день > 31, если месяц > 12, если год больше текущего, если год раньше, чем 100 лет назад

      return true;
   }

   return {respondDbValidation};
}

export default useValidation;