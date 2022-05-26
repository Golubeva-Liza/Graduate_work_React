import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import App from './app/App';


ReactDOM.render(
   // <React.StrictMode>
   //    <App />
   // </React.StrictMode>,
   <Router>
      <App />
   </Router>,
   document.getElementById('root')
);
