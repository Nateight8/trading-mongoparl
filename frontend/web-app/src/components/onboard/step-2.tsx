"use client";

import { UseFormReturn } from "react-hook-form";
import { useId, useState } from "react";

import {
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { OnboardingForm } from "./onboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Step2({
  form,
}: {
  form: UseFormReturn<OnboardingForm>;
}) {
  return (
    <div className="w-full max-w-xl mx-auto py-20">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Trading Account</h1>
          <p className="text-muted-foreground">
            This enables personalized risk tracking.
          </p>
        </div>
        <FormFields form={form} />
        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
}

export function FormFields({ form }: { form: UseFormReturn<OnboardingForm> }) {
  const id = useId();
  const [customMode, setCustomMode] = useState(false);
  const optionCellClass =
    "w-full min-w-[110px] max-w-[130px] box-border flex items-center justify-center";
  const optionButtonClass =
    "w-full p-2 font-bold text-muted-foreground hover:cursor-pointer bg-card rounded-md border border-border hover:border-primary/50 transition-colors text-sm font-medium text-foreground text-center box-border";

  return (
    <>
      <FormField
        control={form.control}
        name="accountName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Name</FormLabel>
            <FormControl>
              <Input placeholder="eg: FTMO CHALLENGE." {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="broker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broker / Prop Firm</FormLabel>
              <FormControl>
                <Input placeholder="eg: FTMO" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountCurrency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="NGN">NGN</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="accountSize"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <fieldset className="space-y-4">
                <legend className="text-foreground text-sm leading-none font-medium">
                  Account Size / Starting Balance
                </legend>
                <RadioGroup
                  className="grid grid-cols-3 gap-2"
                  defaultValue="1"
                  onValueChange={(val) => {
                    field.onChange(val);
                    setCustomMode(false);
                  }}
                  value={field.value}
                >
                  {items.map((item) => (
                    <label
                      key={`${id}-${item.value}`}
                      className={`${optionCellClass} border-input hover:border-primary/50 hover:cursor-pointer has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50`}
                    >
                      <RadioGroupItem
                        id={`${id}-${item.value}`}
                        value={item.value}
                        className="sr-only after:absolute after:inset-0"
                      />
                      <p className="text-foreground text-sm leading-none font-medium">
                        {item.label}
                      </p>
                    </label>
                  ))}
                  <div className={optionCellClass}>
                    {customMode ? (
                      <Input
                        autoFocus
                        placeholder="Custom"
                        className={optionButtonClass}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={() => {
                          if (!field.value) setCustomMode(false);
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        className={optionButtonClass}
                        onClick={() => setCustomMode(true)}
                      >
                        Custom
                      </button>
                    )}
                  </div>
                </RadioGroup>
              </fieldset>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="bg-muted/90 rounded-lg border border-dashed border-border p-4 mb-4">
        <h3 className="text-sm font-semibold mb-2">
          Account Rules (Breach = Account Failure)
        </h3>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={form.control}
            name="maxDailyDrawdown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Daily Drawdown (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: 5%"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                    Maximum loss allowed in a single day
                  </FormDescription> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxTotalDrawdown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Total Drawdown (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: 10%"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                    Maximum overall loss allowed
                  </FormDescription> */}
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center mt-1">
          <div className="w-4 h-4 flex items-center justify-center bg-primary/20 rounded-full text-primary mr-2">
            ?
          </div>
          <p className="text-xs text-muted-foreground">
            This can be personal limits for personal account or limit set by
            your preferred prop firm that cannot be exceeded
          </p>
        </div>
      </div>
      <div className="p-4 bg-primary/5 rounded-lg border border-dashed border-primary/30 mb-2">
        <h3 className="text-sm font-semibold mb-1">Common Prop Firm Rules</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              form.setValue("maxDailyDrawdown", 5);
              form.setValue("maxTotalDrawdown", 10);
            }}
            className="p-2 hover:cursor-pointer bg-card rounded border border-border hover:border-primary/50 transition-colors"
          >
            <span className="font-medium">FTMO Standard</span>
            <p className="text-muted-foreground">5% daily / 10% max</p>
          </button>
          <button
            type="button"
            onClick={() => {
              form.setValue("maxDailyDrawdown", 4);
              form.setValue("maxTotalDrawdown", 8);
            }}
            className="p-2 hover:cursor-pointer bg-card rounded border border-border hover:border-primary/50 transition-colors"
          >
            <span className="font-medium">True Forex</span>
            <p className="text-muted-foreground">4% daily / 8% max</p>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex hover:cursor-pointer items-center gap-2 text-primary hover:text-primary/80 mt-2"
      >
        <PlusCircle size={16} /> Add Another Account
      </button>
    </>
  );
}

const items = [
  { value: "5000", label: "$5,000" },
  { value: "10000", label: "$10,000" },
  { value: "20000", label: "$20,000" },
  { value: "50000", label: "$50,000" },
  { value: "100000", label: "$100,000" },
];
