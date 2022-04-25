const selectValues = () => {
   const educationValues = [
      'Не важно', 
      'Начальное общее', //? первые 4 класса
      'Основное общее', // 9 классов
      'Среднее общее', //11 классов
      'Среднее профессиональное', //колледж
      'Высшее бакалавриат', 
      'Высшее магистратура', 
      // 'Нет образования' //?
   ]

   const familyStatusValues = [
      'Не важно', 
      'Разведен(а)', 
      'Состоит в браке', 
      'В отношениях', 
      'Не в отношениях'
   ]

   return {educationValues, familyStatusValues};
}

export default selectValues;