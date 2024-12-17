import React from 'react';
import { useStore } from '../store';

export const ProductList = () => {
  const { products, addToCart } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col"
        >
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg mb-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <div className="flex justify-between items-center mt-auto">
            <div>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{product.stock} in stock</p>
            </div>
            <button
              onClick={() => addToCart(product.id)}
              disabled={product.stock === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};