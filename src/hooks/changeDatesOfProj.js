const changeDatesOfProj = (proj) => {
   let arr = [];
   proj.dates.forEach(interval => {
      let find = arr.find(el => el.date == interval[2]);
      if (find){
         find.intervals.push(`${interval[0]}:${interval[1]}`);
      } else {
         arr.push({date: interval[2], intervals: [`${interval[0]}:${interval[1]}`]});
      }
   })
   proj.dates = arr;
   return proj;
}
export default changeDatesOfProj;