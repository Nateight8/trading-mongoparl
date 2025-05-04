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

export default function Overview() {
  const id = useId();
  const [period, setPeriod] = useState("today");
  const periodComparison: Record<string, string> = {
    today: "vs yesterday",
    week: "vs last week",
    month: "vs last month",
    year: "vs last year",
  };

  return (
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
          value={23098}
          change={18}
          comparisonLabel={periodComparison[period]}
        />
        <div className="flex justify-between items-center w-full max-w-md rounded-lg p-4 shadow-sm border shadow-black">
          <h3 className="text-4xl text-muted-foreground font-bold">
            <span className="text-primary">$</span>
            23,098
          </h3>
          <div className="flex flex-col items-end">
            <p className="text-primary font-bold">+18%</p>
            <p className="text-muted-foreground text-sm ">
              {periodComparison[period]}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full max-w-md rounded-lg p-4 shadow-sm border shadow-black">
          <h3 className="text-4xl text-muted-foreground font-bold">
            <span className="text-primary">$</span>
            23,098
          </h3>
          <div className="flex flex-col items-end">
            <p className="text-primary font-bold">+18%</p>
            <p className="text-muted-foreground text-sm ">
              {periodComparison[period]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
