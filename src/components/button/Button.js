import './button.scss';

const Button = (props) => {
   const {children, type, buttonClass, linear, onClick} = props;

   return (
      <button 
         className={`button-reset button${linear ? ' button_linear' : ''} ${buttonClass ? buttonClass : ''}`} 
         type={type ? type : 'button'}
         onClick={onClick}
      >
         {children}
      </button>
   )
}
export default Button;