import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '@/store/useAdminStore';
import { globalConfig } from '@/config/global.config';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAdminStore();

  const handleLogin = (e) => {
    e.preventDefault();
    // Phase 5: Replace with n8n AUTH_CHECK webhook
    if (password === import.meta.env.VITE_ADMIN_PASS) {
      login('local-dev-token');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-black">
      <form onSubmit={handleLogin} className="bg-white rounded-xl p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-light tracking-widest text-center mb-2">
          {globalConfig.brand.name}
        </h1>
        <p className="text-xs text-gray-400 text-center uppercase tracking-wider mb-8">
          Admin Access
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-luxury-gold"
        />
        <button type="submit" className="luxury-btn w-full text-center rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
