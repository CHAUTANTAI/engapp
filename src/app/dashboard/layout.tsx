// app/dashboard/layout.tsx

import { Breadcrumbs } from "@/components/layout/breadscrum/breadscrum";
import { BreadcrumbProvider } from "@/components/layout/breadscrum/breadscrum-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreadcrumbProvider>
      <div className="flex flex-col pb-2 gap-y-2 ssm-under:px-[var(--padding-center-mobile)] pl-2 pr-4">
        <Breadcrumbs />
        {children}
      </div>
    </BreadcrumbProvider>
  );
}
