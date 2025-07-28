// Mock data for ADmyBRAND Insights Dashboard

export const metricsData = {
  revenue: {
    current: 142850,
    previous: 124300,
    change: 14.9,
    target: 150000
  },
  users: {
    current: 12847,
    previous: 11203,
    change: 14.7,
    target: 15000
  },
  conversions: {
    current: 2.4,
    previous: 2.1,
    change: 14.3,
    target: 3.0
  },
  growth: {
    current: 18.7,
    previous: 12.4,
    change: 50.8,
    target: 20.0
  }
};

export const chartData = {
  revenue: [
    { month: 'Jan', current: 82000, previous: 65000 },
    { month: 'Feb', current: 89000, previous: 70000 },
    { month: 'Mar', current: 95000, previous: 75000 },
    { month: 'Apr', current: 105000, previous: 85000 },
    { month: 'May', current: 118000, previous: 95000 },
    { month: 'Jun', current: 125000, previous: 105000 },
    { month: 'Jul', current: 142850, previous: 124300 }
  ],
  userGrowth: [
    { month: 'Jan', users: 8500, newUsers: 1200 },
    { month: 'Feb', users: 9200, newUsers: 1350 },
    { month: 'Mar', users: 9800, newUsers: 1100 },
    { month: 'Apr', users: 10600, newUsers: 1400 },
    { month: 'May', users: 11400, newUsers: 1250 },
    { month: 'Jun', users: 12100, newUsers: 1380 },
    { month: 'Jul', users: 12847, newUsers: 1520 }
  ],
  trafficSources: [
    { name: 'Organic Search', value: 4847, color: '#8b5cf6' },
    { name: 'Social Media', value: 3421, color: '#06b6d4' },
    { name: 'Direct Traffic', value: 2154, color: '#10b981' },
    { name: 'Paid Ads', value: 1876, color: '#f59e0b' },
    { name: 'Email', value: 549, color: '#ef4444' }
  ],
  campaignPerformance: [
    { campaign: 'Summer Sale', impressions: 245000, clicks: 12250, ctr: 5.0, conversions: 294 },
    { campaign: 'Brand Awareness', impressions: 180000, clicks: 7200, ctr: 4.0, conversions: 216 },
    { campaign: 'Product Launch', impressions: 320000, clicks: 19200, ctr: 6.0, conversions: 576 },
    { campaign: 'Holiday Special', impressions: 95000, clicks: 3800, ctr: 4.0, conversions: 114 },
    { campaign: 'Retargeting', impressions: 150000, clicks: 9000, ctr: 6.0, conversions: 360 }
  ]
};

export const tableData = [
  {
    id: 1,
    campaign: 'Summer Sale Campaign',
    status: 'Active',
    budget: 15000,
    spent: 12450,
    impressions: 245000,
    clicks: 12250,
    conversions: 294,
    cpa: 42.35,
    roas: 3.2,
    startDate: '2024-06-01',
    endDate: '2024-07-31'
  },
  {
    id: 2,
    campaign: 'Brand Awareness Push',
    status: 'Active',
    budget: 8000,
    spent: 6750,
    impressions: 180000,
    clicks: 7200,
    conversions: 216,
    cpa: 31.25,
    roas: 2.8,
    startDate: '2024-06-15',
    endDate: '2024-08-15'
  },
  {
    id: 3,
    campaign: 'Product Launch Blitz',
    status: 'Completed',
    budget: 25000,
    spent: 24800,
    impressions: 320000,
    clicks: 19200,
    conversions: 576,
    cpa: 43.06,
    roas: 4.1,
    startDate: '2024-05-01',
    endDate: '2024-06-30'
  },
  {
    id: 4,
    campaign: 'Holiday Special Prep',
    status: 'Paused',
    budget: 5000,
    spent: 2100,
    impressions: 95000,
    clicks: 3800,
    conversions: 114,
    cpa: 18.42,
    roas: 2.1,
    startDate: '2024-07-01',
    endDate: '2024-09-01'
  },
  {
    id: 5,
    campaign: 'Retargeting Excellence',
    status: 'Active',
    budget: 12000,
    spent: 9200,
    impressions: 150000,
    clicks: 9000,
    conversions: 360,
    cpa: 25.56,
    roas: 3.8,
    startDate: '2024-06-01',
    endDate: '2024-08-31'
  },
  {
    id: 6,
    campaign: 'Mobile App Install',
    status: 'Active',
    budget: 18000,
    spent: 14200,
    impressions: 410000,
    clicks: 16400,
    conversions: 492,
    cpa: 28.86,
    roas: 3.1,
    startDate: '2024-05-15',
    endDate: '2024-08-15'
  },
  {
    id: 7,
    campaign: 'Video Content Boost',
    status: 'Completed',
    budget: 7500,
    spent: 7350,
    impressions: 125000,
    clicks: 6250,
    conversions: 188,
    cpa: 39.10,
    roas: 2.4,
    startDate: '2024-04-01',
    endDate: '2024-05-31'
  },
  {
    id: 8,
    campaign: 'Local Business Drive',
    status: 'Active',
    budget: 6000,
    spent: 4850,
    impressions: 89000,
    clicks: 4450,
    conversions: 133,
    cpa: 36.47,
    roas: 2.9,
    startDate: '2024-06-20',
    endDate: '2024-08-20'
  }
];