"use client";

import { Calendar } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import type { OnboardingForm } from "./onboard";
import MultipleSelector, { Option } from "@/components/ui/multi-select";

const formGroupClass = "flex flex-col gap-1";
const labelClass = "text-sm font-medium text-foreground mb-1";
const inputClass =
  "bg-background border-input rounded-md px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] w-full";

export default function Step4({
  form,
}: {
  form: UseFormReturn<OnboardingForm>;
}) {
  return (
    <div className="w-full max-w-xl mx-auto py-20">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">
            Trading Plan <span className="text-muted-foreground">(101)</span>
          </h1>
          <p className="text-muted-foreground">
            Define guidelines for consistent trading performance.
          </p>
        </div>
        <Step4Fields form={form} />
      </div>
    </div>
  );
}

export function Step4Fields({ form }: { form: UseFormReturn<OnboardingForm> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="tradingSessions"
        render={({ field }) => {
          const sessionOptions: Option[] = [
            { value: "London", label: "London" },
            { value: "New York", label: "New York" },
            { value: "Tokyo", label: "Tokyo" },
            { value: "Sydney", label: "Sydney" },
          ];
          return (
            <FormItem className={formGroupClass}>
              <FormLabel className={labelClass}>Trading Session</FormLabel>
              <FormControl>
                <MultipleSelector
                  badgeClassName="bg-primary/10 border border-primary/30"
                  commandProps={{ label: "Select trading sessions" }}
                  value={sessionOptions.filter((opt) =>
                    field.value.includes(opt.value)
                  )}
                  defaultOptions={sessionOptions}
                  placeholder="Select sessions"
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-sm">No results found</p>
                  }
                  onChange={(opts) =>
                    field.onChange(opts.map((opt) => opt.value))
                  }
                />
              </FormControl>
              <FormDescription>Select all that apply.</FormDescription>
            </FormItem>
          );
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="maxTradesPerDay"
          render={({ field }) => (
            <FormItem className={formGroupClass}>
              <FormLabel className={labelClass} htmlFor="maxTradesPerDay">
                Max Trades Per Day
              </FormLabel>
              <FormControl>
                <Input
                  id="maxTradesPerDay"
                  className={inputClass}
                  type="text"
                  placeholder="5"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consecutiveLosses"
          render={({ field }) => (
            <FormItem className={formGroupClass}>
              <FormLabel className={labelClass} htmlFor="consecutiveLosses">
                Stop After Losses
              </FormLabel>
              <FormControl>
                <Input
                  id="consecutiveLosses"
                  className={inputClass}
                  type="text"
                  placeholder="3"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Consecutive losses before stopping
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      <div className="p-4 bg-primary/10 rounded-lg border border-dashed border-primary/30">
        <FormField
          control={form.control}
          name="weeklyProfitTarget"
          render={({ field }) => (
            <FormItem className={formGroupClass}>
              <FormLabel className={labelClass} htmlFor="weeklyProfitTarget">
                Weekly Profit Target (%)
              </FormLabel>
              <FormControl>
                <Input
                  id="weeklyProfitTarget"
                  className={inputClass}
                  type="text"
                  placeholder="e.g. 10"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="strategy"
        render={({ field }) => (
          <FormItem className={formGroupClass}>
            <FormLabel className={labelClass} htmlFor="strategy">
              Strategy Notes
            </FormLabel>
            <FormControl>
              <Textarea
                id="strategy"
                className={`${inputClass} min-h-24`}
                placeholder="Brief notes about your strategy (e.g., 'Trend following on 1H charts with 2:1 RR')"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="bg-muted/20 p-4 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          <p className="text-sm text-muted-foreground">
            Your trading plan will be used to generate reminders and provide
            personalized analytics.
          </p>
        </div>
      </div>
    </>
  );
}
