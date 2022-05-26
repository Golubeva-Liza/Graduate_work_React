import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../hooks/context';

const PrivateRoute = ({children}) => {
   const user = useContext(AuthContext);
   console.log(user);
   return (
      <>
         {!user ? <Navigate to="/"/> : children}
      </>
   );
} 
export default PrivateRoute;

// const LoginRoute = ({children}) => {
//    const user = useContext(AuthContext);

//    return (
//       <>
//          {!user ? <Navigate to="/moderator"/> : children}
//       </>
//    );
// } 
// export {LoginRoute};