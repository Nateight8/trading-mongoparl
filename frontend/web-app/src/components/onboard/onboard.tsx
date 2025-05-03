"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";

export const onboardingSchema = z.object({
  // Step 2
  accountName: z.string().min(2, "Account name is required"),
  broker: z.string().min(2, "Broker is required"),
  // startingBalance: z.coerce.number().min(1, "Starting balance is required"),
  accountCurrency: z.string().min(1, "Currency is required"),
  maxDailyDrawdown: z.coerce.number().min(1, "Max daily drawdown is required"),
  maxTotalDrawdown: z.coerce.number().min(1, "Max total drawdown is required"),
  accountSize: z.string().min(1, "Account size is required"),

  // Step 3
  riskPerTrade: z.string().min(1, "Required"),
  maxDailyRisk: z.string().min(1, "Required"),
  tradingStyle: z.string().min(1, "Required"),
  riskRewardRatio: z.string().min(1, "Required"),
  timeZone: z.string().min(1, "Required"),

  // Step 4
  tradingSessions: z.array(z.string()).min(1, "Select at least one session"),
  maxTradesPerDay: z.string().min(1, "Required"),
  consecutiveLosses: z.string().min(1, "Required"),
  weeklyProfitTarget: z.string().min(1, "Required"),
  strategy: z.string().min(1, "Required"),
});

export type OnboardingForm = z.infer<typeof onboardingSchema>;

export default function Onboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      accountName: "",
      broker: "",
      //   startingBalance: 0,
      accountCurrency: "",
      maxDailyDrawdown: 0,
      maxTotalDrawdown: 0,
      accountSize: "",
      riskPerTrade: "",
      maxDailyRisk: "",
      tradingStyle: "",
      riskRewardRatio: "",
      timeZone: "",
      tradingSessions: [],
      maxTradesPerDay: "",
      consecutiveLosses: "",
      weeklyProfitTarget: "",
      strategy: "",
    },
  });

  const stepFields: Array<(keyof OnboardingForm)[]> = [
    [], // step 1 has no fields
    [
      "accountName",
      "broker",
      //   "startingBalance",
      "accountCurrency",
      "maxDailyDrawdown",
      "maxTotalDrawdown",
      "accountSize",
    ], // step 2
    [
      "riskPerTrade",
      "maxDailyRisk",
      "tradingStyle",
      "riskRewardRatio",
      "timeZone",
    ], // step 3
    [
      "tradingSessions",
      "maxTradesPerDay",
      "consecutiveLosses",
      "weeklyProfitTarget",
      "strategy",
    ], // step 4
  ];

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = async () => {
    const valid = await form.trigger(stepFields[currentStep - 1]);
    if (valid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit = (data: OnboardingForm) => {
    console.log("Form submitted!", data);
  };

  return (
    <div className="inset-0 bg-background/80 backdrop-blur-sm fixed z-50 p-4 flex items-center justify-center h-full">
      <div className="w-full border  flex flex-col h-full bg-background max-w-4xl shadow-black/20 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full bg-muted h-1">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
          <div className="h-1" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              alert("Validation failed! See console for details.");
              console.log("Validation errors:", errors);
            })}
            className="flex flex-col flex-1 h-full px-4 py-8 w-full"
          >
            <ScrollArea className="flex-1 w-full min-h-0">
              {currentStep === 1 && <Step1 />}
              {currentStep === 2 && <Step2 form={form} />}
              {currentStep === 3 && <Step3 form={form} />}
              {currentStep === 4 && <Step4 form={form} />}
            </ScrollArea>
            <div className="p-4 flex justify-end border-t border-border w-full mt-auto">
              <div className="absolute left-4 top-4 text-xs text-muted-foreground">
                Current Step: {currentStep}
              </div>
              <div className="flex gap-2">
                <Button
                  disabled={currentStep === 1}
                  variant="outline"
                  onClick={handleBack}
                  type="button"
                >
                  Back
                </Button>
                {currentStep === 4 ? (
                  <Button type="submit">submit</Button>
                ) : (
                  <Button type="button" onClick={handleNext}>
                    Save and continue
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
