import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
export const Ambassadors = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Ambassadors</h2>
        <p className="text-muted-foreground mt-1">
          Manage your ambassador network and referral programs
        </p>
      </div>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Ambassador Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            Ambassador management features coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
