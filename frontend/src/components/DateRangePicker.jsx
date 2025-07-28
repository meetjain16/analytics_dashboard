import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CalendarIcon, X } from 'lucide-react';
import { format, subDays, subMonths, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

const DateRangePicker = ({ dateRange, onDateRangeChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState(dateRange);

  const presetRanges = [
    {
      label: 'Last 7 Days',
      value: 'last7days',
      range: { from: subDays(new Date(), 6), to: new Date() }
    },
    {
      label: 'Last 30 Days', 
      value: 'last30days',
      range: { from: subDays(new Date(), 29), to: new Date() }
    },
    {
      label: 'Last 3 Months',
      value: 'last3months',
      range: { from: subMonths(new Date(), 3), to: new Date() }
    },
    {
      label: 'This Month',
      value: 'thismonth',
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) }
    },
    {
      label: 'Last Month',
      value: 'lastmonth',
      range: { 
        from: startOfMonth(subMonths(new Date(), 1)), 
        to: endOfMonth(subMonths(new Date(), 1)) 
      }
    },
    {
      label: 'This Year',
      value: 'thisyear',
      range: { from: startOfYear(new Date()), to: endOfYear(new Date()) }
    },
    {
      label: 'All Time',
      value: 'alltime',
      range: null
    }
  ];

  const handlePresetSelect = (preset) => {
    if (preset.range) {
      setTempRange(preset.range);
      onDateRangeChange(preset.range);
    } else {
      setTempRange(null);
      onDateRangeChange(null);
    }
    setIsOpen(false);
  };

  const handleCalendarSelect = (range) => {
    setTempRange(range);
  };

  const handleApply = () => {
    onDateRangeChange(tempRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempRange(null);
    onDateRangeChange(null);
    setIsOpen(false);
  };

  const formatDateRange = (range) => {
    if (!range?.from) return 'Select date range';
    if (range.from && range.to) {
      return `${format(range.from, 'MMM d, yyyy')} - ${format(range.to, 'MMM d, yyyy')}`;
    }
    return format(range.from, 'MMM d, yyyy');
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-[300px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(dateRange)}
            {dateRange && (
              <X 
                className="ml-auto h-4 w-4 hover:bg-muted rounded" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Preset Options */}
            <div className="border-r p-3 space-y-1">
              <div className="text-sm font-medium mb-2">Quick Select</div>
              {presetRanges.map((preset) => (
                <Button
                  key={preset.value}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs h-8"
                  onClick={() => handlePresetSelect(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            
            {/* Calendar */}
            <div className="p-3">
              <Calendar
                mode="range"
                selected={tempRange}
                onSelect={handleCalendarSelect}
                numberOfMonths={2}
                className="rounded-md"
              />
              
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={!tempRange?.from}
                >
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;