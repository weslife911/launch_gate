"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, ExternalLink, Info } from "lucide-react";

interface ReferralActivity {
  id: string;
  name: string;
  niche: string;
  status: "active" | "pending_verification";
  joinedAt: string;
}

// Simulated data filtered for the logged-in Ambassador
const recentReferrals: ReferralActivity[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    niche: "Health, Medicine & Nursing",
    status: "active",
    joinedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "David Park",
    niche: "Science, Tech & Engineering",
    status: "pending_verification",
    joinedAt: "5 hours ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    niche: "Academia & Scholarships",
    status: "active",
    joinedAt: "Yesterday",
  },
  {
    id: "4",
    name: "James Wilson",
    niche: "Writing & Creative Arts",
    status: "active",
    joinedAt: "2 days ago",
  },
];

export function RecentActivityTable({ title = "Your Recent Referrals" }: { title?: string }) {
  
  const handleViewDetails = (name: string) => {
    toast.info(`Details for ${name}`, {
      description: "Member activity tracking is enabled.",
      icon: <Info className="h-4 w-4 text-blue-500" />
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending_verification":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-[#0052ff]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold">Member</TableHead>
                <TableHead className="font-semibold">Niche Focus</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReferrals.length > 0 ? (
                recentReferrals.map((referral) => (
                  <TableRow 
                    key={referral.id} 
                    className="cursor-pointer hover:bg-slate-50/50 transition-colors"
                    onClick={() => handleViewDetails(referral.name)}
                  >
                    <TableCell className="font-medium text-slate-900">
                      {referral.name}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-600 font-medium">
                        {referral.niche}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(referral.status)} variant="outline">
                        {referral.status === "active" ? "Active" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {referral.joinedAt}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No referrals found yet. Share your link to start growing!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-center">
          <button 
            className="text-xs font-bold text-[#0052ff] hover:underline flex items-center gap-1"
            onClick={() => toast("Redirecting to full member list...")}
          >
            View Full List <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}