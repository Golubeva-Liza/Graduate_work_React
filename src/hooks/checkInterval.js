const checkInterval = (intervals, time, date) => {
   let res;

   intervals.forEach(interval => {
      if (interval[1] == date){
         const firstTime = time.split('-')[0].split(':');
         const lastTime = time.split('-')[1].split(':');
         const firstTimeSec = new Date(date).setHours(+firstTime[0], +firstTime[1]);
         const lastTimeSec = new Date(date).setHours(+lastTime[0], +lastTime[1]);

         const firstInterval = interval[0].split('-')[0].split(':');
         const lastInterval = interval[0].split('-')[1].split(':');
         const firstIntervalSec = new Date(interval[1]).setHours(+firstInterval[0], +firstInterval[1]);
         const lastIntervalSec = new Date(interval[1]).setHours(+lastInterval[0], +lastInterval[1]);

         if (firstIntervalSec <= firstTimeSec && lastIntervalSec >= lastTimeSec){
            res = interval;
         } 
      }
   })

   return res;
}
export default checkInterval;