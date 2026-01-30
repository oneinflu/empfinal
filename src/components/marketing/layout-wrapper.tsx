"use client";

import { usePathname } from "next/navigation";
import { MarketingNavbar } from "./navbar";
import { MarketingFooter } from "./footer";

export const MarketingLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isLessonPage = pathname?.startsWith("/courses/") && pathname?.includes("/lesson/");

    if (isDashboard || isAuthPage || isLessonPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <MarketingNavbar />
            <main className="flex-1">
                {children}
            </main>
            <MarketingFooter />
        </div>
    );
};
