import { Product } from '../types';
import { storage } from './storage';

// Initial products data with images
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    price: 999.99,
    stock: 10,
    image: '/src/images/laptop.svg'
  },
  {
    id: '2',
    name: 'Smartphone',
    price: 499.99,
    stock: 20,
    image: '/src/images/smartphone.svg'
  },
  {
    id: '3',
    name: 'Headphones',
    price: 99.99,
    stock: 100,
    image: '/src/images/headphones.svg'
  },
  {
    id: '4',
    name: 'Charger',
    price: 49,
    stock: 50,
    image: '/src/images/charger.svg'
  },
  {
    id: '5',
    name: 'Desktop',
    price: 899,
    stock: 30,
    image: '/src/images/desktop.svg'
  },
  {
    id: '6',
    name: 'Printer',
    price: 699,
    stock: 40,
    image: '/src/images/printer.svg'
  },
];

// Initialize products in storage if empty
if (storage.getProducts().length === 0) {
  storage.setProducts(initialProducts);
}

export const inventoryService = {
  getAllProducts: () => {
    return storage.getProducts();
  },
  
  getProduct: (id: string) => {
    const products = storage.getProducts();
    return products.find(p => p.id === id);
  },
  
  updateStock: (productId: string, quantity: number) => {
    const products = storage.getProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
      if (product.stock < quantity) {
        throw new Error('Insufficient stock');
      }
      product.stock -= quantity;
      storage.setProducts(products);
      return true;
    }
    return false;
  },
  
  addProduct: (product: Omit<Product, 'id'>) => {
    const products = storage.getProducts();
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
    };
    products.push(newProduct);
    storage.setProducts(products);
    return newProduct;
  },
};