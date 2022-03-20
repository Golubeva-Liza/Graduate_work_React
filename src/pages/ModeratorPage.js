import HeaderSide from '../components/headerSide/HeaderSide';
import RespondDbSettings from '../components/respondDbSettings/RespondDbSettings';
import RespondDb from '../components/respondDb/RespondDb';
import Modal from '../components/modals/Modal';
import ModalAddRespond from '../components/modals/ModalAddRespond';

const ModeratorPage = () => {
   return (
      <>
         <div className='wrapper'>
            <HeaderSide/>
            <RespondDbSettings/>
            <RespondDb/>
         </div>
         <Modal modalClass={'modal_respond'}>
            <ModalAddRespond/>
         </Modal>
      </>
   )
}
export default ModeratorPage;