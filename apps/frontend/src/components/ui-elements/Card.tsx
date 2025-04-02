import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends Omit<React.ComponentProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className, hover = true, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg p-6 glass",
        "hover:shadow-lg transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
