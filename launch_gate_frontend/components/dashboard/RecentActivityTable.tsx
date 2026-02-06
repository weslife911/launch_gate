import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
interface Activity {
  id: string;
  name: string;
  sector: "Nursing/Health" | "Tech" | "Academia";
  referralSource: string;
  date: string;
}
const recentActivities: Activity[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    sector: "Nursing/Health",
    referralSource: "Ambassador: Michael Chen",
    date: "2 hours ago",
  },
  {
    id: "2",
    name: "David Park",
    sector: "Tech",
    referralSource: "Direct Link",
    date: "4 hours ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    sector: "Academia",
    referralSource: "Ambassador: Lisa Wang",
    date: "6 hours ago",
  },
  {
    id: "4",
    name: "James Wilson",
    sector: "Tech",
    referralSource: "Regional Hub: NYC",
    date: "8 hours ago",
  },
  {
    id: "5",
    name: "Maria Santos",
    sector: "Nursing/Health",
    referralSource: "Global Scraper",
    date: "12 hours ago",
  },
];
const getSectorBadgeVariant = (sector: Activity["sector"]) => {
  switch (sector) {
    case "Nursing/Health":
      return "default";
    case "Tech":
      return "secondary";
    case "Academia":
      return "outline";
    default:
      return "default";
  }
};
export function RecentActivityTable() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Name</TableHead>
              <TableHead className="text-muted-foreground font-medium">Sector</TableHead>
              <TableHead className="text-muted-foreground font-medium">Referral Source</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id} className="border-border">
                <TableCell className="font-medium text-foreground">
                  {activity.name}
                </TableCell>
                <TableCell>
                  <Badge variant={getSectorBadgeVariant(activity.sector)}>
                    {activity.sector}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.referralSource}
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {activity.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}