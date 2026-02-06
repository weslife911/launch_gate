
import { Users, UserCheck, MapPin, Globe } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { GrowthChart } from "./GrowthChart";
import { RecentActivityTable } from "./RecentActivityTable";
import AdminDashboardLayout from "@/app/(ambassadors)/layout";
const Dashboard = () => {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Overview</h2>
          <p className="text-muted-foreground mt-1">
            Monitor your organization's growth and automation metrics
          </p>
        </div>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Members"
            value="2,847"
            trend={12.5}
            trendLabel="vs last month"
            icon={Users}
          />
          <MetricCard
            title="Active Ambassadors"
            value="62"
            trend={8.2}
            trendLabel="vs last month"
            icon={UserCheck}
          />
          <MetricCard
            title="Regional Hubs"
            value="18"
            trend={2}
            trendLabel="new this quarter"
            icon={MapPin}
          />
          <MetricCard
            title="Opportunities Scraped"
            value="1,234"
            trend={-3.1}
            trendLabel="vs last week"
            icon={Globe}
          />
        </div>
        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <GrowthChart />
          <RecentActivityTable />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};
export default Dashboard;