// Utility functions for data export

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportCampaignData = (campaigns, filename = 'campaigns_export.csv') => {
  const exportData = campaigns.map(campaign => ({
    'Campaign Name': campaign.campaign_name,
    'Status': campaign.status,
    'Budget': campaign.budget,
    'Spent': campaign.spent,
    'Impressions': campaign.impressions,
    'Clicks': campaign.clicks,
    'Conversions': campaign.conversions,
    'CPA': campaign.cpa,
    'ROAS': campaign.roas,
    'Start Date': campaign.start_date,
    'End Date': campaign.end_date
  }));
  
  exportToCSV(exportData, filename);
};

export const exportMetricsData = (metrics, filename = 'metrics_export.csv') => {
  const exportData = [
    {
      'Metric': 'Total Revenue',
      'Current': metrics.revenue.current,
      'Previous': metrics.revenue.previous,
      'Change (%)': metrics.revenue.change,
      'Target': metrics.revenue.target
    },
    {
      'Metric': 'Active Users',
      'Current': metrics.users.current,
      'Previous': metrics.users.previous,
      'Change (%)': metrics.users.change,
      'Target': metrics.users.target
    },
    {
      'Metric': 'Conversion Rate',
      'Current': metrics.conversions.current,
      'Previous': metrics.conversions.previous,
      'Change (%)': metrics.conversions.change,
      'Target': metrics.conversions.target
    },
    {
      'Metric': 'Growth Rate',
      'Current': metrics.growth.current,
      'Previous': metrics.growth.previous,
      'Change (%)': metrics.growth.change,
      'Target': metrics.growth.target
    }
  ];
  
  exportToCSV(exportData, filename);
};

export const exportChartData = (chartData, filename = 'chart_data_export.csv') => {
  const exportData = [];
  
  // Revenue data
  chartData.revenue.forEach((item, index) => {
    exportData.push({
      'Data Type': 'Revenue',
      'Period': item.month,
      'Current Year': item.current,
      'Previous Year': item.previous,
      'Index': index
    });
  });
  
  // User growth data
  chartData.userGrowth.forEach((item, index) => {
    exportData.push({
      'Data Type': 'User Growth',
      'Period': item.month,
      'Total Users': item.users,
      'New Users': item.newUsers,
      'Index': index
    });
  });
  
  // Traffic sources data
  chartData.trafficSources.forEach((item, index) => {
    exportData.push({
      'Data Type': 'Traffic Sources',
      'Source': item.name,
      'Users': item.value,
      'Color': item.color,
      'Index': index
    });
  });
  
  exportToCSV(exportData, filename);
};

export const exportToJSON = (data, filename = 'export.json') => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateDashboardReport = (metrics, chartData, campaignData) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const reportData = {
    reportDate: timestamp,
    metrics,
    chartData,
    campaigns: campaignData.campaigns,
    summary: {
      totalCampaigns: campaignData.campaigns.length,
      activeCampaigns: campaignData.campaigns.filter(c => c.status === 'Active').length,
      totalBudget: campaignData.campaigns.reduce((sum, c) => sum + c.budget, 0),
      totalSpent: campaignData.campaigns.reduce((sum, c) => sum + c.spent, 0),
      totalRevenue: metrics.revenue.current,
      averageROAS: campaignData.campaigns.length > 0 ? 
        campaignData.campaigns.reduce((sum, c) => sum + c.roas, 0) / campaignData.campaigns.length : 0
    }
  };
  
  exportToJSON(reportData, `dashboard_report_${timestamp}.json`);
};