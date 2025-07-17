import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
    const [cartProductIds, setCartProductIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
          const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      if (search.trim()) {
        queryParams.append('search', search);
      }
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/products?${queryParams.toString()}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProducts();
     fetchCart();

  }, [search, page]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ids = res.data.items.map((item: any) => item.productId);
      setCartProductIds(ids);
    } catch (err) {
      console.error('Error fetching cart', err);
    }
  };


  const addToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/cart/add',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/cart/remove',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product removed from cart.');
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };
const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
 <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">🛍️ Product Catalog</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          🔓 Logout
        </button>
      </div>      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔎 Search by name or category"
          className="w-full max-w-lg px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-indigo-800 mb-1">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-1">📦 {product.category}</p>
            <p className="text-lg font-bold text-green-600 mb-2">₹{product.price}</p>
            <p className="text-gray-700 text-sm mb-3">{product.description}</p>
                        <div className="flex gap-3">
              {!cartProductIds.includes(product._id) ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
                >
                  ➕ Add to Cart
                </button>
              ) : (
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                >
                  ❌ Remove from Cart
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
      <button
  onClick={() => router.push('/checkout')}
  className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
>
  🧾 Go to Checkout
</button>

      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-full"
        >
          ⬅️ Prev
        </button>
        <span className="px-4 py-2 font-medium">📄 Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-5 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-full"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}

