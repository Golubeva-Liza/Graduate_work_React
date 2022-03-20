import HeaderSide from '../components/headerSide/HeaderSide';
import RespondDbSettings from '../components/respondDbSettings/RespondDbSettings';
import RespondDb from '../components/respondDb/RespondDb';

const ModeratorPage = () => {
   return (
      <div className='wrapper'>
         <HeaderSide/>
         <RespondDbSettings/>
         <RespondDb/>
      </div>
      
   )
}
export default ModeratorPage;