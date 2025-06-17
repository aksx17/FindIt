
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className, 
      variant = "primary", 
      size = "md", 
      isLoading = false,
      children, 
      disabled, 
      ...props 
    }, 
    ref
  ) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline text-primary"
    };
    
    const sizeStyles = {
      sm: "h-9 px-3 rounded-md",
      md: "h-10 py-2 px-4",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10"
    };
    
    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isLoading && "opacity-70",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2">
            <svg 
              className="animate-spin-slow"
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </span>
        )}
        <span className={isLoading ? "invisible" : ""}>{children}</span>
      </button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom };
