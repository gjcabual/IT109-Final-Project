import { Order, OrderItem } from '../types';
import { inventoryService } from './inventory';
import { storage } from './storage';

export const orderService = {
  createOrder: (items: OrderItem[]) => {
    const orders = storage.getOrders();
    
    // Verify stock and calculate total
    let total = 0;
    for (const item of items) {
      const product = inventoryService.getProduct(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      total += product.price * item.quantity;
    }

    // Create order
    const order: Order = {
      id: (orders.length + 1).toString(),
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Update inventory
    items.forEach(item => {
      inventoryService.updateStock(item.productId, item.quantity);
    });

    // Save order
    orders.push(order);
    storage.setOrders(orders);
    
    return order;
  },

  getOrder: (id: string) => {
    const orders = storage.getOrders();
    return orders.find(o => o.id === id);
  },
  
  getAllOrders: () => {
    return storage.getOrders();
  },
};