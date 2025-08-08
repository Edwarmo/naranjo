import React, { createContext, useContext, useState } from 'react';
import type { SetStateAction, ReactNode, Dispatch } from 'react';

interface ProductOption {
  name: string;
  value: string;
  price?: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type?: string;
  options?: ProductOption[];
  basePrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  updateItemOptions: (id: number, options: ProductOption[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item doesn't exist, add it to cart
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItemOptions = (id: number, options: ProductOption[]) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const optionsPrice = options.reduce((sum, option) => sum + (option.price || 0), 0);
          return {
            ...item,
            options,
            price: item.basePrice + optionsPrice
          };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      increaseQuantity, 
      decreaseQuantity, 
      removeItem,
      updateItemOptions
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};