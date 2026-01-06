import { PortalSidebar } from "@/components/shell/PortalSidebar";
import { PortalTopbar } from "@/components/shell/PortalTopbar";
import { FirstRunModal } from "@/components/onboarding/FirstRunModal";
import { AlertScheduler } from "@/components/notifications/AlertScheduler";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <PortalSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PortalTopbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <FirstRunModal />
      <AlertScheduler />
    </div>
  );
}

