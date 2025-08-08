import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../components/cartContext';

interface ProductOption {
  name: string;
  value: string;
  price?: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  image?: string;
  options?: {
    roast?: {
      name: string;
      options: { value: string; price?: number }[];
    };
    grind?: {
      name: string;
      options: { value: string; price?: number }[];
    };
    [key: string]: any;
  };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<ProductOption[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app this would come from API
  const product: Product = {
    id: parseInt(id || '1'),
    name: 'Café Colombiano Premium',
    description: 'Café de origen colombiano con notas de chocolate y frutos rojos. Perfecto para espresso y métodos de filtrado.',
    price: 25.99,
    type: 'cafe',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    options: {
      roast: {
        name: 'Nivel de Tostión',
        options: [
          { value: 'Clara', price: 0 },
          { value: 'Media', price: 1.50 },
          { value: 'Alta', price: 2.00 }
        ]
      },
      grind: {
        name: 'Tipo de Molienda',
        options: [
          { value: 'Fina', price: 0 },
          { value: 'Media', price: 0.50 },
          { value: 'Gruesa', price: 1.00 }
        ]
      }
    }
  };

  const handleOptionChange = (optionName: string, value: string, price: number = 0) => {
    setSelectedOptions(prev => {
      const filtered = prev.filter(option => option.name !== optionName);
      return [...filtered, { name: optionName, value, price }];
    });
  };

  const calculateTotalPrice = () => {
    const optionsPrice = selectedOptions.reduce((sum, option) => sum + (option.price || 0), 0);
    return (product.price + optionsPrice) * quantity;
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotalPrice();
    addToCart({
      id: product.id,
      name: product.name,
      price: totalPrice,
      quantity,
      type: product.type,
      options: selectedOptions,
      basePrice: product.price
    });
    navigate('/productos');
  };

  const isCoffee = product.type === 'cafe';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/productos')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Volver a Productos
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={product.image || 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'}
                alt={product.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-amber-600">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500 ml-2">precio base</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Coffee Options */}
              {isCoffee && product.options && (
                <div className="space-y-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Personaliza tu Café</h3>
                  
                  {Object.entries(product.options).map(([key, option]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {option.name}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {option.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleOptionChange(option.name, opt.value, opt.price)}
                            className={`p-3 text-sm rounded-lg border transition-colors ${
                              selectedOptions.find(o => o.name === option.name && o.value === opt.value)
                                ? 'border-amber-500 bg-amber-50 text-amber-700'
                                : 'border-gray-300 hover:border-amber-300'
                            }`}
                          >
                            <div className="font-medium">{opt.value}</div>
                            {opt.price && opt.price > 0 && (
                              <div className="text-xs text-gray-500">+${opt.price.toFixed(2)}</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Other Product Options */}
              {!isCoffee && product.options && (
                <div className="space-y-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Opciones Disponibles</h3>
                  
                  {Object.entries(product.options).map(([key, option]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {option.name}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {option.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleOptionChange(option.name, opt.value, opt.price)}
                            className={`p-3 text-sm rounded-lg border transition-colors ${
                              selectedOptions.find(o => o.name === option.name && o.value === opt.value)
                                ? 'border-amber-500 bg-amber-50 text-amber-700'
                                : 'border-gray-300 hover:border-amber-300'
                            }`}
                          >
                            <div className="font-medium">{opt.value}</div>
                            {opt.price && opt.price > 0 && (
                              <div className="text-xs text-gray-500">+${opt.price.toFixed(2)}</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total Price */}
              <div className="border-t pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
                {selectedOptions.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    Incluye: {selectedOptions.map(opt => opt.value).join(', ')}
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
