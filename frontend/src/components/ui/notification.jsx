import * as React from "react"
import { cn } from "../../lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

const Notification = React.forwardRef(({ 
  className, 
  title, 
  message, 
  variant = "default",
  onClose,
  duration = 5000,
  ...props 
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const variants = {
    default: {
      icon: Info,
      className: "bg-background border border-border",
      iconColor: "text-primary"
    },
    success: {
      icon: CheckCircle,
      className: "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400"
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/50 dark:border-yellow-800",
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    error: {
      icon: AlertCircle,
      className: "bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400"
    },
    info: {
      icon: Info,
      className: "bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400"
    }
  }

  const variantConfig = variants[variant]
  const Icon = variantConfig.icon

  if (!isVisible) return null

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-300",
        variantConfig.className,
        className
      )}
      {...props}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent opacity-50" />
      
      <div className="relative z-10 flex items-start gap-3">
        <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", variantConfig.iconColor)} />
        
        <div className="flex-1 space-y-1">
          {title && (
            <h4 className="text-sm font-semibold text-foreground">
              {title}
            </h4>
          )}
          {message && (
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false)
              onClose()
            }}
            className="h-5 w-5 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      
      {/* Progress bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-current/20">
          <div 
            className="h-full bg-current transition-all duration-300 ease-linear"
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  )
})
Notification.displayName = "Notification"

export { Notification } 