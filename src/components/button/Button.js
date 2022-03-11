import './button.scss';

const Button = (props) => {
   const {children, type, buttonClass, linear, onClick } = props;

   const buttonClasses = buttonClass ? buttonClass : '';
   let isLinearClass = '';

   if (linear){
      isLinearClass = 'button_linear';
   } 

   return (
      <button 
         className={`button-reset button ${isLinearClass} ${buttonClasses}`} 
         type={type}
         onClick={onClick}
      >
         {children}
      </button>
   )
}
export default Button;