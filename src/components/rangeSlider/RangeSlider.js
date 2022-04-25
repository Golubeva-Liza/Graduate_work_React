import './rangeSlider.scss';
import { useState, useMemo, useRef, useEffect } from 'react';

const RangeSlider = ({age, setAge, clearAge, setClearAge}) => {
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(100);

   const leftInput = useRef();
   const rightInput = useRef(); 
   const leftValue = useRef();
   const rightValue = useRef(); 
   const progressLine = useRef(); 
   const gap = useMemo(() => (15), []);

   useEffect(() => {
      // console.log(minValue, maxValue);
      let leftPercent = (minValue / leftInput.current.max) * 100 + '%';
      let rightPercent = 100 - (maxValue / rightInput.current.max) * 100 + '%';

      progressLine.current.style.left = leftPercent;
      progressLine.current.style.right = rightPercent;
      leftValue.current.style.left = leftPercent;
      rightValue.current.style.left = (maxValue / rightInput.current.max) * 100 + '%';

   }, [minValue, maxValue])

   const onInputsChange = (e) => {
      if (e.target == leftInput.current){
         if ((maxValue - e.target.value < gap)){
            setMinValue(+maxValue - gap);
            // setAge(age => [+maxValue - gap, age[1]]);
         } else {
            setMinValue(+e.target.value);
            // setAge(age => [+e.target.value, age[1]]);
         }
      }else{
         if ((e.target.value - minValue < gap)){
            setMaxValue(+minValue + gap);
            // setAge(age => [age[0], +minValue + gap]);
         } else {
            setMaxValue(+e.target.value);
            // setAge(age => [age[0], +e.target.value]);
         }
      }
   }
   const inputsMouseUp = () => {
      if (age[0] !== minValue || age[1] !== maxValue){
         setAge([minValue, maxValue]);
      }
   }
   
   useEffect(() => {
      if (clearAge){
         console.log('очистка возраста')
         setMinValue(0);
         setMaxValue(100);
         setClearAge(false);
      }
   }, [clearAge]);

   return (
      <div className="range-slider">
         <div className="range-slider__values">
            <div className="range-slider__value" ref={leftValue} >
               <span>{minValue}</span>
            </div>
            <div className="range-slider__value" ref={rightValue}>
               <span>{maxValue}</span>
            </div>
         </div>

         <div className="range-slider__line">
            <div className="range-slider__progress" ref={progressLine}></div>
         </div>
         
         <div className="range-slider__inputs">
            <input className="range-slider__min" type="range" min="0" max="100"
               onChange={onInputsChange} value={minValue} ref={leftInput}
               onMouseUp={inputsMouseUp}
            />
            <input className="range-slider__max" type="range" min="0" max="100" 
               onChange={onInputsChange} value={maxValue} ref={rightInput}
               onMouseUp={inputsMouseUp}
            />
         </div>
         
      </div>
   )
}
export default RangeSlider;