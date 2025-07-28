import { useState, useEffect } from 'react';
import { subDays } from 'date-fns';

export const useDateFilter = () => {
  // Default to last 30 days
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 29),
    to: new Date()
  });

  const formatDateForAPI = (date) => {
    if (!date) return null;
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const getDateRangeParams = () => {
    if (!dateRange) return {};
    
    return {
      start_date: formatDateForAPI(dateRange.from),
      end_date: formatDateForAPI(dateRange.to)
    };
  };

  return {
    dateRange,
    setDateRange,
    getDateRangeParams,
    formatDateForAPI
  };
};