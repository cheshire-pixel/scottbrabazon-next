import {Fragment} from 'react';
import Head from 'next/head'
import Work from '../components/Work';

// scottbrabazon.com/projects

export default function WorkPage() {
  return (

    <Fragment>

      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Scott Brabazon | Web Design & Development Portfolio | Northwest England</title>
        <meta 
          name="description" 
          content="Explore my portfolio of web design and frontend development projects. From sleek user interfaces to powerful digital solutions, see how I bring ideas to life." 
        />
        <meta name="author" content="Scott Brabazon" />
        <meta property="og:title" content="Scott Brabazon | Web Design & Development Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.scott-brabazon.com/work" />
        <meta 
          property="og:description" 
          content="Discover my latest web design and development projects, showcasing clean code, responsive designs, and user-friendly experiences." 
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Work />

    </Fragment>

  )
}
