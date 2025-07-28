import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('🔴 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`🔴 API Response Error: ${error.response?.status} ${error.config?.url}`, error);
    return Promise.reject(error);
  }
);

// Analytics API functions
export const analyticsAPI = {
  // Get key metrics
  getMetrics: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams({
        ...(params.start_date && { start_date: params.start_date }),
        ...(params.end_date && { end_date: params.end_date })
      }).toString();

      const url = queryParams ? `/metrics?${queryParams}` : '/metrics';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      throw error;
    }
  },

  // Get revenue chart data
  getRevenueChart: async () => {
    try {
      const response = await apiClient.get('/charts/revenue');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch revenue chart data:', error);
      throw error;
    }
  },

  // Get user growth chart data
  getUserGrowthChart: async () => {
    try {
      const response = await apiClient.get('/charts/user-growth');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch user growth chart data:', error);
      throw error;
    }
  },

  // Get traffic sources chart data
  getTrafficSourcesChart: async () => {
    try {
      const response = await apiClient.get('/charts/traffic-sources');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch traffic sources chart data:', error);
      throw error;
    }
  },

  // Get campaigns with search, filter, and pagination
  getCampaigns: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        per_page: params.per_page || 5,
        ...(params.search && { search: params.search }),
        ...(params.status_filter && params.status_filter !== 'all' && { status_filter: params.status_filter }),
        ...(params.start_date && { start_date: params.start_date }),
        ...(params.end_date && { end_date: params.end_date }),
        ...(params.sort_by && { sort_by: params.sort_by }),
        ...(params.sort_direction && { sort_direction: params.sort_direction })
      }).toString();

      const response = await apiClient.get(`/campaigns?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      throw error;
    }
  }
};

export default apiClient;