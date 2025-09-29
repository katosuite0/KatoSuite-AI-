import React from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "outline" | "secondary" | "destructive";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-blue-100 text-blue-800",
  outline: "border border-current text-current",
  secondary: "bg-gray-100 text-gray-700",
  destructive: "bg-red-100 text-red-700",
};

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", ...props }) => (
  <span
    className={clsx(
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
      variantClasses[variant],
      className,
    )}
    {...props}
  />
);

export default Badge;
