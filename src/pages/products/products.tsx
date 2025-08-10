import React, { useState } from 'react';
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

const Productos = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<ProductOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Organizar productos por categorías con imágenes y tipos
  const productCategories = {
    'Cafés de Origen': [
      { 
        id: 1, 
        name: 'Café Colombiano Premium', 
        description: "Café de origen colombiano con notas de chocolate y frutos rojos", 
        price: 25.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 2, 
        name: 'Café Guatemalteco', 
        description: "Café de altura con notas cítricas y cuerpo medio", 
        price: 28.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 3, 
        name: 'Café Brasileño', 
        description: "Café suave con notas de nueces y caramelo", 
        price: 22.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
    ],
    'Cafés Especiales': [
      { 
        id: 4, 
        name: 'Café Etíope Yirgacheffe', 
        description: "Café africano con notas florales y cítricas", 
        price: 32.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 5, 
        name: 'Café Peruano Orgánico', 
        description: "Café orgánico de altura con sabor suave y balanceado", 
        price: 29.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 6, 
        name: 'Café Mexicano Chiapas', 
        description: "Café de Chiapas con notas de chocolate y especias", 
        price: 26.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
    ],
    'Mezclas Premium': [
      { 
        id: 7, 
        name: 'Mezcla House Blend', 
        description: "Nuestra mezcla especial con balance perfecto", 
        price: 24.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 8, 
        name: 'Mezcla Espresso', 
        description: "Mezcla perfecta para espresso con crema abundante", 
        price: 27.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 9, 
        name: 'Mezcla Descafeinado', 
        description: "Café descafeinado sin perder sabor y aroma", 
        price: 30.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
    ],
    'Cafés de Temporada': [
      { 
        id: 10, 
        name: 'Café Navideño', 
        description: "Café con notas de canela, clavo y vainilla", 
        price: 34.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 11, 
        name: 'Café de Otoño', 
        description: "Café con notas de calabaza y especias otoñales", 
        price: 31.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
      { 
        id: 12, 
        name: 'Café de Verano', 
        description: "Café ligero con notas cítricas y refrescantes", 
        price: 28.99, 
        type: 'cafe',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        options: {
          roast: {
            name: 'Nivel de Tostión',
            options: [
              { value: 'Clara', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Alta', price: 0 }
            ]
          },
          grind: {
            name: 'Tipo de Molienda',
            options: [
              { value: 'Fina', price: 0 },
              { value: 'Media', price: 0 },
              { value: 'Gruesa', price: 0 }
            ]
          }
        }
      },
    ]
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedOptions([]);
    setQuantity(1);
  };

  const handleOptionChange = (optionName: string, value: string, price: number = 0) => {
    setSelectedOptions(prev => {
      const filtered = prev.filter(option => option.name !== optionName);
      return [...filtered, { name: optionName, value, price }];
    });
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        type: selectedProduct.type,
        options: selectedOptions,
        basePrice: selectedProduct.price
      });
      setSelectedProduct(null);
      setSelectedOptions([]);
      setQuantity(1);
    }
  };

  const handleQuickAdd = (product: Product) => {
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
    <div style={{backgroundColor: 'rgb(119, 116, 101)'}} className="min-h-screen  relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Productos</h2>
        
        {/* Barra de búsqueda */}
        <div className="flex justify-center px-6 mb-8">
          {showSearch && (
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => !searchTerm && setShowSearch(false)}
              autoFocus
              className="mr-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 rounded-lg border border-white/20 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
            />
          )}
          <div 
            onClick={() => setShowSearch(!showSearch)}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20"
          >
            <svg className="w-5 h-5 text-white/70 hover:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-12">
          {Object.entries(productCategories).map(([category, products]) => {
            const filteredProducts = products.filter(product => 
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (filteredProducts.length === 0) return null;
            
            const isFirstCategory = Object.keys(productCategories)[0] === category;
            
            return (
            <div key={category} className="space-y-6" {...(isFirstCategory ? { 'data-first-product': true } : {})}>
              {/* Category Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-amber-300 mb-2">{category}</h3>
                <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
              </div>

              {/* Horizontal Scrollable Carousel */}
              <div className="relative">
                <div className="flex space-x-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg min-w-[280px] hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col cursor-pointer border border-amber-200/20"
                      onClick={() => handleProductClick(product)}
                    >
                      {/* Product Image */}
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
                        <p className="text-amber-800 font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
                        
                        {/* Quick Add Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(product);
                          }}
                          className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                        >
                          Agregar al Carrito
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Scroll Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                  {filteredProducts.map((_, index) => (
                    <div 
                      key={index}
                      className="w-2 h-2 bg-amber-400 rounded-full opacity-50"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            );
          })}
          
          {/* Mensaje cuando no hay resultados */}
          {Object.values(productCategories).every(products => 
            products.filter(product => 
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0
          ) && searchTerm && (
            <div className="text-center py-20">
              <p className="text-xl text-white/70">No se encontraron productos que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[70vh] overflow-y-auto">
            <div className="md:flex">
              {/* Product Image */}
              <div className="md:w-1/2">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h1>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{selectedProduct.description}</p>
                
                <div className="mb-6">
                  <span className="text-2xl font-bold text-amber-600">${selectedProduct.price.toFixed(2)}</span>
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
                {selectedProduct.type === 'cafe' && selectedProduct.options && (
                  <div className="space-y-5 mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">Personaliza tu Café</h3>
                    
                    {Object.entries(selectedProduct.options).map(([key, option]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {option.name}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {option.options.map((opt: { value: string; price?: number }) => (
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
                      ${(selectedProduct.price * quantity).toFixed(2)}
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
      )}
    </div>
  );
};

export default Productos;