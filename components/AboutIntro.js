import Image from 'next/image';
import { useEffect, useRef } from 'react';
import useFadeLeft from '../hooks/useFadeLeft';

const AboutIntro = () => {

   useFadeLeft();

    return (
        <div className="grid-container fade-left">
            <div className="about-intro col-1">
                <div>
                    <p className="phone">phone: <a href="tel:+447963657287">+44 (0)796 365 7287</a></p>
                    <p className="linkedin">linkedin: <a href="https://www.linkedin.com/in/scottbrabazon/">view profile</a></p>
                    <p className="email">email: <a href="mailto:scott.brabazon@googlemail.com">scott.brabazon@googlemail.com</a></p>
                </div>
            </div>
            <div className="home-intro intro">
                <Image 
                   src="/img/quote.svg" 
                   alt="Quote" 
                   className="quote"
                   width="50"
                   height="50"
                />
               <p><strong>I&rsquo;m a frontend developer and designer passionate about creating websites that are not only visually striking but also highly functional. </strong> With expertise in HTML, CSS, JavaScript, and custom built CMS, I specialize in building custom websites that are fast, accessible, and intuitive to navigate. From crafting user-friendly designs to ensuring seamless performance, my goal is to deliver websites that not only look great but also help businesses thrive in today&rsquo;s digital world.
                </p>

            </div>
        </div>
    );
}

export default AboutIntro;
