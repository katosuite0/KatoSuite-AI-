import React from "react";
import clsx from "clsx";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Avatar: React.FC<AvatarProps> = ({ className, children, ...props }) => (
  <div
    className={clsx(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage: React.FC<AvatarImageProps> = ({ className, ...props }) => (
  <img className={clsx("h-full w-full object-cover", className)} {...props} />
);

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ className, children, ...props }) => (
  <span className={clsx("flex h-full w-full items-center justify-center text-sm font-medium", className)} {...props}>
    {children}
  </span>
);

export default Avatar;
