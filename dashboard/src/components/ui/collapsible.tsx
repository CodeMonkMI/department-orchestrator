
import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const collapsibleVariants = cva(
  "transition-all",
  {
    variants: {
      variant: {
        default: "border rounded-lg",
        ghost: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

interface CollapsibleProps extends 
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>,
  VariantProps<typeof collapsibleVariants> {}

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ className, variant, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    className={cn(collapsibleVariants({ variant }), className)}
    {...props}
  />
))
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-between py-2 px-4 font-medium transition-all hover:bg-accent [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.Trigger>
))
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
    {...props}
  >
    <div className="px-4 py-2">{children}</div>
  </CollapsiblePrimitive.Content>
))
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
