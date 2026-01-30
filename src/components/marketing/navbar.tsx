"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SearchLg, Briefcase01, XClose, Lock01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { cx } from "@/utils/cx";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Internships", href: "/internships" },
    { label: "Jobs", href: "/jobs" },
    { label: "Mentorships", href: "/mentorships" },
    { label: "Courses", href: "/courses" },
];

export const MarketingNavbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    // Don't show on dashboard
    if (pathname?.startsWith("/dashboard")) return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 md:px-8 gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <UntitledLogoMinimal className="h-8 w-8 text-brand-600" />
                    <span className="text-xl font-bold text-gray-900">Empedia</span>
                </Link>

                {/* Navigation Links - Centered */}
                {/* Hidden on mobile by default, and hidden on desktop when search is expanded */}
                <nav className={cx(
                    "hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 transition-opacity duration-200",
                    isSearchExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                )}>
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className={cx(
                                "text-sm font-semibold transition-colors",
                                pathname === link.href ? "text-brand-600" : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side: Search + Actions */}
                <div className="flex items-center gap-3 ml-auto">
                    {/* Expandable Search */}
                    <div className={cx(
                        "flex items-center transition-all duration-300 ease-in-out",
                        isSearchExpanded ? "w-full absolute left-0 px-4 bg-white h-16 z-20 md:static md:w-80 md:bg-transparent md:h-auto md:p-0" : "w-auto"
                    )}>
                        {isSearchExpanded ? (
                            <div className="w-full flex items-center gap-2">
                                <div className="flex-1">
                                    <Input 
                                        autoFocus
                                        placeholder="Search Opportunities..." 
                                        icon={SearchLg}
                                        wrapperClassName="rounded-full shadow-lg md:shadow-none"
                                        inputClassName="rounded-full pl-10"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Escape') setIsSearchExpanded(false);
                                        }}
                                    />
                                </div>
                                <button 
                                    onClick={() => setIsSearchExpanded(false)}
                                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                >
                                    <XClose className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setIsSearchExpanded(true)}
                                className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                                aria-label="Search"
                            >
                                <SearchLg className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Action Buttons - Hidden on mobile when search covers them */}
                    <div className={cx(
                        "flex items-center gap-3 transition-opacity duration-200",
                        isSearchExpanded && "hidden md:flex" // Hide on mobile when search is expanded
                    )}>
                        <Button 
                            color="secondary" 
                            size="md" 
                            iconLeading={Lock01}
                            className="hidden sm:flex rounded-full"
                            href="/register"
                        >
                            Register
                        </Button>
                        <Button 
                            color="primary" 
                            size="md"
                            className="rounded-full px-6"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
