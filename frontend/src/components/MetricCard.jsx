import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';

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
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${className}`}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        {Icon && (
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {formatValue(current)}
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"}
            className="flex items-center gap-1 shadow-sm group-hover:scale-105 transition-transform"
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              Progress to target
            </span>
            <span className="font-medium">{formatValue(target)}</span>
          </div>
          <Progress 
            value={Math.min(progressPercentage, 100)} 
            className="h-3 group-hover:h-4 transition-all duration-300"
          />
          <div className="text-xs text-muted-foreground flex items-center justify-between">
            <span>{progressPercentage.toFixed(1)}% of target achieved</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              progressPercentage >= 100 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                : progressPercentage >= 80 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
            }`}>
              {progressPercentage >= 100 ? 'Target Reached' : progressPercentage >= 80 ? 'On Track' : 'Needs Attention'}
            </span>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground flex items-center justify-between p-2 rounded-lg bg-muted/50">
          <span>Previous period:</span>
          <span className="font-medium">{formatValue(previous)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;