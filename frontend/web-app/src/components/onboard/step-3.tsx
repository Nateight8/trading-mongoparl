"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { OnboardingForm } from "./onboard";
import { useId, useMemo, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Step3({
  form,
}: {
  form: UseFormReturn<OnboardingForm>;
}) {
  return (
    <div className="w-full max-w-xl mx-auto py-20">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Risk Management </h1>
          <p className="text-muted-foreground">
            Risk management parameters and trading style preferences
          </p>
        </div>
        <FormFields form={form} />
        <div className="flex items-center gap-2 "></div>
      </div>
    </div>
  );
}

export function FormFields({ form }: { form: UseFormReturn<OnboardingForm> }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timezones = Intl.supportedValuesOf("timeZone");
  const formattedTimezones = useMemo(() => {
    return timezones
      .map((timezone) => {
        const formatter = new Intl.DateTimeFormat("en", {
          timeZone: timezone,
          timeZoneName: "shortOffset",
        });
        const parts = formatter.formatToParts(new Date());
        const offset =
          parts.find((part) => part.type === "timeZoneName")?.value || "";
        const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;
        return {
          value: timezone,
          label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
          numericOffset: parseInt(
            offset.replace("GMT", "").replace("+", "") || "0"
          ),
        };
      })
      .sort((a, b) => a.numericOffset - b.numericOffset);
  }, [timezones]);

  return (
    <>
      <div className="p-4 bg-primary/5 rounded-lg border border-dashed border-primary/30 mb-2">
        <div className="">
          <h3 className="text-sm font-semibold mb-4">
            Personal Risk Management & Trading Plan
          </h3>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="riskPerTrade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Per Trade (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: 1%"
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Percentage of account balance risked per trade
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxDailyRisk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Daily Risk (%)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: 1%"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum loss allowed in a single day
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxOpenTrades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Open Trades</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: 1%"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Limits number of positions at a time
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/90 rounded-lg border border-dashed border-border p-4 mb-4">
        <h3 className="text-sm font-semibold mb-2">Trading Rules</h3>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={form.control}
            name="tradingStyle"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={id}>Trading Style</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue=""
                    >
                      <SelectTrigger id={id} className="w-full bg-background">
                        <SelectValue placeholder="Select trading style" />
                      </SelectTrigger>
                      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                        <SelectItem value="Scalping">Scalping</SelectItem>
                        <SelectItem value="Day Trading">Day Trading</SelectItem>
                        <SelectItem value="Swing Trading">
                          Swing Trading
                        </SelectItem>
                        <SelectItem value="Position Trading">
                          Position Trading
                        </SelectItem>
                        <SelectItem value="Algorithmic">Algorithmic</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="riskRewardRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk:Reward Ratio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: 1:3"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center mt-1">
          <div className="w-4 h-4 flex items-center justify-center bg-primary/20 rounded-full text-primary mr-2">
            ?
          </div>
          <p className="text-xs text-muted-foreground">
            These can be personal limits or limit set by your prop that cannot
            be exceeded
          </p>
        </div>
      </div>
      <FormField
        control={form.control}
        name="timeZone"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <div className="*:not-first:mt-2">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id={id}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                      >
                        <span
                          className={cn(
                            "truncate",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? formattedTimezones.find(
                                (timezone) => timezone.value === field.value
                              )?.label
                            : "Select timezone"}
                        </span>
                        <ChevronDownIcon
                          size={16}
                          className="text-muted-foreground/80 shrink-0"
                          aria-hidden="true"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                      align="start"
                    >
                      <Command
                        filter={(value, search) => {
                          const normalizedValue = value.toLowerCase();
                          const normalizedSearch = search
                            .toLowerCase()
                            .replace(/\s+/g, "");
                          return normalizedValue.includes(normalizedSearch)
                            ? 1
                            : 0;
                        }}
                      >
                        <CommandInput placeholder="Search timezone..." />
                        <CommandList>
                          <CommandEmpty>No timezone found.</CommandEmpty>
                          <CommandGroup>
                            {formattedTimezones.map(
                              ({ value: itemValue, label }) => (
                                <CommandItem
                                  key={itemValue}
                                  value={itemValue}
                                  onSelect={(currentValue) => {
                                    field.onChange(
                                      currentValue === field.value
                                        ? ""
                                        : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  {label}
                                  {field.value === itemValue && (
                                    <CheckIcon size={16} className="ml-auto" />
                                  )}
                                </CommandItem>
                              )
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />
    </>
  );
}
