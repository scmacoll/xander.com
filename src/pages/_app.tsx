import { BrowserRouter as Router } from 'react-router-dom';
import '.././app/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Router>
      <Component {...pageProps} />
    </Router>
  );
}

export default MyApp;
