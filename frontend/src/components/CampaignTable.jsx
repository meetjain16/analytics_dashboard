import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Download, ChevronUp, ChevronDown } from 'lucide-react';
import { useCampaigns } from '../hooks/useAnalytics';

const CampaignTable = ({ title = "Campaign Performance" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const itemsPerPage = 5;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use custom hook with parameters
  const params = useMemo(() => ({
    search: debouncedSearch || undefined,
    status_filter: statusFilter !== 'all' ? statusFilter : undefined,
    page: currentPage,
    per_page: itemsPerPage,
    sort_by: sortConfig.key || undefined,
    sort_direction: sortConfig.direction
  }), [debouncedSearch, statusFilter, currentPage, sortConfig]);

  const { campaignData, loading, error, refetch } = useCampaigns(params);

  const totalPages = Math.ceil(campaignData.total / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1); // Reset to first page on sort
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page on filter
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { variant: 'default', className: 'bg-green-500 hover:bg-green-600' },
      'Paused': { variant: 'secondary', className: 'bg-yellow-500 hover:bg-yellow-600 text-white' },
      'Completed': { variant: 'outline', className: 'bg-blue-500 hover:bg-blue-600 text-white' }
    };
    
    const config = statusConfig[status] || { variant: 'secondary', className: '' };
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const SortButton = ({ column, children }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(column)}
      className="h-auto p-0 font-semibold hover:bg-transparent"
    >
      <div className="flex items-center gap-1">
        {children}
        {sortConfig.key === column && (
          sortConfig.direction === 'asc' ? 
            <ChevronUp className="h-3 w-3" /> : 
            <ChevronDown className="h-3 w-3" />
        )}
      </div>
    </Button>
  );

  if (error) {
    return (
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {title}
              <div className="h-2 w-2 rounded-full bg-red-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-sm text-muted-foreground mb-4">Failed to load campaigns: {error}</div>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {title}
            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardTitle>
        <CardDescription>
          Detailed performance metrics for all active campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-sm text-muted-foreground">Loading campaigns...</div>
          </div>
        ) : (
          <>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><SortButton column="campaign_name">Campaign</SortButton></TableHead>
                    <TableHead><SortButton column="status">Status</SortButton></TableHead>
                    <TableHead className="text-right"><SortButton column="budget">Budget</SortButton></TableHead>
                    <TableHead className="text-right"><SortButton column="spent">Spent</SortButton></TableHead>
                    <TableHead className="text-right"><SortButton column="impressions">Impressions</SortButton></TableHead>
                    <TableHead className="text-right"><SortButton column="clicks">Clicks</SortButton></TableHead>
                    <TableHead className="text-right"><SortButton column="conversions">Conversions</SortButton></TableHead>
                    <TableHead className="text-right"><SortButton column="roas">ROAS</SortButton></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignData.campaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No campaigns found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    campaignData.campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{campaign.campaign_name}</TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell className="text-right">${campaign.budget.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${campaign.spent.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{campaign.conversions.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">
                          <span className={campaign.roas >= 3 ? 'text-green-600' : campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'}>
                            {campaign.roas.toFixed(1)}x
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {campaignData.campaigns.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, campaignData.total)} of {campaignData.total} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignTable;