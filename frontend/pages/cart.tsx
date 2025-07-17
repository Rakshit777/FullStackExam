import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState([
  ]);
  const router = useRouter();

  const checkout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/orders', {
        items: cart
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert('Order placed successfully!');
      setCart([]);
      router.push('/');
    } catch (err) {
      alert('Failed to place order');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} x {item.quantity} = ${item.quantity * item.price}</li>
          ))}
        </ul>
      )}
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
