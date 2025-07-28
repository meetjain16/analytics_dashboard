import { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/apiService';

export const useMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsAPI.getMetrics();
      setMetrics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return { metrics, loading, error, refetch: fetchMetrics };
};

export const useChartData = () => {
  const [chartData, setChartData] = useState({
    revenue: [],
    userGrowth: [],
    trafficSources: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [revenueData, userGrowthData, trafficSourcesData] = await Promise.all([
        analyticsAPI.getRevenueChart(),
        analyticsAPI.getUserGrowthChart(),
        analyticsAPI.getTrafficSourcesChart()
      ]);

      setChartData({
        revenue: revenueData,
        userGrowth: userGrowthData,
        trafficSources: trafficSourcesData
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return { chartData, loading, error, refetch: fetchChartData };
};

export const useCampaigns = (params = {}) => {
  const [campaignData, setCampaignData] = useState({
    campaigns: [],
    total: 0,
    page: 1,
    per_page: 5
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async (newParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const finalParams = { ...params, ...newParams };
      const data = await analyticsAPI.getCampaigns(finalParams);
      setCampaignData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(params);
  }, [JSON.stringify(params)]);

  return { 
    campaignData, 
    loading, 
    error, 
    refetch: fetchCampaigns 
  };
};