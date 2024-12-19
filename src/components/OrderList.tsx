import React from 'react';
import { useStore } from '../store';
import { Package, Trash2 } from 'lucide-react';

export const OrderList = () => {
  const { orders, products, clearOrders } = useStore();

  const handleClearOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders?')) {
      clearOrders();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        {orders.length > 0 && (
          <button
            onClick={handleClearOrders}
            className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Orders
          </button>
        )}
      </div>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {order.status}
              </span>
            </div>
            
            <div className="space-y-2">
              {order.items.map((item: { productId: React.Key | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <div key={item.productId} className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{product?.name}</span>
                    <span className="ml-2 text-gray-500">x{item.quantity}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};