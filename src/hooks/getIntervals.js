const getIntervals = (selectedDays, duration) => {
   
   selectedDays.forEach(el => {
      let newIntervals = [];

      el.intervals.forEach(item => {
         const firstTime = item.split('-')[0].split(':');
         const lastTime = item.split('-')[1].split(':');
         const firstDateSec = new Date(el.date).setHours(+firstTime[0], +firstTime[1]);
         const lastDateSec = new Date(el.date).setHours(+lastTime[0], +lastTime[1]);

         const res = splitInterval(firstDateSec, lastDateSec, duration * 60 * 1000);
         newIntervals = [...newIntervals, ...res];
      });
      
      el.intervals = newIntervals;
      console.log(el.intervals);
   })
   // console.log(selectedDays[0], duration);

   // selectedDays[0].intervals.forEach(item => {
   //    const firstTime = item.split('-')[0].split(':');
   //    const lastTime = item.split('-')[1].split(':');
   //    const firstDateSec = new Date(selectedDays[0].date).setHours(+firstTime[0], +firstTime[1]);
   //    const lastDateSec = new Date(selectedDays[0].date).setHours(+lastTime[0], +lastTime[1]);

   //    const res = splitInterval(firstDateSec, lastDateSec, duration * 60 * 1000);
   //    // res.forEach(el => console.log(new Date(el)));
   //    console.log(item, res);
   // })

   function splitInterval(start, end, step) {
      let result = [];
      
      for (let ts = start; ts <= end; ts += step) {
         const minutes = new Date(ts).getMinutes() < 10 ? `0${new Date(ts).getMinutes()}` : new Date(ts).getMinutes();
         const thisTime = `${new Date(ts).getHours()}:${minutes}`;
         const nextMinutes = new Date(ts + step).getMinutes() < 10 ? `0${new Date(ts + step).getMinutes()}` : new Date(ts + step).getMinutes();
         const nextTime = `${new Date(ts + step).getHours()}:${nextMinutes}`;

         if (ts + step <= end){
            result.push(`${thisTime}-${nextTime}`);
         }
      }
      
      return result;
   }
   
   return selectedDays;
   // let start = 1595902440886; // начальное время
   // let end   = 1595904296582; // конечное время
   // let step  = 2 * 60 * 1000; // шаг в милисекундах (2 минуты)
   
   // let result = splitInterval(start, end, step);
   
   // console.log('Start: ' + (new Date(start)).toLocaleString());
   // console.log('End:   ' + (new Date(end)).toLocaleString());

   // for (let i = 0; i < result.length; ++i) {
   //    console.log('Step ' + i + ': ' + (new Date(result[i])).toLocaleString());
   // }
}
export default getIntervals;