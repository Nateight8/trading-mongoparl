import { useId, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ChartPoint {
  x: string;
  actual: number;
  projected: number;
}

interface ProcessedChartPoint {
  date: string;
  time: string;
  actual: number;
  projected: number;
}

// Sample data to use if API data is not available
const sampleData: ChartPoint[] = [
  { x: "2025-05-07T11:15:16.103Z", actual: 10000, projected: 10000 },
  { x: "2025-05-07T11:34:16.755Z", actual: 10200, projected: 10100 },
  { x: "2025-05-07T19:59:19.055Z", actual: 6373, projected: 6367 },
  { x: "2025-05-07T23:56:16.143Z", actual: 9500, projected: 9200 },
  { x: "2025-05-08T00:00:50.452Z", actual: 10000, projected: 9800 },
];

// Function to format date based on the selected time period
const formatDate = (dateStr: string, period: string): string => {
  const date = new Date(dateStr);
  if (period === "1h") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  } else if (period === "1d") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
    });
  } else if (period === "1w") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (period === "1m") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (period === "1y") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } else {
    return dateStr;
  }
};

const chartConfig = {
  actual: {
    label: "Actual",
    color: "var(--chart-1)",
  },
  projected: {
    label: "Projected",
    color: "var(--chart-3)",
  },
};

const TIME_PERIOD_OPTIONS = ["1h", "1d", "1w", "1m", "1y"];

interface ViewOptionProps {
  id: string;
  value: string;
}

const ViewOption = ({ id, value }: ViewOptionProps) => {
  return (
    <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-2 whitespace-nowrap transition-colors select-none uppercase text-foreground has-data-[state=unchecked]:text-muted-foreground">
      {value}
      <RadioGroupItem id={`${id}-${value}`} value={value} className="sr-only" />
    </label>
  );
};

interface CustomCursorProps {
  fill: string;
  pointerEvents?: string;
  height?: number;
  points?: Array<{ x: number; y: number }>;
  className?: string;
}

// Custom cursor component for tooltip
function CustomCursor(props: CustomCursorProps) {
  const { fill, pointerEvents, height, points, className } = props;

  if (!points || points.length === 0) {
    return null;
  }

  const { x, y } = points[0];
  return (
    <>
      <Rectangle
        x={x - 12}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={24}
        height={height}
        className={className}
        type="linear"
      />
      <Rectangle
        x={x - 1}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={1}
        height={height}
        className="recharts-tooltip-inner-cursor"
        type="linear"
      />
    </>
  );
}

interface CustomTooltipContentProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
  }>;
  label?: string;
  colorMap: Record<string, string>;
  labelMap: Record<string, string>;
  dataKeys: string[];
  valueFormatter?: (value: number) => string;
  selectedValue: string;
}

// Custom tooltip component
const CustomTooltipContent = ({
  active,
  payload,
  label,
  colorMap,
  labelMap,
  dataKeys,
  valueFormatter,
  selectedValue,
}: CustomTooltipContentProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      <div className="mb-2 text-xs font-medium">
        {formatDate(label || "", selectedValue)}
      </div>
      {dataKeys.map((key) => {
        const dataItem = payload.find((p) => p.dataKey === key);
        if (!dataItem) return null;

        return (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colorMap[key] }}
            />
            <span className="font-medium"> {labelMap[key]}:</span>
            <span>
              {valueFormatter ? valueFormatter(dataItem.value) : dataItem.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

interface PortfolioChartProps {
  name?: string;
  chartData?: ChartPoint[];
  currentBalance?: number;
  roi?: number;
  pnl?: number;
}

export default function PortfolioChart({
  name = "Portfolio Performance",
  chartData = sampleData,
  currentBalance = 10000,
  roi = 0,
  pnl = 0,
}: PortfolioChartProps) {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState("1h");
  const selectedIndex = TIME_PERIOD_OPTIONS.indexOf(selectedValue);

  // Process the data to ensure it has the right format
  const processedData: ProcessedChartPoint[] =
    chartData?.map((point) => ({
      date: point.x,
      time: new Date(point.x).toLocaleTimeString(),
      actual: point.actual !== undefined ? point.actual : 0,
      projected: point.projected !== undefined ? point.projected : 0,
    })) || sampleData;

  // Sort data by date
  processedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate cumulative values
  let cumulativeActual = 0;
  let cumulativeProjected = 0;
  const cumulativeData = processedData.map(point => {
    cumulativeActual += point.actual;
    cumulativeProjected += point.projected;
    return {
      ...point,
      actual: cumulativeActual,
      projected: cumulativeProjected
    };
  });

  return (
    <Card className="gap-4">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle>{name}</CardTitle>
            <div className="flex items-start flex-col gap-2">
              <div className="text-muted-foreground font-bold text-2xl">
                ${currentBalance.toLocaleString()}
              </div>
              <div
                className={`text-sm font-medium ${
                  pnl >= 0 ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {pnl >= 0 ? "↗" : "↘"} ${Math.abs(pnl).toLocaleString()} ({roi}
                %)
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-xs bg-chart-1"
                ></div>
                <div className="text-[13px]/3 text-muted-foreground/50">
                  Actual
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-xs bg-chart-3"
                ></div>
                <div className="text-[13px]/3 text-muted-foreground/50">
                  Projected
                </div>
              </div>
            </div>
            <div className="bg-muted dark:bg-background/50 inline-flex h-8 rounded-full p-1 shrink-0">
              <RadioGroup
                value={selectedValue}
                onValueChange={setSelectedValue}
                className="group text-xs after:bg-background dark:after:bg-card/64 has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[repeat(5,1fr)] items-center gap-0 font-medium after:absolute after:inset-y-0 after:w-1/5 after:rounded-full after:shadow-xs dark:after:inset-shadow-[0_1px_rgb(255_255_255/0.15)] after:transition-[translate,box-shadow] after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] [&:after]:translate-x-[calc(var(--selected-index)*100%)]"
                data-state={selectedValue}
                style={{
                  "--selected-index": selectedIndex,
                } as React.CSSProperties}
              >
                {TIME_PERIOD_OPTIONS.map((value) => (
                  <ViewOption key={value} id={id} value={value} />
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-72 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/10 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-(--chart-1)/25 [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border dark:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-card [&_.recharts-cartesian-axis-line]:stroke-border dark:[&_.recharts-cartesian-axis-line]:stroke-card"
        >
          <LineChart
            accessibilityLayer
            key={selectedValue}
            data={cumulativeData}
            margin={{ left: 4, right: 12, top: 12 }}
          >
            <defs>
              <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--chart-2)" />
                <stop offset="100%" stopColor="var(--chart-1)" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={12}
              minTickGap={40}
              tickFormatter={(value) => formatDate(value, selectedValue)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDataOverflow={true}
              domain={["dataMin - 100", "dataMax + 100"]}
              tickFormatter={(value) => {
                return `$${value.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}`;
              }}
            />
            <ChartTooltip
              content={
                <CustomTooltipContent
                  colorMap={{
                    actual: "var(--chart-1)",
                    projected: "var(--chart-3)",
                  }}
                  labelMap={{
                    actual: "Actual",
                    projected: "Projected",
                  }}
                  dataKeys={["actual", "projected"]}
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                  selectedValue={selectedValue}
                />
              }
              cursor={<CustomCursor fill="var(--chart-1)" />}
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke={`url(#${id}-gradient)`}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--chart-1)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
