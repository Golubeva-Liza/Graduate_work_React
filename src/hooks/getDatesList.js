const getDatesList = (firstDate, lastDate) => {
   //формата '2017-02-01'

   const listDate = [];
   const dateMove = new Date(firstDate);
   let strDate = firstDate;
   
   while (strDate < lastDate) {
     strDate = dateMove.toISOString().slice(0, 10);
     listDate.push(strDate);
     dateMove.setDate(dateMove.getDate() + 1);
   };
   
   return listDate;
} 
export default getDatesList;