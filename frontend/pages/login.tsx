import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/products'); // or redirect to /products
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} required />
      <br />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
