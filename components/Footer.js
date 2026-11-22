import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useFadeRight from '../hooks/useFadeRight';

const Footer = () => {
   const year = new Date().getFullYear();
   const router = useRouter();

   useEffect(() => {
      // Remove all active classes in the footer when navigating to a new page
      const footer = document.querySelector('footer');
      if (footer) {
         footer.querySelectorAll('.active').forEach((el) => el.classList.remove('active'));
      }

      // Select elements to be observed
      const elements = document.querySelectorAll('.fade-left, .fade-right .fade-up, .line');

      // Create observer
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('active');
               }
            });
         },
         { threshold: 0.1 } // Adjust threshold as needed
      );

      // Observe each element
      elements.forEach((el) => observer.observe(el));

      // Cleanup function to disconnect observer on unmount
      return () => observer.disconnect();
   }, [router.pathname]); // Reset on page change
   useFadeRight();

   return (
      <footer className="footer grid-container">
         <div className="row-2">
            <p className="footer-headline">
               <span className="fade-left">
                  Ready to make a digital impact?
                  <br className="break-desktop" />
               </span>
               <span className="bg-image-text fade-right">
                  Let&apos;s create something unforgettable!
               </span>
            </p>
         </div>

         <div className="row-1 fade-up">
            <div>
               <p className="phone">
                  phone: <a href="tel:+447963657287">+44 (0)796&nbsp;365&nbsp;7287</a>
               </p>
               <p className="linkedin">
                  linkedin:&nbsp;
                  <a href="https://www.linkedin.com/in/scottbrabazon/">view profile</a>
               </p>
               <p className="email">
                  email:&nbsp;
                  <a href="mailto:scott.brabazon@googlemail.com">
                     scott.brabazon@googlemail.com
                  </a>
               </p>
            </div>
         </div>

         <div className="row-3 fade-up">
            <div className="line-container">
               <div className="line"></div>
            </div>
            <div className="row-3-container">
               <p>&copy; <span>{year}</span> Scott Brabazon</p>

               <div className="nav-links">
                  <Link href="/" legacyBehavior>
                     <a className={router.pathname === '/' ? 'selected' : ''}>home</a>
                  </Link>

                  <Link href="/work" legacyBehavior>
                     <a className={router.pathname === '/work' ? 'selected' : ''}>work</a>
                  </Link>

                  <Link href="/about" legacyBehavior>
                     <a className={router.pathname === '/about' ? 'selected' : ''}>about</a>
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
