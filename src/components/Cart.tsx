import React from "react";
import { useStore } from "../store";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";

export const Cart = () => {
  const { cart, products, removeFromCart, updateCartQuantity, checkout } = useStore();

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <ShoppingCart className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>

                <div className="flex items-center">
                  {/* Quantity Control */}
                  <button
                    onClick={() =>
                      updateCartQuantity(item.productId, Math.max(item.quantity - 1, 1))
                    }
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="mx-2 w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.productId, item.quantity + 1)
                    }
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="ml-4 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={checkout}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
