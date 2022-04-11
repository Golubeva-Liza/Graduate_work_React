import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
// import {LoginPage, ModeratorPage, SettingsPage, ProjectsPage, RespondPage} from '../pages';
import {RespondPage} from '../pages';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ModeratorPage = lazy(() => import('../pages/ModeratorPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));

const App = () => {
   
   return (
      <Router>
         <div className = "App">
            <Suspense fallback={'Загрузка...'}>
               <Routes>
                  <Route path='/' element={<LoginPage/>}/>

                  <Route path='/moderator' element={<ModeratorPage/>}/>
                  <Route path='/settings' element={<SettingsPage/>}/>
                  <Route path='/projects' element={<ProjectsPage/>}/>

                  <Route path='/respondent' element={<RespondPage/>}/>

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
