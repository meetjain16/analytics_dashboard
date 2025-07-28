import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ThemeToggle } from './ThemeToggle';
import MetricCard from './MetricCard';
import RevenueChart from './RevenueChart';
import UserGrowthChart from './UserGrowthChart';
import TrafficSourceChart from './TrafficSourceChart';
import CampaignTable from './CampaignTable';
import { metricsData, chartData, tableData } from '../data/mockData';
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
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => setIsLoading(false), 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <div className="text-lg font-medium">Loading Analytics...</div>
          <div className="text-sm text-muted-foreground">Preparing your insights</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ADmyBRAND Insights</h1>
                <p className="text-sm text-muted-foreground">Digital Marketing Analytics</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button variant="outline" size="sm" onClick={refreshData} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back! 👋</h2>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with your campaigns today.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            current={metricsData.revenue.current}
            previous={metricsData.revenue.previous}
            change={metricsData.revenue.change}
            target={metricsData.revenue.target}
            format="currency"
            icon={DollarSign}
            className="border-l-4 border-l-green-500"
          />
          <MetricCard
            title="Active Users"
            current={metricsData.users.current}
            previous={metricsData.users.previous}
            change={metricsData.users.change}
            target={metricsData.users.target}
            format="number"
            icon={Users}
            className="border-l-4 border-l-blue-500"
          />
          <MetricCard
            title="Conversion Rate"
            current={metricsData.conversions.current}
            previous={metricsData.conversions.previous}
            change={metricsData.conversions.change}
            target={metricsData.conversions.target}
            format="percentage"
            icon={Target}
            className="border-l-4 border-l-purple-500"
          />
          <MetricCard
            title="Growth Rate"
            current={metricsData.growth.current}
            previous={metricsData.growth.previous}
            change={metricsData.growth.change}
            target={metricsData.growth.target}
            format="percentage"
            icon={TrendingUp}
            className="border-l-4 border-l-orange-500"
          />
        </div>

        <Separator />

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart data={chartData.revenue} />
          <UserGrowthChart data={chartData.userGrowth} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TrafficSourceChart data={chartData.trafficSources} />
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Quick Insights
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </CardTitle>
              <CardDescription>
                Key performance highlights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
                  <div>
                    <div className="font-semibold text-green-800 dark:text-green-200">Best Performing Campaign</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Product Launch Blitz</div>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">4.1x ROAS</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
                  <div>
                    <div className="font-semibold text-blue-800 dark:text-blue-200">Top Traffic Source</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Organic Search</div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white">
                    37.8% share
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
                  <div>
                    <div className="font-semibold text-purple-800 dark:text-purple-200">Conversion Leader</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Retargeting Excellence</div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-500 hover:bg-purple-600 text-white">
                    3.8x ROAS
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Table */}
        <CampaignTable data={tableData} />

        {/* Footer */}
        <div className="flex items-center justify-between py-6 border-t">
          <div className="text-sm text-muted-foreground">
            © 2024 ADmyBRAND Insights. Empowering digital marketing decisions.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Button variant="link" size="sm" className="h-auto p-0">
              Documentation
            </Button>
            <Button variant="link" size="sm" className="h-auto p-0">
              Support
            </Button>
            <Button variant="link" size="sm" className="h-auto p-0">
              API
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;