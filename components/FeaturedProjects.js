import Link from 'next/link';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import WorkThumbnail from "./WorkThumbnail";
import useHorizontalScroll from '../hooks/useHorizontalScroll';

const FeaturedProjects = ({ projects }) => {
  useHorizontalScroll();

  return (
    <section className="featured-projects grid-container">
      <div className="content">
        <h2>Featured <br className="break-mobile" />projects</h2>
      </div>

      <div className="projects-container">
        <div className="inner-container">
          {projects.map((project, index) => (
            <WorkThumbnail
              name={project.name}
              href={project.href}
              img={project.img?.url}
              tag={project.projectTag?.join(", ")}
              description={documentToReactComponents(project.projectDescription?.json)}
              lightbox={project.lightboxCollection}
              key={index}
              index={index}
            />
          ))}

          <Link href="/work" className="view-all" style={{ textDecoration: 'none' }}>
            <div className="view-all-container">
              View all
            </div>
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
