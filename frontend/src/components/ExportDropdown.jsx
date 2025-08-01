import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Download, FileText, BarChart3, Table } from 'lucide-react';
import { exportMetricsData, exportChartData, exportCampaignData, generateDashboardReport } from '../utils/exportUtils';

const ExportDropdown = ({ metrics, chartData, campaignData, onExport }) => {
  const notify = (msg, variant = 'success') => {
    if (onExport) {
      onExport({
        id: Date.now(),
        title: 'Export Successful',
        message: msg,
        variant,
        duration: 2500
      });
    }
  };

  const handleExportMetrics = () => {
    if (!metrics) {
      alert('Metrics data not available');
      return;
    }
    exportMetricsData(metrics, `metrics_${new Date().toISOString().split('T')[0]}.csv`);
    notify('Key metrics exported as CSV.');
  };

  const handleExportCharts = () => {
    if (!chartData || !chartData.revenue.length) {
      alert('Chart data not available');
      return;
    }
    exportChartData(chartData, `charts_${new Date().toISOString().split('T')[0]}.csv`);
    notify('Chart data exported as CSV.');
  };

  const handleExportCampaigns = () => {
    if (!campaignData || !campaignData.campaigns.length) {
      alert('Campaign data not available');
      return;
    }
    exportCampaignData(campaignData.campaigns, `campaigns_${new Date().toISOString().split('T')[0]}.csv`);
    notify('Campaigns exported as CSV.');
  };

  const handleExportReport = () => {
    if (!metrics || !chartData || !campaignData) {
      alert('Dashboard data not fully loaded');
      return;
    }
    generateDashboardReport(metrics, chartData, campaignData);
    notify('Full dashboard report exported as JSON.');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Export Data</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleExportMetrics} className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Key Metrics (CSV)
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleExportCharts} className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Chart Data (CSV)
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleExportCampaigns} className="flex items-center gap-2">
          <Table className="h-4 w-4" />
          Campaigns (CSV)
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleExportReport} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Full Report (JSON)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportDropdown;