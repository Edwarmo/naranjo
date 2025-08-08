import React, { useState } from 'react';
import Navigation from './Navigation';
import MenuToggle from './MenuToggle';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface HeaderProps {
  cartItems: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="bg-amber-800 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Alforja</h1>

        <div className="md:hidden">
          <MenuToggle isOpen={menuOpen} toggle={toggleMenu} />
        </div>

        <div className="hidden md:flex md:items-center gap-6">
          <Navigation isOpen={true} />
        </div>

        <div className="relative ml-4">
          <span className="text-lg">Carrito ({totalItems})</span>
        </div>
      </div>

      {/* Menú móvil */}
      <div className="md:hidden mt-4">
        <Navigation isOpen={menuOpen} />
      </div>
    </header>
  );
};

export default Header;
