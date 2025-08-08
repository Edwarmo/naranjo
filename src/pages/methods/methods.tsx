import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../components/cartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  image?: string;
}

const Methods: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Simular carga de datos
    const mockProducts: Product[] = [
      {
        id: 101,
        name: 'Método V60',
        description: 'Filtro de papel cónico para extracción limpia y clara',
        price: 15.99,
        type: 'metodo',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
      },
      {
        id: 102,
        name: 'AeroPress',
        description: 'Método de inmersión con presión para café concentrado',
        price: 29.99,
        type: 'metodo',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'
      },
      {
        id: 103,
        name: 'Chemex',
        description: 'Filtro de vidrio para café limpio y aromático',
        price: 45.99,
        type: 'metodo',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'
      },
      {
        id: 104,
        name: 'Moka Express',
        description: 'Cafetera italiana para espresso casero',
        price: 35.99,
        type: 'metodo',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
      },
      {
        id: 105,
        name: 'French Press',
        description: 'Método de inmersión para café de cuerpo completo',
        price: 25.99,
        type: 'metodo',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'
      },
      {
        id: 106,
        name: 'Kalita Wave',
        description: 'Filtro de papel ondulado para extracción uniforme',
        price: 18.99,
        type: 'metodo',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'
      }
    ];

    setProducts(mockProducts);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      type: product.type,
      basePrice: product.price
    });
  };

  return (
    <section className="bg-gray-950 text-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="text-yellow-300">Métodos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubre las diferentes formas de preparar café y encuentra el método que mejor se adapte a tus preferencias. 
            Cada método ofrece una experiencia única y sabores distintos.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-gray-900 p-5 rounded-xl shadow hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              {/* Product Image */}
              <div className="h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h4 className="text-lg font-bold text-yellow-300 mb-3">{product.name}</h4>
              <p className="text-gray-300 mb-4 flex-1">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <p className="text-green-400 font-semibold text-lg">${product.price.toLocaleString('es-CO')}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-semibold"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">¿Por qué elegir diferentes métodos?</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Cada método extrae diferentes compuestos del café
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Control total sobre la preparación
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Experimenta con diferentes sabores y aromas
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">•</span>
                Personaliza tu experiencia de café
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Recomendaciones</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <h4 className="font-semibold text-green-400">Para principiantes:</h4>
                <p className="text-sm">French Press o AeroPress</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Para entusiastas:</h4>
                <p className="text-sm">V60 o Chemex</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Para espresso casero:</h4>
                <p className="text-sm">Moka Express</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methods;
