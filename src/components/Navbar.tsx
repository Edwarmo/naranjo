import React, { useState } from 'react';
import MenuToggle from './MenuToggle';
import Navigation from './Navigation';
import { useCart } from './cartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-black/40 backdrop-blur-md p-4 flex justify-between items-center relative sticky top-0 z-[100] border-b border-white/30">
        <div className="flex items-center gap-2 ml-10">
          <img
            src="https://raw.githubusercontent.com/Edwarmo/images/main/Alforja_logo.png"
            alt="Alforja Café Logo"
            className="w-12 md:w-12 h-auto drop-shadow-2xl"
          />
          <h1 className="text-white text-lg font-bold">Alforja Café</h1>
        </div>

        <MenuToggle isOpen={isOpen} toggle={toggleMenu} />

        <div className="hidden md:flex text-white items-center gap-4">
          <Navigation isOpen={true} />
        </div>
      </header>

      {/* Overlay para cerrar el menú */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[110] md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Menú lateral deslizable */}
      <div className={`fixed top-0 left-0 h-full w-3/5 max-w-sm bg-black/90 backdrop-blur-md z-[120] transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <h2 className="text-white text-xl font-bold">Menú</h2>
          <button
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <Navigation isOpen={true} />
          
          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Información</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Horario: Lun - Vie 8:00 - 18:00</p>
                  <p>Teléfono: (123) 456-7890</p>
                  <p>Email: info@alforja.com</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Servicios</h3>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>• Venta de cafe</p>
                  <p>• Asesoría técnica</p>
                  <p>• Envío a domicilio</p>
                  <p>• Garantía en productos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;