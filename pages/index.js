import { Fragment } from 'react';
import Home from '../components/Home';
import Head from 'next/head';
import { getProjects } from '../lib/projects';
import { SITE_ORIGIN } from '../lib/seo';

const canonicalUrl = `${SITE_ORIGIN}/`;

export default function HomePage({ projects }) {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Scott Brabazon | Frontend Developer & Web Designer | Northwest England</title>
        <meta 
          name="description" 
          content="I'm Scott Brabazon, a frontend developer and web designer based in Northwest England. I craft modern, responsive websites that deliver seamless user experiences. Let’s bring your ideas to life!" 
        />
        <meta name="author" content="Scott Brabazon" />
        <meta property="og:title" content="Scott Brabazon | Frontend Developer & Web Designer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <meta 
          property="og:description" 
          content="I create high-performance, user-friendly websites with clean code and thoughtful design. Based in Northwest England, I help businesses stand out online." 
        />
        <link rel="preload" href="/fonts/general-sans/GeneralSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Home projects={projects} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const projects = (await getProjects()).filter(project => project.featured === true);
  return { props: { projects }, revalidate: 3600 };
}
