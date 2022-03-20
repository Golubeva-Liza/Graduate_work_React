import './inputWithLabel.scss';

const InputWithLabel = (props) => {
   const {labelClass, labelTitle, children} = props;

   const labelClasses = labelClass ? labelClass : '';

   return (
      <label className={`form-label ${labelClasses}`}>
         <span>{labelTitle}</span>
         {children}
      </label>
   )
}
export default InputWithLabel;