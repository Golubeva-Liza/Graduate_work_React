import './headerTop.scss';
import { NavLink } from 'react-router-dom';

const HeaderTop = () => {
   return (
      <header className="header-top">
         <div className="container">
            <p className="header-top__name">BookMe</p>
            <NavLink end to="/">
               <button className="button-reset header-top__sign-up">Зарегистрироваться</button>
            </NavLink>
         </div>
      </header>
   )
}
export default HeaderTop;