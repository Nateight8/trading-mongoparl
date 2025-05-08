import { useId } from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetricCard from "./metric-card";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
// import { Chart01 } from "./chart-01";
import PortfolioChart from "./chart-03";
import { PortfolioOverview } from "@/graphql/operations/account";

// Only the props needed for Overview
interface OverviewProps {
  currentCapital: number;
  roi: number;
  // overview: {
  //   name: string;
  //   chartData: { month: string; actual: number; projected: number }[];
  // };

  overview: PortfolioOverview | undefined;
}

export default function Overview({
  currentCapital,
  roi,
  overview,
}: OverviewProps) {
  const id = useId();
  const [period, setPeriod] = useState("today");
  const periodComparison: Record<string, string> = {
    today: "vs yesterday",
    week: "vs last week",
    month: "vs last month",
    year: "vs last year",
  };

  console.log("overview from overview", overview);

  return (
    <>
      <div className="p-4 border-2 border-black h-fit rounded-lg w-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Performance Overview</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <PlusIcon className="w-4 h-4 text-muted-foreground" />
              Add Account
            </Button>
            <div className="*:not-first:mt-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger id={id} className="w-auto max-w-full min-w-32">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <MetricCard
            tradingCapital={currentCapital}
            roi={roi}
            comparisonLabel={periodComparison[period]}
          />
        </div>
      </div>
      {/* <Chart01
        name={overview.name}
        overviewData={{
          name: overview.name,
          currentBalance: currentCapital,
          roi,
          chartData: overview.chartData,
        }}
      /> */}
      <PortfolioChart
        name="Portfolio Performance"
        chartData={overview?.chartData}
        // chartData={apiData.overview.chartData}
        // currentBalance={apiData.overview.currentBalance}
        // pnl={apiData.overview.pnl}
        // roi={apiData.overview.roi}
      />
    </>
  );
}
