import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//AL CAMBIAR DE PÁGINA ME LLEVA AUTOMÁTICAMENTE AL INICIO
const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
};

export default ScrollTop;
