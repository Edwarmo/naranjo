import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type?: string;
  options?: { name: string; value: string; price?: number }[];
  basePrice: number;
}

interface CartData {
  items: CartItem[];
  totalPrice: number;
}

interface PaymentForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZipCode: string;
  paymentMethod: string;
  additionalNotes: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [formData, setFormData] = useState<PaymentForm>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingZipCode: '',
    paymentMethod: 'efectivo',
    additionalNotes: ''
  });

  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    } else {
      navigate('/productos');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    if (!cartData) return '';

    let message = "🛒 *NUEVO PEDIDO - Alforja Café*\n\n";
    
    // Customer Information
    message += "*📋 INFORMACIÓN DEL CLIENTE:*\n";
    message += `• Nombre: ${formData.customerName}\n`;
    message += `• Email: ${formData.customerEmail}\n`;
    message += `• Teléfono: ${formData.customerPhone}\n\n`;
    
    // Shipping Information
    message += "*🚚 DIRECCIÓN DE ENVÍO:*\n";
    message += `• Dirección: ${formData.shippingAddress}\n`;
    message += `• Ciudad: ${formData.shippingCity}\n`;
    message += `• Código Postal: ${formData.shippingZipCode}\n\n`;
    
    // Payment Method
    message += "*💳 MÉTODO DE PAGO:*\n";
    message += `• ${formData.paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia Bancaria'}\n\n`;
    
    // Products
    message += "*🛍️ PRODUCTOS SOLICITADOS:*\n";
    cartData.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity}\n`;
      
      if (item.options && item.options.length > 0) {
        message += `   └ Opciones: ${item.options.map(opt => `${opt.name}: ${opt.value}`).join(', ')}\n`;
      }
      
      message += `   └ Precio: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    // Total
    message += `*💰 TOTAL DEL PEDIDO: $${cartData.totalPrice.toFixed(2)}*\n\n`;
    
    // Additional Notes
    if (formData.additionalNotes.trim()) {
      message += "*📝 NOTAS ADICIONALES:*\n";
      message += `${formData.additionalNotes}\n\n`;
    }
    
    message += "Por favor, confirma mi pedido y coordina el pago y envío. ¡Gracias! ☕";
    
    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/573234923424?text=${encodeURIComponent(message)}`;
    
    // Clear cart data
    localStorage.removeItem('cartData');
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Redirect to home
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  if (!cartData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Finalizar Compra</h1>
          <p className="text-amber-200">Completa tus datos para procesar el pedido</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Resumen del Pedido</h2>
              
              <div className="space-y-3">
                {cartData.items.map((item, index) => (
                  <div key={item.id} className="bg-white/5 rounded p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-amber-200 text-sm">Cantidad: {item.quantity}</p>
                        {item.options && item.options.length > 0 && (
                          <p className="text-amber-200 text-xs">
                            {item.options.map(opt => `${opt.name}: ${opt.value}`).join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/20 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white text-lg font-semibold">Total:</span>
                  <span className="text-amber-300 text-2xl font-bold">${cartData.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Información de Pago y Envío</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Método de Pago *
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="efectivo">Efectivo</option>
                      <option value="transferencia">Transferencia Bancaria</option>
                    </select>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Dirección de Envío</h3>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Dirección Completa *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Calle, número, apartamento, etc."
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Ciudad"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="shippingZipCode"
                        value={formData.shippingZipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Código postal"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Notas Adicionales
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Instrucciones especiales, horarios de entrega, etc."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/productos')}
                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                  >
                    Volver a Productos
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                  >
                    Enviar Pedido por WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
