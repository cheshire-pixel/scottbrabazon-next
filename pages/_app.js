import '../styles/style.css';
import Layout from '../components/Layout';
import Analytics from '../components/Analytics';

function MyApp({ Component, pageProps }) {

  return (
    <div className="main-container">
      <div className="gradient-bg"></div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </div>
  );
}

export default MyApp;
