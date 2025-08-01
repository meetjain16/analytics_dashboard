import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

const FloatingActionButton = React.forwardRef(({ 
  className, 
  children, 
  icon: Icon,
  variant = "default",
  size = "default",
  onClick,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl",
    success: "bg-green-500 text-white shadow-lg hover:shadow-xl",
    warning: "bg-yellow-500 text-white shadow-lg hover:shadow-xl",
    danger: "bg-red-500 text-white shadow-lg hover:shadow-xl",
    glass: "bg-background/20 backdrop-blur-sm border border-white/20 text-foreground shadow-lg hover:shadow-xl",
  }

  const sizes = {
    default: "h-12 w-12",
    sm: "h-10 w-10",
    lg: "h-14 w-14",
  }

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl z-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </Button>
  )
})
FloatingActionButton.displayName = "FloatingActionButton"

export { FloatingActionButton } 