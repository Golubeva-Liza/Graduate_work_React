const getDate = (dayNum, monthNum, year) => {
   const day = dayNum < 10 ? `0${dayNum}` : dayNum;
   const month = monthNum + 1 < 10 ? `0${monthNum + 1}` : monthNum + 1;
   const date = `${year}-${month}-${day}`;
   return date;
}

const transformDate = (date) => {
   const year = date.getFullYear();
   const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
   const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
   return `${day}.${month}.${year}`;
}

export {getDate, transformDate};