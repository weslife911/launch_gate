import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
const RegionalHubs = () => {
  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-foreground">Regional Hubs</h2>
            <p className="text-muted-foreground mt-1">
            Configure automated hub routing and regional assignments
            </p>
        </div>
        <Card className="border-border bg-card">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                Hub Configuration
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex items-center justify-center h-48 text-muted-foreground">
                Regional hub management features coming soon...
            </div>
            </CardContent>
        </Card>
    </div>
  );
};
export default RegionalHubs;