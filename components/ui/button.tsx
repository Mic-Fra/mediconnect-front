import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger" | "success"| "outline"; // ✅ Custom button variants
  isLoading?: boolean; // ✅ Show loading state
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", isLoading, disabled, children, ...props }, ref) => {
    const baseStyles =
      "px-4 py-2 rounded-md text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
      default: "bg-gray-500 hover:bg-gray-600",
      primary: "bg-blue-500 hover:bg-blue-700 focus:ring-blue-500",
      danger: "bg-red-500 hover:bg-red-700 focus:ring-red-500",
      success: "bg-green-500 hover:bg-green-700 focus:ring-green-500",
      outline: "border-2 border-blue-500 text-white bg-blue-500 rounded px-6 py-3 hover:bg-blue-600 transition"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant], // ✅ Always a valid string
          (disabled || isLoading) ? "opacity-50 cursor-not-allowed" : "", // ✅ String instead of boolean
          className
        )}
        {...props}
      >
        {isLoading ? "Updating..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
