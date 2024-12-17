import { useState } from 'react';
import { Order } from '../types';
import { orderApi } from '../api/orders';

export const useOrder = (orderId?: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    if (!orderId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await orderApi.getOrderById(orderId);
      setOrder(data || null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    order,
    loading,
    error,
    fetchOrder,
  };
};