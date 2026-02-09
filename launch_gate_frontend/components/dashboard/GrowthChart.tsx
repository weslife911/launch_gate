"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", clicks: 400, referrals: 60 },
  { month: "Feb", clicks: 520, referrals: 85 },
  { month: "Mar", clicks: 480, referrals: 72 },
  { month: "Apr", clicks: 610, referrals: 110 },
  { month: "May", clicks: 750, referrals: 142 },
];

export function GrowthChart({ title = "Referral Analytics" }: { title?: string }) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#0052ff" 
                strokeWidth={3} 
                name="WhatsApp Clicks" 
                dot={{ r: 4, fill: "#0052ff" }} 
              />
              <Line 
                type="monotone" 
                dataKey="referrals" 
                stroke="#10b981" 
                strokeWidth={3} 
                name="Actual Signups" 
                dot={{ r: 4, fill: "#10b981" }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}