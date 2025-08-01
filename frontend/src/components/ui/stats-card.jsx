import * as React from "react"
import { Card, CardContent } from "./card"
import { cn } from "../../lib/utils"

const StatsCard = React.forwardRef(({ 
  className, 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = "primary",
  ...props 
}, ref) => {
  const colorClasses = {
    primary: "from-primary/20 to-primary/10 text-primary",
    success: "from-green-500/20 to-green-500/10 text-green-600",
    warning: "from-yellow-500/20 to-yellow-500/10 text-yellow-600",
    danger: "from-red-500/20 to-red-500/10 text-red-600",
    info: "from-blue-500/20 to-blue-500/10 text-blue-600",
    purple: "from-purple-500/20 to-purple-500/10 text-purple-600",
  }

  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-muted-foreground"
  }

  return (
    <Card 
      ref={ref} 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 group",
        className
      )}
      {...props}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {title}
            </p>
            <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {value}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          
          {Icon && (
            <div className={cn(
              "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300",
              colorClasses[color]
            )}>
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
        
        {trend && trendValue && (
          <div className="mt-4 flex items-center gap-2">
            <span className={cn(
              "text-xs font-medium",
              trendColors[trend]
            )}>
              {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
            </span>
            <span className="text-xs text-muted-foreground">
              vs last period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
StatsCard.displayName = "StatsCard"

export { StatsCard } 