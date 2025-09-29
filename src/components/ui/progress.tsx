import React from "react";
import clsx from "clsx";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, className, ...props }) => (
  <div className={clsx("w-full bg-gray-200 rounded-full", className)} {...props}>
    <div
      className="bg-blue-600 h-full rounded-full"
      style={{ width: `${Math.min(100, Math.max(0, value))}%`, minHeight: "0.5rem" }}
    />
  </div>
);

export default Progress;
