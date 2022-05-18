import './entryReady.scss';

const EntryReady = ({}) => {
   
   return (
      <div className="entry-ready">
         <h2 className="entry-ready__title">Запись подтверждена</h2>

         <h3 className="entry-ready__proj">Проект 1</h3>

         <p className="entry-ready__name">Голубева Лиза</p>
         <p className="entry-ready__info">9:00-10:00, 25 декабря 2019, среда </p>

         <p className="entry-ready__comment">На вашу почту отправлено письмо с информацией о записи. За 1 день до события придёт подтверждающее письмо.</p>
      </div>
   )
}
export default EntryReady;