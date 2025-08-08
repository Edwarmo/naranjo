import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  isOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`flex-col md:flex-row md:flex md:items-center ${isOpen ? 'flex' : 'hidden'} md:gap-6 gap-6`}>
      <Link 
        to="/" 
        className={`transition-colors duration-200 text-lg md:text-base ${
          isActive('/') 
            ? 'text-orange-400 font-semibold' 
            : 'text-white hover:text-yellow-300'
        }`}
      >
        Inicio
      </Link>
      <Link 
        to="/productos" 
        className={`transition-colors duration-200 text-lg md:text-base ${
          isActive('/productos') 
            ? 'text-orange-400 font-semibold' 
            : 'text-white hover:text-yellow-300'
        }`}
      >
        Productos
      </Link>
      <Link 
        to="/metodos" 
        className={`transition-colors duration-200 text-lg md:text-base ${
          isActive('/metodos') 
            ? 'text-orange-400 font-semibold' 
            : 'text-white hover:text-yellow-300'
        }`}
      >
        Métodos
      </Link>
      <Link 
        to="/nosotros" 
        className={`transition-colors duration-200 text-lg md:text-base ${
          isActive('/nosotros') 
            ? 'text-orange-400 font-semibold' 
            : 'text-white hover:text-yellow-300'
        }`}
      >
        Nosotros
      </Link>
    </nav>
  );
};

export default Navigation;
