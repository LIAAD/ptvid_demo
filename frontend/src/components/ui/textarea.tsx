import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex w-full resize-none bg-transparent ring-0 focus:ring-0 focus-visible:ring-0 border-0 focus:border-0 focus-visible:border-0 outline-none focus:outline-none focus-visible:outline-none text-center",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea } 