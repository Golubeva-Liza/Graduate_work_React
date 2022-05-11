import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useBookmeService from '../services/BookmeService';


import './App.scss';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ModeratorPage = lazy(() => import('../pages/ModeratorPage'));
const RespondPage = lazy(() => import('../pages/RespondPage'));


const App = () => {
   const {universalRequest} = useBookmeService();
   const [user, setUser] = useState('');

   useEffect(() => {
      if (localStorage.getItem('authorized')){
         universalRequest('getLoggedUser', localStorage.getItem('authorized'))
            .then(res => {
               setUser(res[0]);
            })
      }
   }, []);

   return (
      <Router>
         <div className = "App">
            <Suspense fallback={'Загрузка...'}>
               <Routes>
                  <Route path='/' element={<LoginPage/>}/>

                  <Route path='/moderator/*' element={<ModeratorPage user={user} setUser={setUser}/>}/>

                  {/* <Route path='/respondent' element={<RespondPage/>}/> */}
                  <Route path='/projects/:projectId' element={<RespondPage/>}/>

                  {/* вручную прописываем этот id */}
                  {/* <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                  <Route path='*' element={<Page404/>}/> */}
               </Routes>
            </Suspense>
         </div>
      </Router>
   )
}

export default App;
