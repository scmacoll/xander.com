import { useEffect } from 'react';
import Router from 'next/router';

const useClearOnRouteChange = (clearFunctions: () => void) => {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!url.includes('/confirm')) {
        clearFunctions();
      }
    };

    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [clearFunctions]);
};

export default useClearOnRouteChange;
