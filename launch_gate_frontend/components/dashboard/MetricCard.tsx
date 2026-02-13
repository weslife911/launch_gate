import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  isLoading?: boolean; // New prop
}

export function MetricCard({ title, value, trend, trendLabel, icon: Icon, isLoading }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return Minus;
    return trend > 0 ? TrendingUp : TrendingDown;
  };
  const TrendIcon = getTrendIcon();

  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return "text-muted-foreground";
    return trend > 0 ? "text-green-500" : "text-destructive";
  };

  return (
    <Card className="border-border bg-card hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24 mb-1" />
        ) : (
          <div className="text-2xl font-bold text-foreground">{value}</div>
        )}
        
        {trend !== undefined && !isLoading && (
          <div className={cn("flex items-center gap-1 text-xs mt-1", getTrendColor())}>
            <TrendIcon className="h-3 w-3" />
            <span>{Math.abs(trend)}%</span>
            {trendLabel && <span className="text-muted-foreground ml-1">{trendLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}