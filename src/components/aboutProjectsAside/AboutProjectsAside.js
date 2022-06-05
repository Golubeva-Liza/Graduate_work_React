import './aboutProjectsAside.scss';

const AboutProjectsAside = ({project}) => {

   return (
      <section className="about-project">
         <h2 className="about-project__title">{project.projectName}</h2>

         <div className="about-project__descr">
            {project.descr.split('\n\n').map((item, id) => (
               <p key={id}>
                  {item}
               </p>
            ))}
         </div>

         <div className="about-project__info">
            Адрес: <span>{project.address}</span> 
         </div>
      </section>
   )
}
export default AboutProjectsAside;