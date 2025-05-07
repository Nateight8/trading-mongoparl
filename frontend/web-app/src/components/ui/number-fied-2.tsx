"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as React from "react";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components";

export interface NumberField2Props
  extends Omit<AriaNumberFieldProps, "children"> {
  label?: React.ReactNode;
  name?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  placeholder?: string;
  className?: string;
}

const NumberField2 = React.forwardRef<HTMLInputElement, NumberField2Props>(
  (
    {
      label,
      name,
      value,
      defaultValue,
      onChange,
      minValue,
      maxValue,
      step,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <AriaNumberField
        value={value}
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        onChange={onChange}
        {...props}
      >
        <div className="*:not-first:mt-2">
          {label && (
            <Label className="text-foreground text-sm font-medium">
              {label}
            </Label>
          )}
          <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
            <Input
              ref={ref}
              name={name}
              className={
                "bg-background text-foreground flex-1 px-3 py-2 tabular-nums " +
                (className || "")
              }
              placeholder={placeholder}
            />
            <div className="flex h-[calc(100%+2px)] flex-col">
              <Button
                slot="increment"
                className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronUpIcon size={12} aria-hidden="true" />
              </Button>
              <Button
                slot="decrement"
                className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronDownIcon size={12} aria-hidden="true" />
              </Button>
            </div>
          </Group>
        </div>
      </AriaNumberField>
    );
  }
);
NumberField2.displayName = "NumberField2";

export default NumberField2;
