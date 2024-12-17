import { Order, OrderItem } from '../types';

// Simulating API endpoints with Promise-based responses
export const orderApi = {
  // Get all orders
  getAllOrders: async (): Promise<Order[]> => {
    // Simulating API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(orders);
      }, 300);
    });
  },

  // Get single order by ID
  getOrderById: async (id: string): Promise<Order | undefined> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = orders.find(o => o.id === id);
        if (order) {
          resolve(order);
        } else {
          reject(new Error(`Order #${id} not found`));
        }
      }, 300);
    });
  },

  // Create new order
  createOrder: async (items: OrderItem[]): Promise<Order> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const order = {
            id: (orders.length + 1).toString(),
            items,
            total: calculateTotal(items),
            status: 'pending' as const,
            createdAt: new Date().toISOString(),
          };
          orders.push(order);
          resolve(order);
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  },
};

// Helper function to calculate order total
const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    return total + (product.price * item.quantity);
  }, 0);
};