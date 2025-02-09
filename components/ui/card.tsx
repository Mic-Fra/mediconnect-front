import { cn } from "@/lib/utils"; // Import utility for merging class names
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(" rounded-xl shadow-lg p-6", className)}>
      {children}
    </div>
  );
}
