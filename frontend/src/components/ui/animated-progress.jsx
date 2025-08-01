import * as React from "react"
import { cn } from "../../lib/utils"

const AnimatedProgress = React.forwardRef(({ 
  className, 
  value = 0, 
  max = 100, 
  variant = "default",
  showLabel = true,
  animated = true,
  ...props 
}, ref) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const variants = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
    purple: "bg-purple-500",
  }

  const bgVariants = {
    default: "bg-primary/20",
    success: "bg-green-500/20",
    warning: "bg-yellow-500/20",
    danger: "bg-red-500/20",
    info: "bg-blue-500/20",
    purple: "bg-purple-500/20",
  }

  return (
    <div
      ref={ref}
      className={cn("w-full space-y-2", className)}
      {...props}
    >
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{percentage.toFixed(1)}%</span>
        </div>
      )}
      
      <div className={cn(
        "relative h-3 w-full overflow-hidden rounded-full",
        bgVariants[variant]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            variants[variant],
            animated && "animate-pulse"
          )}
          style={{
            width: `${percentage}%`,
            transition: animated ? 'width 1s ease-out' : 'none'
          }}
        />
        
        {/* Animated glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-0 blur-sm transition-opacity duration-500",
            variants[variant]
          )}
          style={{
            width: `${percentage}%`,
            opacity: animated ? 0.3 : 0
          }}
        />
      </div>
    </div>
  )
})
AnimatedProgress.displayName = "AnimatedProgress"

export { AnimatedProgress } 