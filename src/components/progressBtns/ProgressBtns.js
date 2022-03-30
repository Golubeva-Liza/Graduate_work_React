import './progressBtns.scss';
import { useMemo, } from 'react';

const ProgressBtns = (props) => {
   const {steps, activeStep} = props;
   //если все шаги пройдены, то activeStep устанавливается в steps + 1

   function renderSteps(num){
      let elements = [];
      for (let i = 1; i <= num; i++) {
         if (i < activeStep){
            elements.push(
               <div className="progress__step progress__step_done" key={i}></div>
            );
         }else if ( i === activeStep){
            elements.push(
               <div className="progress__step progress__step_active" key={i}></div>
            );
         } else{
            elements.push(
               <div className="progress__step" key={i}></div>
            );
         }
         
      }
      return elements;
   }

   const progressSteps = useMemo(() => {
      return renderSteps(steps);
   }, []);

   const lineWidth = activeStep > steps ? '100%' : `${(activeStep - 1) / (steps - 1) * 100}%`
   
   return(
      <div className="progress">
         <div className="progress__line">
            <div className="progress__line-active" style={{width: lineWidth}}></div>
         </div>
         {progressSteps}
      </div>
   )
   
}
export default ProgressBtns;