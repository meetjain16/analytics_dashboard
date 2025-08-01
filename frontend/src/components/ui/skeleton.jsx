import * as React from "react"
import { cn } from "../../lib/utils"

const Skeleton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "animate-pulse rounded-md bg-muted relative overflow-hidden",
      className
    )}
    {...props}
  >
    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
))
Skeleton.displayName = "Skeleton"

const SkeletonCard = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card p-6 space-y-4",
      className
    )}
    {...props}
  >
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
))
SkeletonCard.displayName = "SkeletonCard"

const SkeletonMetric = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card p-6 space-y-4",
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
    <Skeleton className="h-2 w-full" />
  </div>
))
SkeletonMetric.displayName = "SkeletonMetric"

export { Skeleton, SkeletonCard, SkeletonMetric }
