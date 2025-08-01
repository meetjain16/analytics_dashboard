import { useState, useEffect } from 'react';
import { metricsData, chartData, tableData } from '../data/mockData';

export const useMetrics = (dateRangeParams = {}) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setMetrics(metricsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [JSON.stringify(dateRangeParams)]);

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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setChartData({
        revenue: chartData.revenue,
        userGrowth: chartData.userGrowth,
        trafficSources: chartData.trafficSources
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter and paginate campaigns based on params
      let filteredCampaigns = [...tableData];
      
      // Search filter
      if (finalParams.search) {
        filteredCampaigns = filteredCampaigns.filter(campaign =>
          campaign.campaign.toLowerCase().includes(finalParams.search.toLowerCase())
        );
      }
      
      // Status filter
      if (finalParams.status_filter && finalParams.status_filter !== 'all') {
        filteredCampaigns = filteredCampaigns.filter(campaign =>
          campaign.status.toLowerCase() === finalParams.status_filter.toLowerCase()
        );
      }
      
      // Date range filter
      if (finalParams.start_date || finalParams.end_date) {
        filteredCampaigns = filteredCampaigns.filter(campaign => {
          const campaignStart = new Date(campaign.startDate);
          const startDate = finalParams.start_date ? new Date(finalParams.start_date) : null;
          const endDate = finalParams.end_date ? new Date(finalParams.end_date) : null;
          
          if (startDate && campaignStart < startDate) return false;
          if (endDate && campaignStart > endDate) return false;
          return true;
        });
      }
      
      // Sorting
      if (finalParams.sort_by) {
        filteredCampaigns.sort((a, b) => {
          const aVal = a[finalParams.sort_by];
          const bVal = b[finalParams.sort_by];
          const direction = finalParams.sort_direction === 'desc' ? -1 : 1;
          return direction * (aVal > bVal ? 1 : -1);
        });
      }
      
      // Pagination
      const page = finalParams.page || 1;
      const perPage = finalParams.per_page || 5;
      const startIndex = (page - 1) * perPage;
      const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + perPage);
      
      setCampaignData({
        campaigns: paginatedCampaigns,
        total: filteredCampaigns.length,
        page: page,
        per_page: perPage
      });
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