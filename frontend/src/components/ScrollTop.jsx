import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// AL CAMBIAR DE PÁGINA ME LLEVA AUTOMÁTICAMENTE AL INICIO
const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollTop;
