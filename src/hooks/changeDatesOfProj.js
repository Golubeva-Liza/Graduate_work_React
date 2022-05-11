const changeDatesOfProj = (proj) => {
   let arr = [];
   proj.dates.forEach(interval => {
      let find = arr.find(el => el.date == interval[1]);
      if (find){
         find.intervals.push(interval[0])
      } else {
         arr.push({date: interval[1], intervals: [interval[0]]})
      }
   })
   proj.dates = arr;
   return proj;
}
export default changeDatesOfProj;