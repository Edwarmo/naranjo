import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContext';

const Cart: React.FC = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Don't render cart if no items
  if (cartItems.length === 0) {
    return null;
  }

  const handleCheckout = () => {
    // Store cart data in localStorage for the payment page
    localStorage.setItem('cartData', JSON.stringify({
      items: cartItems,
      totalPrice: totalPrice
    }));
    navigate('/pago');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-[200] bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown Cart */}
      {isOpen && (
        <div className="fixed top-28 right-4 z-[150] w-80 sm:w-96 md:w-80 lg:w-96 max-h-[85vh] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-amber-600 text-white p-4 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <h2 className="text-lg font-bold">Revisar Pedido</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <div className="space-y-4">
              {/* Order Summary Header */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 font-semibold">Resumen del Pedido</span>
                  <span className="text-blue-600 text-sm">{cartItems.length} productos</span>
                </div>
              </div>

              {/* Items List */}
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Item Header */}
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Item #{index + 1}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      {/* Item Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">Precio: ${item.price.toFixed(2)}</p>
                        
                        {/* Product Options - Show on hover */}
                        {hoveredItem === item.id && item.options && item.options.length > 0 && (
                          <div className="mb-3 p-2 bg-amber-50 rounded border border-amber-200">
                            <p className="text-xs text-amber-700 mb-1 font-medium">Opciones seleccionadas:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.options.map((option, optIndex) => (
                                <span
                                  key={optIndex}
                                  className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded"
                                >
                                  {option.name}: {option.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Cantidad:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="w-10 text-center text-lg font-bold text-gray-800">{item.quantity}</span>
                            
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-amber-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">Subtotal</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order Summary */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Total de productos:</span>
                    <span className="text-green-800 font-semibold">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Productos únicos:</span>
                    <span className="text-green-800 font-semibold">{cartItems.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Total - Always Visible */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">Total del Pedido:</span>
              <span className="text-xl font-bold text-amber-800">${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-base"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[140] bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Cart;