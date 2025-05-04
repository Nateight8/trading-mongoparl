"use client";

import { Calendar } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
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
          <h1 className="text-2xl font-bold">Trading Execution & Goal</h1>
          <p className="text-muted-foreground">
            Trading Execution Strategy & Profit Target
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

      <FormField
        control={form.control}
        name="planNote"
        render={({ field }) => (
          <FormItem className={formGroupClass}>
            <FormLabel className={labelClass} htmlFor="planNote">
              Note
            </FormLabel>
            <FormControl>
              <Textarea
                id="planNote"
                className={`${inputClass} min-h-24`}
                placeholder="Brief notes about your plan (e.g., 'Trend following on 1H charts with 2:1 RR')"
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
