import './headerSide.scss';
import { HeaderArrow, Calendar, Respond, Settings, ProfilePhoto, DefaultUser } from '../../resources';
import { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

const HeaderSide = ({user}) => {
   const [headerClosed, setHeaderClosed] = useState(false);

   const [userName, setUserName] = useState('');
   const [userImg, setUserImg] = useState(DefaultUser);

   const toggleMenu = () => {
      setHeaderClosed(!headerClosed);
   }

   useEffect(() => {
      if (user){
         setUserName(user[2]);
      }
      // console.log(user);
   }, [user])

   return (
      <header className={headerClosed ? "header closed" : "header"}>
         <button className="button-reset header__arrow" onClick={toggleMenu}>
            <HeaderArrow/>
         </button>
         <div className={`header__profile-photo${user[4] ? "" : " default"}`}>
            <img src={user[4] ? `http://localhost/bookme-server/images/${user[4]}` : DefaultUser} alt="avatar"/>
         </div>
         <div className="main-title header__profile-name">
            {userName}
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