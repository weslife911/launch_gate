"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useReferralStore } from "@/store/useReferralStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useReferralChartQuery } from "@/services/queries/referralQueries";

export function GrowthChart({ title = "Referral Analytics" }: { title?: string }) {
  const { chartData } = useReferralStore();
  const { isPending } = useReferralChartQuery();

  return (
    <Card className="border-border bg-card shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          {isPending ? (
            <div className="space-y-4">
               <Skeleton className="h-62.5 w-full rounded-xl" />
               <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
               </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  fontSize={12} 
                  tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#0052ff" 
                  strokeWidth={3} 
                  name="Hub Clicks" 
                  dot={{ r: 4, fill: "#0052ff", strokeWidth: 2, stroke: "#fff" }} 
                  activeDot={{ r: 6, fill: "#0052ff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}