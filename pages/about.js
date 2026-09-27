import {Fragment} from 'react';
import Head from 'next/head'
import About from '../components/About';

// scottbrabazon.com/projects

export default function AboutPage() {
  return (

    <Fragment>

      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>About Scott Brabazon | Frontend Developer & Designer | Northwest England</title>
        <meta 
          name="description" 
          content="Learn more about Scott Brabazon, a frontend developer and web designer based in Northwest England. With 20+ years in the creative industry, I specialize in crafting modern, high-performing websites." 
        />
        <meta name="author" content="Scott Brabazon" />
        <meta property="og:title" content="About Scott Brabazon | Frontend Developer & Designer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.scott-brabazon.com/about" />
        <meta 
          property="og:description" 
          content="With over two decades of experience, I help businesses elevate their digital presence through expert frontend development and design." 
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <About />

    </Fragment>

  )
}
