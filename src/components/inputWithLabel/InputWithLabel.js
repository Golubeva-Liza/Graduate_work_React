import './inputWithLabel.scss';
import Input from '../input/Input';

const InputWithLabel = (props) => {
   const {labelClass, children} = props;

   const labelClasses = labelClass ? labelClass : '';

   return (
      <label className={`label ${labelClasses}`}>
         <span>{children}</span>
         <Input props={props}/>
      </label>
   )
}
export default InputWithLabel;