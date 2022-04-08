const dateToAge = (date) => {
   const today = new Date();
   const birthDate = new Date(date);
   let age = today.getFullYear() - birthDate.getFullYear();
   const month = today.getMonth() - birthDate.getMonth(); //если меньше 0, то в текущем году еще не было дня рождения
   if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
   }
   return age;
}
export default dateToAge;