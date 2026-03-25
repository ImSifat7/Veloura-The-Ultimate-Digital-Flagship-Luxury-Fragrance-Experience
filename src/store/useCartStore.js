/**
 * Zustand Cart Store
 * Manages cart items with localStorage persistence.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((item) => item.p_id === product.p_id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.p_id === product.p_id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },

      removeItem: (p_id) => {
        set({ items: get().items.filter((item) => item.p_id !== p_id) });
      },

      updateQuantity: (p_id, quantity) => {
        if (quantity <= 0) return get().removeItem(p_id);
        set({
          items: get().items.map((item) =>
            item.p_id === p_id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'veloura-cart',
    }
  )
);

export default useCartStore;
