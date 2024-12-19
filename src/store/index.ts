// import { create } from 'zustand';
// import { Product, Order, OrderItem } from '../types';
// import { inventoryService } from '../services/inventory';
// import { orderService } from '../services/orders';

// interface StoreState {
//   products: Product[];
//   orders: Order[];
//   cart: OrderItem[];
//   loading: boolean;
//   error: string | null;
//   fetchProducts: () => void;
//   fetchOrders: () => void;
//   addToCart: (productId: string) => void;
//   removeFromCart: (productId: string) => void;
//   checkout: () => void;
// }

// export const useStore = create<StoreState>((set, get) => ({
//   products: [],
//   orders: [],
//   cart: [],
//   loading: false,
//   error: null,

//   fetchProducts: () => {
//     set({ loading: true });
//     try {
//       const products = inventoryService.getAllProducts();
//       set({ products, loading: false });
//     } catch (error) {
//       set({ error: (error as Error).message, loading: false });
//     }
//   },

//   fetchOrders: () => {
//     set({ loading: true });
//     try {
//       const orders = orderService.getAllOrders();
//       set({ orders, loading: false });
//     } catch (error) {
//       set({ error: (error as Error).message, loading: false });
//     }
//   },

//   addToCart: (productId: string) => {
//     const { cart } = get();
//     const existingItem = cart.find(item => item.productId === productId);
    
//     if (existingItem) {
//       set({
//         cart: cart.map(item =>
//           item.productId === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ),
//       });
//     } else {
//       set({ cart: [...cart, { productId, quantity: 1 }] });
//     }
//   },

//   removeFromCart: (productId: string) => {
//     const { cart } = get();
//     set({
//       cart: cart.filter(item => item.productId !== productId),
//     });
//   },

//      // New function to update cart quantity
//      updateCartQuantity: (productId: string, quantity: number) => {
//       const { cart } = get();
//       set({
//         cart: cart.map((item) =>
//           item.productId === productId ? { ...item, quantity } : item
//         ),
//       });
//     },

//   checkout: () => {
//     const { cart } = get();
//     if (cart.length === 0) return;

//     try {
//       orderService.createOrder(cart);
//       set(state => ({
//         orders: orderService.getAllOrders(), // Get fresh orders instead of manually adding
//         cart: [],
//         products: inventoryService.getAllProducts(),
//       }));
//     } catch (error) {
//       set({ error: (error as Error).message });
//     }
//   },
//   clearOrders: () => {
//     try {
//       orderService.clearOrders();
//       set({ orders: [] });
//     } catch (error) {
//       set({ error: (error as Error).message });
//     }
//   },
// }));


import { create } from 'zustand';
import { Product, Order, OrderItem } from '../types';
import { inventoryService } from '../services/inventory';
import { orderService } from '../services/orders';

interface StoreState {
  products: Product[];
  orders: Order[];
  cart: OrderItem[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
  fetchOrders: () => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  checkout: () => void;
  clearOrders: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  orders: [],
  cart: [],
  loading: false,
  error: null,

  fetchProducts: () => {
    set({ loading: true });
    try {
      const products = inventoryService.getAllProducts();
      set({ products, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchOrders: () => {
    set({ loading: true });
    try {
      const orders = orderService.getAllOrders();
      set({ orders, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addToCart: (productId: string) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { productId, quantity: 1 }] });
    }
  },

  removeFromCart: (productId: string) => {
    const { cart } = get();
    set({
      cart: cart.filter(item => item.productId !== productId),
    });
  },

   //New function to update cart quantity
     updateCartQuantity: (productId: string, quantity: number) => {
      const { cart } = get();
      set({
        cart: cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      });
    },


  checkout: () => {
    const { cart } = get();
    if (cart.length === 0) return;

    try {
      orderService.createOrder(cart);
      set(state => ({
        orders: orderService.getAllOrders(),
        cart: [],
        products: inventoryService.getAllProducts(),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  clearOrders: () => {
    try {
      orderService.clearOrders();
      set({ orders: [] });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));