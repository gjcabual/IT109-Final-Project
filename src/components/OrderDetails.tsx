import React, { useEffect } from 'react';
import { useOrder } from '../hooks/useOrder';
import { Package, Clock } from 'lucide-react';

interface OrderDetailsProps {
  orderId: string;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { order, loading, error, fetchOrder } = useOrder(orderId);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <div className="flex items-center text-gray-500 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          order.status === 'completed' ? 'bg-green-100 text-green-800' :
          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Package className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="font-medium">Product #{item.productId}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between">
          <span className="font-semibold">Total Amount:</span>
          <span className="font-semibold">${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};