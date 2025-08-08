import React from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';


interface Product {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PageOrchestratorProps {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
}

const PageOrchestrator: React.FC<PageOrchestratorProps> = ({ products, cartItems, addToCart }) => {
  const categories = [...new Set(products.map((product) => product.type))];

return (
  <div className="min-h-screen flex flex-col">
    <Header cartItems={cartItems} />
    <main className="flex-grow">
      <Carousel products={products} />
      

      {/* O solo esto si prefieres mantener agrupación por sección */}
      {categories.map((category) => (
        <ProductSection
          key={category}
          title={category}
          products={products.filter((product) => product.type === category)}
          addToCart={addToCart}
        />
      ))}
    </main>
    <Footer />
  </div>
);

};

