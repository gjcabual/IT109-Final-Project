import React, { useEffect } from 'react';
import { useStore } from './store';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { OrderList } from './components/OrderList';
import { Store } from 'lucide-react';

function App() {
  const { fetchProducts, fetchOrders, error } = useStore();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Store className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Order & Inventory System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Available Products</h2>
            <ProductList />
          </div>
          
          <div className="space-y-8">
            <Cart />
            <OrderList />
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;