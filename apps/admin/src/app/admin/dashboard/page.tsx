import { PortalSidebar } from "@/components/shell/PortalSidebar";
import { PortalTopbar } from "@/components/shell/PortalTopbar";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ContinueActions } from "@/components/dashboard/ContinueActions";
import { storage } from "@/lib/storage";

export default async function DashboardPage() {
  const session = storage.sessionMock.get();
  const displayName = session?.displayName || "Collector";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {displayName}</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your account
        </p>
      </div>

      <QuickStats />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <div className="border bg-card p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <ContinueActions />
        </div>
      </div>
    </div>
  );
}

