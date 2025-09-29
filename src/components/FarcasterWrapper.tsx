"use client";

import React from "react";

interface FarcasterWrapperProps {
  children: React.ReactNode;
}

const FarcasterWrapper: React.FC<FarcasterWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default FarcasterWrapper;
