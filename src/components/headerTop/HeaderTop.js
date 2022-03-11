import './headerTop.scss';

const HeaderTop = () => {
   return (
      <header className="header-top">
         <div className="container">
            <p className="header-top__name">BookMe</p>
            <button className="button-reset header-top__sign-up">Зарегистрироваться</button>
         </div>
      </header>
   )
}
export default HeaderTop;