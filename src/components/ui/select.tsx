import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type SelectContextValue = {
  value: string | undefined;
  setValue: (value: string, label: string) => void;
  selectedLabel?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const value = valueProp ?? internalValue;

  const contextValue = useMemo<SelectContextValue>(
    () => ({
      value,
      selectedLabel,
      open,
      setOpen,
      setValue: (nextValue: string, label: string) => {
        setInternalValue(nextValue);
        setSelectedLabel(label);
        onValueChange?.(nextValue);
        setOpen(false);
      },
    }),
    [value, selectedLabel, open, onValueChange],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={clsx("relative", className)}>{children}</div>
    </SelectContext.Provider>
  );
};

const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within <Select>");
  }
  return context;
};

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={clsx(
          "flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          className,
        )}
        {...props}
      >
        <span className="flex-1 text-left">{children}</span>
        <svg
          className="ml-2 h-4 w-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.04 1.08l-4.24 3.83a.75.75 0 01-1.04 0l-4.24-3.83a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value, selectedLabel } = useSelectContext();
  if (!value) {
    return <span className="text-gray-400">{placeholder ?? "Select"}</span>;
  }
  return <span>{selectedLabel ?? value}</span>;
};

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { open } = useSelectContext();
  if (!open) return null;
  return (
    <div
      role="listbox"
      className={clsx(
        "absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg",
        className,
      )}
      {...props}
    />
  );
};

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, className, ...props }) => {
  const { setValue } = useSelectContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      type="button"
      role="option"
      onClick={() => {
        const label = typeof children === "string" ? children : buttonRef.current?.innerText ?? value;
        setValue(value, label);
      }}
      className={clsx(
        "flex w-full cursor-pointer items-center justify-start px-3 py-2 text-sm text-gray-700",
        "hover:bg-gray-100 focus:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Select;
