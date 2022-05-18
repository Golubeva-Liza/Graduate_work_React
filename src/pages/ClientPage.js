import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const ClientPage = () => {
   const {projectId} = useParams();

   // useEffect(() => {
   //    if (localStorage.getItem('authorized')){
   //       navigate('/moderator');
   //    }
   // }, []);
   
   return (
      <>
         <main>
            {projectId}
         </main>
      </>
      
   )
}
export default ClientPage;