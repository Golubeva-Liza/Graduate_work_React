import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HeaderSide from '../components/headerSide/HeaderSide';
import Loader from '../components/loader/Loader';

const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const RespondDBPage = lazy(() => import('../pages/RespondDBPage'));

const ModeratorPage = ({setUser}) => {

   return (
      <div className='wrapper'>
         <HeaderSide/>
         <Suspense fallback={<Loader classes="main-loader"/>}>
            <Routes>
               <Route path='/' element={<RespondDBPage/>}/>
               <Route path='/settings' element={<SettingsPage setUser={setUser}/>}/>
               <Route path='/projects' element={<ProjectsPage/>}/>
            </Routes>
         </Suspense>
      </div>
   )
}
export default ModeratorPage;