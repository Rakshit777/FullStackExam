// --- FILE: /frontend/pages/checkout.tsx ---
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface CartItem {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.items);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/orders/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Order placed successfully!');
      router.push('/products');
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('❌ Checkout failed.');
    }
  };

useEffect(() => {
  const checkAuthAndFetch = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
   await fetchCart();
  };

  checkAuthAndFetch();
}, []);

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  if (items.length === 0) return <p className="text-center mt-10">🛒 Your cart is empty.</p>;

  const total = items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">🧾 Checkout</h1>
      <ul className="divide-y divide-gray-200 mb-6">
        {items.map((item, idx) => (
          <li key={idx} className="py-4 flex justify-between">
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-right text-green-600 font-medium">₹{(item.price || 0) * item.quantity}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center font-semibold text-xl mb-4">
        <span>Total:</span>
        <span className="text-green-700">₹{total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium"
      >
        ✅ Confirm & Place Order
      </button>
    </div>
  );
}
