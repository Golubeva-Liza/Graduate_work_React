import { lazy, Suspense, useState, useEffect, createContext, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import useBookmeService from '../services/BookmeService';
import useFetchError from '../hooks/useFetchError';

import Loader from '../components/loader/Loader';
import Page404 from '../pages/Page404';
import './App.scss';
import AuthContext from '../hooks/context';
import PrivateRoute from '../components/privateRoute/PrivatePoute';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ModeratorPage = lazy(() => import('../pages/ModeratorPage'));
const RespondPage = lazy(() => import('../pages/RespondPage'));
const ClientPage = lazy(() => import('../pages/ClientPage'));
// const Page404 = lazy(() => import('../pages/Page404'));



const {Provider} = AuthContext;

const App = () => {
   const {universalRequest} = useBookmeService();
   const navigate = useNavigate();
   const {isFetchError} = useFetchError();

   const [user, setUser] = useState('');

   const onLogin = (res) => {
      // console.log(res);
      if (res.key){
         setUser({
            'name': res.name, 
            'email': res.email,
            'img': res.img
         });

         sessionStorage.setItem('userKey', res.userId);
         sessionStorage.setItem('authKey', res.key);

         navigate('/moderator');
      }
   };

   useEffect(() => {
      //авторизация, если содержатся ключи в sessionStorage

      if (sessionStorage.getItem('userKey') && sessionStorage.getItem('authKey')){
         const obj = {
            "user": sessionStorage.getItem('userKey'),
            "key": sessionStorage.getItem('authKey')
         };
         universalRequest('getLoggedUser', JSON.stringify(obj)).then(onUserLoad);
         
      }else{
         navigate('/');
      }
   }, []);

   const onUserLoad = (res) => {
      const isError = isFetchError(res);
      if (!isError){
         setUser({
            'name': res.name, 
            'email': res.email,
            'img': res.img
         });
      }else{
         console.log(res);
      }
   }


   return (
      <Provider value={user}>
         <div className = "App">
            <Suspense fallback={<Loader classes="main-loader"/>}>
               <Routes>
                  <Route path='/' element={<LoginPage onLogin={onLogin}/>}/>
                  <Route path='/moderator/*' element={
                     <ModeratorPage setUser={setUser}/>
                  }/>
                  {/* сделать проверку, если нет значений */}
                  <Route path='/projects/:projectId' element={<RespondPage/>}/>
                  <Route path='/:projectHash' element={<ClientPage/>}/>

                  <Route path='*' element={<Page404/>}/>
               </Routes>
            </Suspense>
         </div>
      </Provider>
   )
}

export default App;
