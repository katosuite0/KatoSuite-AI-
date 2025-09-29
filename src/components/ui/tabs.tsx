import React, { createContext, useContext, useMemo, useState } from "react";
import clsx from "clsx";

type TabsContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: valueProp,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const value = valueProp ?? internalValue;

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value,
      setValue: (nextValue: string) => {
        setInternalValue(nextValue);
        onValueChange?.(nextValue);
      },
    }),
    [value, onValueChange],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const useTabsContext = (): TabsContextValue => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>");
  }

  return context;
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    role="tablist"
    className={clsx("inline-flex h-10 items-center justify-start rounded-md bg-gray-100 p-1", className)}
    {...props}
  />
);

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { value: selectedValue, setValue } = useTabsContext();
    const isActive = selectedValue === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        onClick={() => setValue(value)}
        className={clsx(
          "inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-sm font-medium",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          isActive ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900",
          className,
        )}
        {...props}
      />
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();

    if (selectedValue !== value) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={className}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "TabsContent";
