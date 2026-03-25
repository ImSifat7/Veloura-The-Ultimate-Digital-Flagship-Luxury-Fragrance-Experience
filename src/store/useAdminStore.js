/**
 * Zustand Admin Store
 * Manages admin authentication state.
 */
import { create } from 'zustand';

const useAdminStore = create((set) => ({
  isAuthenticated: false,
  token: null,

  login: (token) => {
    sessionStorage.setItem('veloura_admin_token', token);
    set({ isAuthenticated: true, token });
  },

  logout: () => {
    sessionStorage.removeItem('veloura_admin_token');
    set({ isAuthenticated: false, token: null });
  },

  checkAuth: () => {
    const token = sessionStorage.getItem('veloura_admin_token');
    if (token) {
      set({ isAuthenticated: true, token });
      return true;
    }
    return false;
  },
}));

export default useAdminStore;
