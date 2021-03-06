import './input.scss';

const Input = (props) => {
   const {inputType, inputName, inputText, inputComplete, inputClass, onChange, value, onBlur} = props;

   //проверяет, передан ли данный пропс: если нет, то по умолчанию выключено автозаполнение у input
   const isComplete = inputComplete ? "on" : "off";

   const inputClasses = inputClass ? inputClass : '';

   return (
      <input 
         className={`input ${inputClasses}`}
         type={inputType}
         name={inputName}
         placeholder={inputText}
         autoComplete={isComplete}
         value={value}
         onChange={onChange}
         onBlur={onBlur ? onBlur : null}
      />
   )
}
export default Input;