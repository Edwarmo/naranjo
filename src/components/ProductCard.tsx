import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-amber-800 font-bold">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label={`Add ${product.name} to cart`}
      >
        Añadir al Carrito
      </button>
    </div>
  );
};

export default ProductCard;