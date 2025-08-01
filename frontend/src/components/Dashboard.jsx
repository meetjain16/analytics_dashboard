import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { StatsCard } from './ui/stats-card';
import { GlassCard } from './ui/glass-card';
import { AnimatedProgress } from './ui/animated-progress';
import { Notification } from './ui/notification';
import { Skeleton, SkeletonMetric, SkeletonCard } from './ui/skeleton';

import { FloatingActionButton } from './ui/floating-action-button';
import { ThemeToggle } from './ThemeToggle';
import ExportDropdown from './ExportDropdown';
import AdvancedFilters from './AdvancedFilters';
import MetricCard from './MetricCard';
import RevenueChart from './RevenueChart';
import UserGrowthChart from './UserGrowthChart';
import TrafficSourceChart from './TrafficSourceChart';
import CampaignTable from './CampaignTable';
import { useMetrics, useChartData, useCampaigns } from '../hooks/useAnalytics';
import { useDateFilter } from '../hooks/useDateFilter';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target,
  BarChart3,
  Calendar,
  Download,
  Filter,
  RefreshCcw,
  Bell,
  AlertCircle,
  Sparkles,
  Zap,
  Activity,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  Star,
  TrendingUp as TrendingUpIcon,
  Eye,
  MousePointer,
  Target as TargetIcon
} from 'lucide-react';

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [campaignStatus, setCampaignStatus] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Dashboard Updated",
      message: "All metrics have been refreshed with latest data",
      variant: "success",
      duration: 3000
    }
  ]);
  
  // Use date filter hook
  const { dateRange, setDateRange, getDateRangeParams } = useDateFilter();
  
  // Get date range params for API calls
  const dateParams = getDateRangeParams();
  
  // Use custom hooks for data fetching with date filtering
  const { metrics, loading: metricsLoading, error: metricsError, refetch: refetchMetrics } = useMetrics(dateParams);
  const { chartData, loading: chartLoading, error: chartError, refetch: refetchCharts } = useChartData();
  const { campaignData, loading: campaignsLoading, error: campaignsError, refetch: refetchCampaigns } = useCampaigns({
    ...dateParams,
    status_filter: campaignStatus
  });

  const isLoading = metricsLoading || chartLoading || campaignsLoading;
  const hasError = metricsError || chartError || campaignsError;

  const refreshData = () => {
    setLastUpdated(new Date());
    refetchMetrics();
    refetchCharts();
    refetchCampaigns();
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      title: "Data Refreshed",
      message: "All analytics data has been updated successfully",
      variant: "success",
      duration: 3000
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const handleResetFilters = () => {
    setDateRange(null);
    setCampaignStatus('all');
  };

  if (isLoading && (!metrics && !chartData.revenue.length)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header Skeleton */}
        <div className="border-b bg-background/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-1">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonMetric />
            <SkeletonMetric />
            <SkeletonMetric />
          </div>
          
          <Separator />
          
          {/* Charts Skeleton */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (hasError && (!metrics && !chartData.revenue.length)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative">
            <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full animate-ping"></div>
          </div>
          <div className="space-y-2">
            <div className="text-xl font-semibold text-destructive">Failed to Load Dashboard</div>
            <div className="text-sm text-muted-foreground">
              {metricsError || chartError || campaignsError}
            </div>
          </div>
          <Button onClick={refreshData} className="mt-4 bg-destructive hover:bg-destructive/90">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            title={notification.title}
            message={notification.message}
            variant={notification.variant}
            duration={notification.duration}
            onClose={() => {
              setNotifications(prev => prev.filter(n => n.id !== notification.id));
            }}
          />
        ))}
      </div>
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  ADmyBRAND Insights
                </h1>
                <p className="text-sm text-muted-foreground">Digital Marketing Analytics</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData} 
              disabled={isLoading} 
              className="flex items-center gap-2 hover:bg-primary/5 transition-all duration-200"
            >
              <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <ExportDropdown 
              metrics={metrics} 
              chartData={chartData} 
              campaignData={campaignData} 
              onExport={notif => setNotifications(prev => [...prev, notif])} 
            />
            <Button variant="outline" size="sm" className="relative hover:bg-primary/5">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Welcome back! 👋
              </h2>
              <p className="text-muted-foreground text-lg">
                Here's what's happening with your campaigns today.
              </p>
            </div>
          </div>
          
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Revenue Growth"
              value="+14.9%"
              description="vs last month"
              icon={ArrowUpRight}
              trend="up"
              trendValue="+14.9%"
              color="success"
            />
            <StatsCard
              title="Active Campaigns"
              value="5 Running"
              description="out of 8 total"
              icon={Activity}
              trend="up"
              trendValue="+2"
              color="info"
            />
            <StatsCard
              title="Best ROAS"
              value="4.1x"
              description="Product Launch Blitz"
              icon={Star}
              trend="up"
              trendValue="+0.3x"
              color="purple"
            />
          </div>
        </div>

        {/* Advanced Filters */}
        <AdvancedFilters
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          campaignStatus={campaignStatus}
          onCampaignStatusChange={setCampaignStatus}
          onResetFilters={handleResetFilters}
        />

        {/* Key Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics && (
            <>
              <MetricCard
                title="Total Revenue"
                current={metrics.revenue.current}
                previous={metrics.revenue.previous}
                change={metrics.revenue.change}
                target={metrics.revenue.target}
                format="currency"
                icon={DollarSign}
                className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
              <MetricCard
                title="Active Users"
                current={metrics.users.current}
                previous={metrics.users.previous}
                change={metrics.users.change}
                target={metrics.users.target}
                format="number"
                icon={Users}
                className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
              <MetricCard
                title="Conversion Rate"
                current={metrics.conversions.current}
                previous={metrics.conversions.previous}
                change={metrics.conversions.change}
                target={metrics.conversions.target}
                format="percentage"
                icon={Target}
                className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
              <MetricCard
                title="Growth Rate"
                current={metrics.growth.current}
                previous={metrics.growth.previous}
                change={metrics.growth.change}
                target={metrics.growth.target}
                format="percentage"
                icon={TrendingUp}
                className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
            </>
          )}
        </div>

        <Separator />

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {chartData.revenue.length > 0 && (
            <div className="group">
              <RevenueChart data={chartData.revenue} />
            </div>
          )}
          {chartData.userGrowth.length > 0 && (
            <div className="group">
              <UserGrowthChart data={chartData.userGrowth} />
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {chartData.trafficSources.length > 0 && (
            <TrafficSourceChart data={chartData.trafficSources} />
          )}
          
          <GlassCard variant="elevated" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Quick Insights</h3>
                  <p className="text-sm text-muted-foreground">Key performance highlights</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 hover:shadow-md transition-all duration-200 group-hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-200">Best Performing Campaign</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Product Launch Blitz</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600 shadow-sm">4.1x ROAS</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl border bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 hover:shadow-md transition-all duration-200 group-hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-blue-800 dark:text-blue-200">Top Traffic Source</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Organic Search</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
                    37.8% share
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 hover:shadow-md transition-all duration-200 group-hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Target className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800 dark:text-purple-200">Conversion Leader</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Retargeting Excellence</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-500 hover:bg-purple-600 text-white shadow-sm">
                    3.8x ROAS
                  </Badge>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Campaign Table */}
        {campaignData.campaigns.length > 0 && (
          <CampaignTable 
            data={campaignData.campaigns} 
            total={campaignData.total}
            dateRange={dateRange}
            campaignStatus={campaignStatus}
          />
        )}

        {/* Footer */}
        <div className="flex items-center justify-between py-6 border-t">
          <div className="text-sm text-muted-foreground">
            © 2025 ADmyBRAND Insights. Empowering digital marketing decisions.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Button variant="link" size="sm" className="h-auto p-0 hover:text-foreground transition-colors">
              Documentation
            </Button>
            <Button variant="link" size="sm" className="h-auto p-0 hover:text-foreground transition-colors">
              Support
            </Button>
            <Button variant="link" size="sm" className="h-auto p-0 hover:text-foreground transition-colors">
              API
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton
        icon={RefreshCcw}
        onClick={refreshData}
        variant="glass"
        className="animate-fade-in"
      />
    </div>
  );
};

export default Dashboard;