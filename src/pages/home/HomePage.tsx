import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import MenuToggle from '../../components/MenuToggle';
import Navigation from '../../components/Navigation';

const HomePage: React.FC = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Mostrar logo después de 500ms
    const logoTimer = setTimeout(() => {
      setIsLogoVisible(true);
    }, 500);

    // Mostrar contenido después de 5 segundos
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Sección principal con video de fondo */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Video de fondo */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover md:object-cover object-center"
            style={{ 
              filter: 'brightness(0.7) contrast(1.1)',
              minHeight: '100vh',
              minWidth: '100vw'
            }}
          >
            <source src="https://raw.githubusercontent.com/Edwarmo/images/main/videod.mp4" type="video/mp4" />
            {/* Fallback para navegadores que no soportan video */}
            <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800"></div>
          </video>
        </div>

        {/* Overlay más claro */}
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

        {/* Header personalizado para HomePage */}
        <header className="relative z-20 bg-black/20 backdrop-blur-sm p-4 flex justify-between items-center sticky top-0 z-[100] border-b border-white/10 ">
          <div className="flex items-center gap-2 ml-10">
            <img
              src="https://raw.githubusercontent.com/Edwarmo/images/main/Alforja_logo.png"
              alt="Alforja Café Logo"
              className="w-12 md:w-12 h-auto drop-shadow-2xl"
            />
            <h1 className="text-white text-lg font-bold">Alforja Café</h1>
          </div>

          {/* Botón hamburguesa solo en móviles */}
          <MenuToggle isOpen={isMenuOpen} toggle={toggleMenu} />

          {/* Navegación desktop */}
          <div className="hidden md:flex text-white items-center gap-4">
            <Navigation isOpen={true} />
          </div>
        </header>

        {/* Overlay para cerrar el menú móvil */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[110] md:hidden"
            onClick={closeMenu}
          />
        )}

        {/* Menú lateral deslizable para móvil */}
        <div className={`fixed top-0 left-0 h-full w-3/5 max-w-sm bg-black/80 backdrop-blur-md z-[120] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Header del menú lateral */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
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

          {/* Contenido del menú */}
          <div className="p-6">
            <Navigation isOpen={true} />
            
            {/* Información adicional */}
            <div className="mt-8 pt-6 border-t border-white/10">
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
                    <p>• Venta de repuestos</p>
                    <p>• Asesoría técnica</p>
                    <p>• Envío a domicilio</p>
                    <p>• Garantía en productos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <main className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4 md:px-16 py-12 md:py-20">
          
          {/* Logo con animación */}
          <div className={`transition-all duration-1000 ease-out ${
            isLogoVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-75'
          }`}>
            <div className="relative">
              {/* Logo principal */}
              <img
                src="https://raw.githubusercontent.com/Edwarmo/images/main/Alforja_logo.png"
                alt="Alforja Café Logo"
                className="w-32 md:w-44 lg:w-76 h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Espacio grande para el contenido del video */}
          <div className="h-8 md:h-12"></div>

          {/* Contenido secundario con animación */}
          <div className={`transition-all duration-1000 ease-out delay-500 ${
            isContentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mt-8 md:mt-12 space-y-6 md:space-y-8">
              {/* Título principal */}
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 drop-shadow-lg">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Alforja Café
                </span>
              </h1>
              
              {/* Subtítulo */}
              <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                Tu tienda de confianza para cafe de alta calidad
              </p>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                <Link
                  to="/productos"
                  className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Ver Productos
                </Link>
                <Link
                  to="/metodos"
                  className="inline-block px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-bold rounded-xl hover:bg-amber-400 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Nuestros Métodos
                </Link>
              </div>
            </div>

            {/* Características destacadas */}
            <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto px-4">
              <div className="bg-white/20 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-2">Calidad Garantizada</h3>
                  <p className="text-sm md:text-base text-gray-200">
                    Productos de las mejores marcas con garantía de calidad
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-2">Entrega Rápida</h3>
                  <p className="text-sm md:text-base text-gray-200">
                    Envío a domicilio en tiempo récord
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-2">Asesoría Técnica</h3>
                  <p className="text-sm md:text-base text-gray-200">
                    Disponibles para resolver tus dudas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sección de introducción blanca */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
              Bienvenidos a <span className="text-amber-600">Alforja Café</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Somos tu tienda de confianza para cafe de alta calidad. 
              Con experiencia en el sector, ofrecemos productos de las mejor calidad
               y asesoría técnica.
            </p>
          </div>

          {/* Video pequeño */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-48 md:h-64 lg:h-80 object-cover"
                style={{ filter: 'brightness(0.8) contrast(1.1)' }}
              >
                <source src="https://raw.githubusercontent.com/Edwarmo/images/main/videod.mp4" type="video/mp4" />
                {/* Fallback para navegadores que no soportan video */}
                <div className="w-full h-full bg-gradient-to-br from-gray-600 via-gray-500 to-gray-700"></div>
              </video>
              
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Nuestra Misión</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Proporcionar cafe de la más alta calidad, 
                ofreciendo un servicio excepcional y asesoría técnica 
                para mantener tu cafe en óptimas condiciones.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Nuestros Valores</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Calidad, confianza y compromiso con nuestros clientes. 
                Trabajamos con las mejores marcas del mercado para garantizar 
                la durabilidad y el sabor de cada producto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
