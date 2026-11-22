import {Fragment} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {

   const router = useRouter();
   const currentPage = router.pathname === '/' ? 'home' : router.pathname.split('/')[1];

   return (

      <Fragment>
         
         <nav id="nav" className={`grid-container ${currentPage}`}>

            <div className="nav-container">

               <div className="nav-links">

                  <Link href="/" legacyBehavior passHref>
                     <a className={router.pathname == "/" ? "selected" : ""}>home</a>
                  </Link>

                  <Link href="/work" legacyBehavior passHref>
                     <a className={router.pathname == "/work" ? "selected" : ""}>work</a>
                  </Link>

                  <Link href="/about" legacyBehavior passHref>
                     <a className={router.pathname == "/about" ? "selected" : ""}>about</a>
                  </Link>

               </div>

               <div className="social-links">


                  <Link href="https://www.linkedin.com/in/scottbrabazon/" legacyBehavior passHref>
                     <a target="_blank" rel="noopener noreferrer">
                        <Image 
                           src="/img/linkedin.svg" 
                           alt="Linkedin" 
                           className="social-logo"
                           width="20"
                           height="20"
                        />
                     </a>
                  </Link>

                  <Link href="mailto:scott.brabazon@googlemail.com" legacyBehavior passHref>
                     <a target="_blank" rel="noopener noreferrer">
                        <Image 
                           src="/img/email.svg" 
                           alt="Email" 
                           className="social-logo"
                           width="20"
                           height="20"
                        />
                     </a>
                  </Link>

               </div>

            </div>
            
         </nav>

      </Fragment>

   );
}

export default Nav;
