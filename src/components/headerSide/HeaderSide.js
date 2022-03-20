import './headerSide.scss';
import { HeaderArrow, Calendar, Respond, Settings, ProfilePhoto } from '../../resources';

import { Link, NavLink } from 'react-router-dom';

const HeaderSide = () => {
   return (
      <header className="header">
         <button className="button-reset header__arrow">
            <HeaderArrow/>
         </button>
         <div className="header__profile-photo">
            <img src={ProfilePhoto} alt="avatar"/>
         </div>
         <div className="main-title header__profile-name">
            Лиза Голубева
         </div>
         <nav className="header__nav">
            <ul className="header__list">
               <li className="header__item">
                  <NavLink end className={({ isActive }) => "header__link" + (isActive ? " header__item_active" : "")} to="/projects">
                     <Calendar className="header__icon"/>
                     <span className="main-title header__nav-text">Проекты</span>
                  </NavLink>
               </li>
               <li className="header__item">
                  <NavLink end className={({ isActive }) => "header__link" + (isActive ? " header__item_active" : "")} to="/moderator">
                     <Respond className="header__icon"/>
                     <span className="main-title header__nav-text">Респонденты</span>
                  </NavLink>
               </li>
               <li className="header__item">
                  <NavLink end className={({ isActive }) => "header__link" + (isActive ? " header__item_active" : "")} to="/settings">
                     <Settings className="header__icon"/>
                     <span className="main-title header__nav-text">Настройки</span>
                  </NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}
export default HeaderSide;