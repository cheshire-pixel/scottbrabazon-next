import Link from 'next/link';
import AboutIntro from './AboutIntro';
import useFadeUp from '../hooks/useFadeUp';

const About = ({match}) => {

	useFadeUp();
   
   return (

	   <section className="about">

	   	<AboutIntro />
			
			<div className="expertise grid-container fade-up">

				<div className="title">
					<h2>Technical expertise</h2>
				</div>

				<div className="tech-col">
					<h3>#1 <span className="bg-image-text">Tech</span></h3>
					<ul>
						<li>HTML</li>
						<li>CSS (SCSS)</li>
						<li>Javascript</li>
						<li>JQuery</li>
						<li>GIT</li>
						<li>Gulp</li>
						<li>Animation (GSAP)</li>
						<li>React.js</li>
						<li>Next.js</li>
						<li>Email</li>
						<li>Bootstrap</li>
						<li>Anthropic Claude</li>
						<li>OpenAI Codex</li>
					</ul>
				</div>
				<div className="platforms-col">
					<h3>#2 <span className="bg-image-text">Platforms</span></h3>
					<ul>
						<li>Contentful</li>
						<li>SilverStripe CMS</li>
						<li>Aurora Commerce</li>
						<li>Shopify</li>
						<li>Craft CMS</li>
						<li>Wordpress</li>
						<li>Monetate</li>
						<li>Mailchimp</li>
						<li>Campaign Monitor</li>
						<li>Emarsys</li>
						<li>Slack</li>
						<li>Trello</li>
						<li>Jira</li>
					</ul>
				</div>
				<div className="software-col">
					<h3>#3 <span className="bg-image-text">Software</span></h3>
					<ul>
						<li>Adobe Photoshop</li>
						<li>Adobe Illustrator</li>
						<li>Adobe InDesign</li>
						<li>Adobe XD</li>
						<li>Microsoft Office</li>
						<li>Figma</li>
						<li>Cinema 4D</li>
					</ul>
				</div>
			</div>
		</section>
   );
}

export default About;
