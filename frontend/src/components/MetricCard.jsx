import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ 
  title, 
  current, 
  previous, 
  change, 
  target, 
  format = 'number', 
  icon: Icon,
  className = '' 
}) => {
  const isPositive = change > 0;
  const progressPercentage = format === 'currency' 
    ? (current / target) * 100 
    : format === 'percentage'
    ? (current / target) * 100
    : (current / target) * 100;

  const formatValue = (value) => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold tracking-tight">
            {formatValue(current)}
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"}
            className="flex items-center gap-1"
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress to target</span>
            <span>{formatValue(target)}</span>
          </div>
          <Progress 
            value={Math.min(progressPercentage, 100)} 
            className="h-2"
          />
          <div className="text-xs text-muted-foreground">
            {progressPercentage.toFixed(1)}% of target achieved
          </div>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground">
          Previous: {formatValue(previous)}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;