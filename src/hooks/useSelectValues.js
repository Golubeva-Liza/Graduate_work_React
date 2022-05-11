import { useMemo } from 'react';
const useSelectValues = () => {

   const educationValues = useMemo(() => (
      [
         'Не важно', 
         'Начальное общее', //? первые 4 класса
         'Основное общее', // 9 классов
         'Среднее общее', //11 классов
         'Среднее профессиональное', //колледж
         'Высшее бакалавриат', 
         'Высшее магистратура', 
         // 'Нет образования' //?
      ]
   ), [])

   const familyStatusValues = useMemo(() => (
      [
         'Не важно', 
         'Разведен(а)', 
         'Состоит в браке', 
         'В отношениях', 
         'Не в отношениях'
      ]
   ), [])

   const genderValues = useMemo(() => (
      [
         'Не важно', 
         'Мужской', 
         'Женский'
      ]
   ), [])

   return {educationValues, familyStatusValues, genderValues};
}

export default useSelectValues;