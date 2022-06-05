import './headerSide.scss';
import { HeaderArrow, Calendar, Respond, Settings, DefaultUser } from '../../resources';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../hooks/context';
import useAddressValues from '../../hooks/useAddressValues';

import { NavLink } from 'react-router-dom';

const HeaderSide = () => {
   const user = useContext(AuthContext);
   const {imagesUrl} = useAddressValues();
   const [headerClosed, setHeaderClosed] = useState(localStorage.getItem('headerClosed') == 'true' ? true : false);

   const toggleMenu = () => {
      setHeaderClosed(!headerClosed);
   }

   useEffect(() => {
      localStorage.setItem('headerClosed', headerClosed);
   }, [headerClosed])


   return (
      <header className={headerClosed ? "header closed" : "header"}>
         <button className="button-reset header__arrow" onClick={toggleMenu}>
            <HeaderArrow/>
         </button>
         <div className={`header__profile-photo${user.img ? "" : " default"}`}>
            <img src={user.img ? `${imagesUrl}${user.img}` : DefaultUser} alt="avatar"/>
         </div>
         <div className="main-title header__profile-name">
            {user.name}
         </div>
         <nav className="header__nav">
            <ul className="header__list">
               <li className="header__item">
                  <NavLink end className={({ isActive }) => "header__link" + (isActive ? " header__item_active" : "")} to="/moderator/projects">
                     <Calendar className="header__icon"/>
                     <span className="main-title header__nav-text">Проекты</span>
                  </NavLink>
               </li>
               <li className="header__item">
                  <NavLink end className={({ isActive }) => "header__link" + (isActive ? " header__item_active" : "")} to="/moderator/">
                     <Respond className="header__icon"/>
                     <span className="main-title header__nav-text">Респонденты</span>
                  </NavLink>
               </li>
               <li className="header__item">
                  <NavLink end className={({ isActive }) => "header__link" + (isActive ? " header__item_active" : "")} to="/moderator/settings">
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