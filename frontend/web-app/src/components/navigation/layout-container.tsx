"use client";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
export default function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isJournal = pathname.includes("/journals/");

  return (
    <>
      <SidebarInset
        className={
          isJournal ? "px-0" : "  overflow-hidden px-4 md:px-6 lg:px-8"
        }
      >
        {children}
      </SidebarInset>
    </>
  );
}
