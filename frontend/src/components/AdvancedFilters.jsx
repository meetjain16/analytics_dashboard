import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import DateRangePicker from './DateRangePicker';
import { Filter, RotateCcw } from 'lucide-react';

const AdvancedFilters = ({ 
  dateRange, 
  onDateRangeChange,
  campaignStatus,
  onCampaignStatusChange,
  onResetFilters,
  className = ''
}) => {
  const getActiveFilterCount = () => {
    let count = 0;
    if (dateRange && dateRange.from) count++;
    if (campaignStatus && campaignStatus !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className={`${className} border-dashed`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onResetFilters}
              className="text-xs h-6 px-2"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
            />
          </div>

          {/* Campaign Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Campaign Status</label>
            <Select value={campaignStatus} onValueChange={onCampaignStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Campaigns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {activeFilterCount > 0 && (
          <div className="mt-4 pt-3 border-t">
            <div className="text-xs text-muted-foreground">
              Filters applied: Dashboard data is filtered by your selected criteria
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;