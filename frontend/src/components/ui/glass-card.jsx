import * as React from "react"
import { cn } from "../../lib/utils"

const GlassCard = React.forwardRef(({ 
  className, 
  children, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-background/60 backdrop-blur-md border border-white/20 shadow-xl",
    elevated: "bg-background/80 backdrop-blur-lg border border-white/30 shadow-2xl",
    subtle: "bg-background/40 backdrop-blur-sm border border-white/10 shadow-lg",
    dark: "bg-background/90 backdrop-blur-xl border border-white/5 shadow-2xl",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 group",
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  )
})
GlassCard.displayName = "GlassCard"

export { GlassCard } 