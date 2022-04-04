import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from '../header/Header';
import './App.scss';
import {LoginPage, ModeratorPage, SettingsPage, ProjectsPage, RespondPage} from '../pages';

const App = () => {
   
   return (
      <Router>
         <div className = "App">
            {/* <Header /> */}
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
         </div>
      </Router>
   )
}

export default App;
