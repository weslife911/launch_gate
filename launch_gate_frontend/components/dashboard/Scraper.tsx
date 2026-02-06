import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
const Scraper = () => {
  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-foreground">Global Scraper</h2>
            <p className="text-muted-foreground mt-1">
            Configure and monitor the global opportunity scraper
            </p>
        </div>
        <Card className="border-border bg-card">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5 text-primary" />
                Scraper Dashboard
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex items-center justify-center h-48 text-muted-foreground">
                Scraper configuration features coming soon...
            </div>
            </CardContent>
        </Card>
    </div>
  );
};
export default Scraper;