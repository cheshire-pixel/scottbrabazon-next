import FeaturedProjects from './FeaturedProjects';
import HomeIntro from './HomeIntro';
import Montage from './Montage';
import Clients from './Clients';

const Home = ({ projects }) => {
   
   return (

      <div className="home">
         <HomeIntro />
         <FeaturedProjects projects={projects} />
         <Montage />
         <Clients />
      </div>

   );
}

export default Home;
