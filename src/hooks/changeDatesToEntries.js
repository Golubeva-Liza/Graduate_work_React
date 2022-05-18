const changeDatesToEntries = (proj) => {
   const duration = +proj.duration * 60 * 1000;

   let arr = [];

   proj.dates.forEach(interval => {
      //interval - массив вида ['11:00-19:00', '2022-05-15']
      if (new Date(interval[1]) < new Date(new Date().setHours(3, 0, 0, 0))){
         return;
      }
      
      const firstTime = interval[0].split(':');
      const lastTime = interval[1].split(':');
      const firstDateSec = new Date(interval[2]).setHours(+firstTime[0], +firstTime[1]);
      const lastDateSec = new Date(interval[2]).setHours(+lastTime[0], +lastTime[1]);

      const res = splitInterval(firstDateSec, lastDateSec, duration);

      let find = arr.find(el => el.date == interval[2]);
      if (find){
         let arr = find.intervals.concat(res);
         find.intervals = arr;
      } else {
         arr.push({date: interval[2], intervals: res})
      }
   })

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

   proj.dates = arr;
   return proj;
}
export default changeDatesToEntries;