import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, CheckCircle } from "lucide-react";

export default function AddAccount() {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);

  return (
    <div className="inset-0 bg-background/80 backdrop-blur-sm fixed z-50 p-4 flex items-center justify-center">
      <div className="w-full h-full bg-background max-w-4xl shadow-black/20 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full bg-muted h-1">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                Welcome to Trading Mongopark
              </h1>
              <p className="text-xl text-muted-foreground">
                Your risk-first trading companion.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span>Start journaling trades with clarity.</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span>Track performance across accounts.</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span>Stay disciplined and avoid fatal drawdowns.</span>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-muted">
              <p className="text-muted-foreground">
                <strong>
                  Traders who journal consistently see 27% better risk
                  management outcomes.
                </strong>
              </p>
            </div>

            <div className="bg-muted/20 p-4 rounded-lg border border-dashed border-primary/40">
              <p className="italic text-primary">
                <strong>Coming soon:</strong> An AI-powered assistant to help
                you log, analyze, and optimize your trades.
              </p>
            </div>

            <div className="flex gap-4">
              {/* <button onClick={nextStep} className={primaryButtonClass}>
                  Begin Setup <ChevronRight size={18} />
                </button>
                <button onClick={goToDashboard} className={secondaryButtonClass}>
                  Quick Start Dashboard
                </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
