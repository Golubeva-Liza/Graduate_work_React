import './input.scss';

const Input = (props) => {
   // console.log(props);
   const {inputType, inputName, inputText, inputComplete, inputClass, onChange, value} = props;

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
         
      />
   )
}
export default Input;