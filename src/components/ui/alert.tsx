import React from "react";
import clsx from "clsx";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

const variantClasses: Record<NonNullable<AlertProps["variant"]>, string> = {
  default: "border-blue-200 bg-blue-50 text-blue-800",
  destructive: "border-red-200 bg-red-50 text-red-800",
};

export const Alert: React.FC<AlertProps> = ({ variant = "default", className, ...props }) => (
  <div
    role="alert"
    className={clsx(
      "flex items-start gap-2 rounded-md border px-3 py-2 text-sm",
      variantClasses[variant],
      className,
    )}
    {...props}
  />
);

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p className={clsx("text-sm leading-5", className)} {...props} />
);

export default Alert;
