import axios from 'axios';

/**
 * Veloura n8n Unified Client
 * The ONLY bridge between the frontend and operational workflows.
 */
const n8nClient = axios.create({
  baseURL: import.meta.env.VITE_N8N_API_BASE || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const automationServices = {
  /**
   * Universal fetcher for n8n webhooks
   */
  async execute(endpoint, data = {}, method = 'POST') {
    try {
      const response = await n8nClient({
        url: endpoint,
        method,
        data,
      });
      return response.data;
    } catch (error) {
      console.error(`Automation Error [${endpoint}]:`, error);
      throw error;
    }
  },

  // Implementation of automation methods
  async testConnection() {
    return this.execute('/', {}, 'GET');
  },

  async getProducts() {
    return this.execute('/webhook/products', {}, 'GET');
  },

  async submitOrder(orderData) {
    return this.execute('/webhook/orders', orderData, 'POST');
  },

  async trackOrder(orderId) {
    return this.execute(`/webhook/track?id=${orderId}`, {}, 'GET');
  },
};

export default n8nClient;
