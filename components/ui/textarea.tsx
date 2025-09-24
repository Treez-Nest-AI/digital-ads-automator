import type * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm transition-colors",
        "placeholder:text-gray-500",
        "focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/20 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
