import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from '../header/Header';
import './App.scss';
import {LoginPage, ModeratorPage} from '../pages';

const App = () => {
   
   return (
      <Router>
         <div className = "App">
            {/* <Header /> */}
            <Routes>
               <Route path='/' element={<LoginPage/>}/>
               <Route path='/moderator' element={<ModeratorPage/>}/>
               {/* вручную прописываем этот id */}
               {/* <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
               <Route path='*' element={<Page404/>}/> */}
            </Routes>
         </div>
      </Router>
   )
}

export default App;
