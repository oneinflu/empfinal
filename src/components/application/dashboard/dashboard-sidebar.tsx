"use client";

import type { FC } from "react";
import { usePathname } from "next/navigation";
import { Home01, Settings01, Users01, Briefcase01, GraduationHat01, BookOpen01, LayoutGrid01, Tag01, Building01 } from "@untitledui/icons";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import type { NavItemType } from "@/components/application/app-navigation/config";

const sidebarItems: NavItemType[] = [
    { label: "Dashboard", href: "/dashboard", icon: Home01 },
    {
        label: "Master Settings",
        href: "/dashboard/master-settings",
        icon: Settings01,
        items: [
            { label: "Skills", href: "/dashboard/master-settings/skills", icon: Tag01 },
            { label: "Category", href: "/dashboard/master-settings/category", icon: LayoutGrid01 },
        ],
    },
    { label: "Team", href: "/dashboard/team", icon: Users01 },
    {
        label: "Users",
        href: "/dashboard/users",
        icon: Users01,
        items: [
            { label: "Mentors", href: "/dashboard/users/mentors", icon: Users01 },
            { label: "Companies", href: "/dashboard/users/companies", icon: Building01 },
            { label: "Students", href: "/dashboard/users/students", icon: GraduationHat01 },
            { label: "Professionals", href: "/dashboard/users/professionals", icon: Users01 },
        ],
    },
    { label: "Jobs and Internships", href: "/dashboard/jobs", icon: Briefcase01 },
    { label: "Courses", href: "/dashboard/courses", icon: BookOpen01 },
];

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <SidebarNavigationSimple activeUrl={pathname} items={sidebarItems} />
    );
};
