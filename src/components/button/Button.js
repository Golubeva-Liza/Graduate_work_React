import './button.scss';

const Button = (props) => {
   const {children, type, buttonClass, linear, onClick, red, disabled} = props;

   return (
      <button 
         className={`button-reset button${linear ? ' button_linear' : ''} ${buttonClass ? buttonClass : ''} ${red ? ' button_red' : ''}`} 
         type={type ? type : 'button'}
         onClick={onClick}
         disabled={disabled ? disabled : false}
      >
         {children}
      </button>
   )
}
export default Button;