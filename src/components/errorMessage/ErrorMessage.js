import './errorMessage.scss';
const ErrorMessage = ({message, warning}) => {
   return (
      <div className={`error-hint ${warning ? "warning" : ""}`}>{message}</div>
   )
}
export default ErrorMessage;