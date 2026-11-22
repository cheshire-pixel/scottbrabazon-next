import { useState } from 'react';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from 'next/image';
import WorkThumbnail from './WorkThumbnail';
import useFadeLeft from '../hooks/useFadeLeft';
import useStickyFilter from '../hooks/useStickyFilter';

const Work = ({ projects }) => {
	const [selectedTag, setSelectedTag] = useState('');

	// Scroll back to the projects section
	const scrollToBeacon = () => {
		const beacon = document.getElementById("beacon-1");
		if (beacon) {
			beacon.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Handle tag selection from dropdown
	const handleTagChange = (event) => {
		const newTag = event.target.value;
		setSelectedTag(newTag);

		// Remove all active classes
		document.querySelectorAll('.project.active').forEach(el => el.classList.remove('active'));

		// Reapply the active class after a short delay
		setTimeout(() => {
			document.querySelectorAll('.fade-left, .fade-up').forEach(el => el.classList.add('active'));
		}, 50);

		// Scroll to beacon-1
		scrollToBeacon();
	};

	useFadeLeft();
	useStickyFilter();

	const filteredProjects = selectedTag
		? projects.filter(project => project.projectTag?.includes(selectedTag))
		: projects;

	return (
		<div className="work">
		<div className="work-container grid-container">
			<div className="col-1 fade-left">
				<div className="filter-container grid-container">
					<label htmlFor="tagFilter">Filter:</label>
					<select id="tagFilter" onChange={handleTagChange} value={selectedTag}>
						<option value="">All</option>
						{projects
							.flatMap(project => project.projectTag)
							.filter((value, index, self) => self.indexOf(value) === index)
							.map(tag => (
								<option key={tag} value={tag}>{tag}</option>
							))}
					</select>
				</div>
				<div id="beacon-1"></div>
			</div>

			<div className="home-intro intro fade-left">
					<Image
						src="/img/quote.svg"
						alt="Quote"
						className="quote"
						width="50"
						height="50"
					/>
					<p><strong>Take a look at some of my recent projects!</strong> I design and develop modern, responsive websites that not only look great but also feel effortless to use. Every project is unique, tailored to fit the client&rsquo;s needs while ensuring a smooth, engaging experience for users. Whether it&rsquo;s a portfolio, an online store, or a custom solution, I focus on creativity, functionality, and attention to detail.</p>
				</div>

			<div className="content grid-container">
				{filteredProjects.map((project, index) => (
					<WorkThumbnail
						name={project.name}
						href={project.href}
						img={project.img?.url}
						tag={project.projectTag?.join(', ')}
						description={documentToReactComponents(project.projectDescription?.json)}
						lightbox={project.lightboxCollection}
						key={index}
						index={index}
					/>
				))}
			</div>
		</div>
		</div>
	);
};

export default Work;
