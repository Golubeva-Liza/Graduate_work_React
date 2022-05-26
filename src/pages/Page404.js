import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
   const {projectId} = useParams();
   let navigate = useNavigate();

   useEffect(() => {
      setTimeout(() => navigate('/'), 3000);
   }, []);
   
   return (
      <main>
         Такой страницы не существует
      </main>
   )
}
export default Page404;