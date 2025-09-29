"use client";

import React from "react";

export interface PrivyProviderProps {
  children: React.ReactNode;
}

const PRIVY_APP_ID = "cm5yjbh8z01lv6heoze3v3ep5";
const CLIENT_ID = "client-WY5fRbUUsnYnSBnU7hp47apYGAdUgABi38uhK4PxBYLpx";

const PrivyWrapper: React.FC<PrivyProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export { PrivyWrapper, PRIVY_APP_ID, CLIENT_ID };
