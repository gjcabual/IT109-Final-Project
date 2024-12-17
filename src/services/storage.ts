import { Product, Order } from '../types'; 

const STORAGE_KEYS = {
  ORDERS: 'order_inventory_orders',
  PRODUCTS: 'order_inventory_products',
};

export const storage = {
  getOrders: (): Order[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  },

  setOrders: (orders: Order[]): void => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  getProducts: (): Product[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return stored ? JSON.parse(stored) : [];
  },

  setProducts: (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  },
};