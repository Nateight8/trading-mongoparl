import { CheckCircle } from "lucide-react";

export default function Step1() {
  return (
    <>
      <div className="space-y-8 py-20">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Trading Mongopark</h1>
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
              Traders who journal consistently see 27% better risk management
              outcomes.
            </strong>
          </p>
        </div>

        <div className="bg-muted/20 p-4 rounded-lg border border-dashed border-primary/40">
          <p className="italic text-primary">
            <strong>Coming soon:</strong> An AI-powered assistant to help you
            log, analyze, and optimize your trades.
          </p>
        </div>
      </div>
    </>
  );
}
