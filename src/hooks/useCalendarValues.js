import { useMemo } from 'react';
const useCalendarValues = () => {

   const monthsNames = useMemo(() => [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
      "Сетрябрь", "Октрябрь", "Ноябрь", "Декабрь"
   ], []);

   const monthsForDays = useMemo(() => [
      "января", "февраля", 
      "марта", "апреля", "мая", 
      "июня", "июля", "августа",
      "сетрября", "октрября", "ноября", "декабря"
   ], []);

   return {monthsNames, monthsForDays};
}

export default useCalendarValues;