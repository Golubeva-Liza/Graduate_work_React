import './rangeSlider.scss';
import { useState, useMemo, useRef, useEffect } from 'react';

const RangeSlider = (props) => {
   // const {values} = props;
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(100);

   const leftInput = useRef();
   const rightInput = useRef(); 
   const leftValue = useRef();
   const rightValue = useRef(); 
   const progressLine = useRef(); 
   const leftValueNum = useRef(); 
   const rightValueNum = useRef();
   const gap = useMemo(() => (15), []);

   useEffect(() => {
      // console.log(minValue, maxValue);
      let leftPercent = (minValue / leftInput.current.max) * 100 + '%';
      let rightPercent = 100 - (maxValue / rightInput.current.max) * 100 + '%';

      progressLine.current.style.left = leftPercent;
      progressLine.current.style.right = rightPercent;
      leftValue.current.style.left = leftPercent;
      rightValue.current.style.left = (maxValue / rightInput.current.max) * 100 + '%';
      leftValueNum.current.innerHTML = minValue;
      rightValueNum.current.innerHTML = maxValue;

   }, [minValue, maxValue])

   const onInputsChange = (e) => {
      if (e.target == leftInput.current){
         if ((maxValue - e.target.value < gap)){
            setMinValue(+maxValue - gap);
         } else {
            setMinValue(+e.target.value);
         }
      }else{
         if ((e.target.value - minValue < gap)){
            setMaxValue(+minValue + gap);
         } else {
            setMaxValue(+e.target.value);
         }
      }
   }
   
   return (
      <div className="range-slider">
         <div className="range-slider__values">
            <div className="range-slider__value" ref={leftValue} >
               <span ref={leftValueNum}>15</span>
            </div>
            <div className="range-slider__value" ref={rightValue}>
               <span ref={rightValueNum}>60</span>
            </div>
         </div>

         <div className="range-slider__line">
            <div className="range-slider__progress" ref={progressLine}></div>
         </div>
         
         <div className="range-slider__inputs">
            <input className="range-slider__min" type="range" min="0" max="100" onChange={onInputsChange} value={minValue} ref={leftInput}/>
            <input className="range-slider__max" type="range" min="0" max="100" onChange={onInputsChange} value={maxValue} ref={rightInput}/>
         </div>
         
      </div>
   )
}
export default RangeSlider;