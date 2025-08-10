import React, { useEffect, useState } from 'react';
import { useCart } from '../../components/cartContext';
import Footer from '../../components/Footer';
interface Method {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  image: string;
  usage: string;
  grind: string;
  ratio: string;
}

const Methods: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { addToCart } = useCart();

  const allMethods: Method[] = [
    {
      id: 101,
      name: 'Método V60',
      description: 'Filtro de papel cónico para extracción limpia y clara',
      price: 15.99,
      type: 'metodo',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
      usage: 'Ideal para resaltar notas florales y frutales. Perfecto para cafés de origen único con perfiles complejos.',
      grind: 'Medio-fino',
      ratio: '1:15 - 1:17'
    },
    {
      id: 102,
      name: 'AeroPress',
      description: 'Método de inmersión con presión para café concentrado',
      price: 29.99,
      type: 'metodo',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
      usage: 'Excelente para viajes y oficina. Produce un café limpio y concentrado en poco tiempo.',
      grind: 'Medio-fino a fino',
      ratio: '1:12 - 1:15'
    },
    {
      id: 103,
      name: 'Chemex',
      description: 'Filtro de vidrio para café limpio y aromático',
      price: 45.99,
      type: 'metodo',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      usage: 'Perfecto para compartir. Elimina aceites y sedimentos, creando un café muy limpio y brillante.',
      grind: 'Medio-grueso',
      ratio: '1:15 - 1:17'
    },
    {
      id: 104,
      name: 'Moka Express',
      description: 'Cafetera italiana para espresso casero',
      price: 35.99,
      type: 'metodo',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
      usage: 'Clásico italiano para un café fuerte y aromático. Ideal para desayunos y después de comidas.',
      grind: 'Medio-fino',
      ratio: '1:7 - 1:10'
    }
  ];

  const methods = allMethods.filter(method => 
    method.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (method: Method) => {
    addToCart({
      id: method.id,
      name: method.name,
      price: method.price,
      quantity: 1,
      type: method.type,
      basePrice: method.price
    });
  };

  return (
    
    <div className="bg-gray-950 text-white">
      {/* Header */}
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Nuestros <span className="text-yellow-300">Métodos</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Cada método tiene una historia única y ofrece una experiencia de café diferente
        </p>
        
        {/* Barra de búsqueda */}
        <div className="flex justify-center px-6 mb-8">
          {showSearch && (
            <input
              type="text"
              placeholder="Buscar método..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => !searchTerm && setShowSearch(false)}
              autoFocus
              className="mr-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/20"
            />
          )}
          <div 
            onClick={() => setShowSearch(!showSearch)}
            className="w-10 h-10 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-700"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Methods Sections */}
      {methods.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No se encontraron métodos que coincidan con tu búsqueda</p>
        </div>
      ) : (
        methods.map((method, index) => {
        // Detectar si es móvil
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
          // Versión móvil sin animaciones
          return (
            <div key={method.id} className={`py-8 px-4 ${index % 2 === 0 ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl p-6 mb-6">
                <style jsx>{`
                  @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                  }
                  @keyframes slideInLeft {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                  }
                  .animate-slide-in-right {
                    animation: slideInRight 0.6s ease-out;
                  }
                  .animate-slide-in-left {
                    animation: slideInLeft 0.6s ease-out;
                  }
                `}</style>
                <img
                  src={method.image}
                  alt={method.name}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <h2 className="text-2xl font-bold text-white text-center mb-6">{method.name}</h2>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-amber-900/95 to-orange-900/85 p-4 rounded-xl backdrop-blur-sm border border-amber-700/30">
                    <h3 className="text-yellow-300 font-bold text-lg mb-3">Maneras de Usar</h3>
                    <p className="text-gray-300 text-sm mb-4">{method.usage}</p>
                    <div className="space-y-2">
                      <p className="text-xs text-amber-400"><strong>Molienda:</strong> {method.grind}</p>
                      <p className="text-xs text-amber-400"><strong>Proporción:</strong> {method.ratio}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-900/95 to-emerald-900/85 p-4 rounded-xl backdrop-blur-sm border border-green-700/30">
                    <h3 className="text-green-400 font-bold text-lg mb-3">{method.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-green-400">
                        ${method.price.toLocaleString('es-CO')}
                      </div>
                      <button
                        onClick={() => handleAddToCart(method)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold shadow-lg"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Versión desktop con animaciones
        const sectionOffset = index * 800;
        const progress = Math.max(0, Math.min(1, (scrollY - sectionOffset) / 600));
        const imageWidth = progress > 0.3 ? '24rem' : '100vw';
        const imageHeight = progress > 0.3 ? '32rem' : '100vh';
        const imageRounded = progress > 0.3 ? 'rounded-2xl' : 'rounded-none';
        const imageTranslateY = progress * 50;
        
        // Animaciones de laberinto: entrada lateral, salida abajo
        const isEven = index % 2 === 0;
        const sideEnter = isEven ? '-translate-x-full' : 'translate-x-full';
        const exitDown = 'translate-y-full opacity-0';
        
        const getEntryDirection = () => {
          const position = index % 3;
          if (position === 0) return progress > 0.1 ? 'translate-x-0' : 'translate-x-full'; // Derecha
          if (position === 1) return progress > 0.1 ? 'translate-x-0' : '-translate-x-full'; // Izquierda
          return progress > 0.1 ? 'translate-y-0' : 'translate-y-full'; // Abajo
        };
        
        return (
          <div 
            key={method.id} 
            className={`h-screen flex justify-center items-center px-6 md:px-20 transition-all duration-1000 ease-out relative ${
              getEntryDirection()
            }`}
            {...(index === 0 ? { 'data-first-method': true } : {})}
          >
            {/* Fondo de colores detrás de la imagen */}
            <div 
              className="absolute inset-0 transition-all duration-1000 ease-out"
              style={{
                background: isEven 
                  ? 'linear-gradient(135deg, rgba(180,83,9,0.6) 0%, rgba(217,119,6,0.4) 100%)'
                  : 'linear-gradient(135deg, rgba(5,150,105,0.6) 0%, rgba(16,185,129,0.4) 100%)',
                borderRadius: '2rem'
              }}
            ></div>

            {/* Contenedor centrado */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Imagen */}
              <div 
                className={`relative transition-all duration-1000 ease-out overflow-hidden shadow-2xl ${imageRounded} mb-4 md:mb-8`}
                style={{
                  width: progress > 0.3 ? 'min(24rem, 90vw)' : '100vw',
                  height: progress > 0.3 ? 'min(32rem, 60vh)' : '50vh',
                  transform: `translateY(${imageTranslateY}px)`
                }}
              >
                <img
                  src={method.image}
                  alt={method.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay con nombre */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                    {method.name}
                  </h2>
                </div>
              </div>

              {/* Contenido centrado debajo de la imagen */}
              <div className={`flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center transition-all duration-700 px-4 ${
                progress > 0.2 ? 'opacity-100' : 'opacity-0'
              }`} style={{
                transform: `translateY(${imageTranslateY}px)`
              }}>
                
                {/* Maneras de Usar */}
                <div className={`transition-all duration-800 ease-out ${
                  progress > 0.15 && progress < 0.85 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : progress <= 0.15 
                      ? `opacity-0 ${sideEnter}` 
                      : exitDown
                }`}>
                  <div className="bg-gradient-to-br from-amber-900/95 to-orange-900/85 p-4 md:p-6 rounded-xl backdrop-blur-sm border border-amber-700/30 w-full max-w-80 mx-auto">
                    <h3 className="text-yellow-300 font-bold text-lg mb-3">Maneras de Usar</h3>
                    <p className="text-gray-300 text-sm mb-4">{method.usage}</p>
                    <div className="space-y-2">
                      <p className="text-xs text-amber-400"><strong>Molienda:</strong> {method.grind}</p>
                      <p className="text-xs text-amber-400"><strong>Proporción:</strong> {method.ratio}</p>
                    </div>
                  </div>
                </div>

                {/* Carrito */}
                <div className={`transition-all duration-800 ease-out delay-100 ${
                  progress > 0.15 && progress < 0.85 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : progress <= 0.15 
                      ? 'opacity-0 translate-x-full' 
                      : exitDown
                }`}>
                  <div className="bg-gradient-to-br from-green-900/95 to-emerald-900/85 p-4 md:p-6 rounded-xl backdrop-blur-sm border border-green-700/30 w-full max-w-80 mx-auto">
                    <h3 className="text-green-400 font-bold text-lg mb-3">{method.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-green-400">
                        ${method.price.toLocaleString('es-CO')}
                      </div>
                      <button
                        onClick={() => handleAddToCart(method)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold shadow-lg"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      })
      )}
      
      <Footer />
    </div>
  );
};

export default Methods;
