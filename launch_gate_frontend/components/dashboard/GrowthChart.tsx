"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Area,
  AreaChart
} from "recharts";
import { useReferralStore } from "@/store/useReferralStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useReferralChartQuery } from "@/services/queries/referralQueries";

export function GrowthChart({ title = "Referral Analytics" }: { title?: string }) {
  const { chartData } = useReferralStore();
  const { isPending } = useReferralChartQuery();

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          <p className="text-xs text-muted-foreground">Live click-through data from your links</p>
        </div>
        {!isPending && (
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#0052ff] animate-pulse" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Live</span>
            </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full mt-2">
          {isPending ? (
            <div className="space-y-4">
               <Skeleton className="h-65 w-full rounded-xl" />
               <div className="flex justify-between px-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
               </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052ff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0052ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  fontSize={11} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                />
                <YAxis 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                   cursor={{ stroke: '#0052ff', strokeWidth: 1, strokeDasharray: '4 4' }}
                   contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))", 
                        borderRadius: "12px",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                    }}
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#0052ff" 
                  strokeWidth={3} 
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                  name="Hub Clicks" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}