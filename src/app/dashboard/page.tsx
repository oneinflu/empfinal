"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    GraduationHat01, 
    Users01, 
    Building01, 
    Briefcase01, 
    BookOpen01 
} from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { authenticatedFetch } from "@/utils/api";

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState({
        students: 0,
        professionals: 0,
        mentors: 0,
        companies: 0,
        jobs: 0,
        courses: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    studentsRes, 
                    professionalsRes, 
                    mentorsRes, 
                    companiesRes, 
                    jobsRes,
                    coursesRes
                ] = await Promise.all([
                    authenticatedFetch(`/admin/students`),
                    authenticatedFetch(`/admin/professionals`),
                    authenticatedFetch(`/mentor-profiles`),
                    authenticatedFetch(`/company-profiles`),
                    authenticatedFetch(`/admin/jobs`),
                    authenticatedFetch(`/admin/courses`)
                ]);

                const getCount = async (res: Response) => {
                    if (!res.ok) return 0;
                    const data = await res.json();
                    const list = Array.isArray(data) ? data : (data.data || data.students || data.professionals || data.mentors || data.companies || data.jobs || data.courses || []);
                    return list.length;
                };

                const studentsCount = await getCount(studentsRes);
                const professionalsCount = await getCount(professionalsRes);
                const mentorsCount = await getCount(mentorsRes);
                const companiesCount = await getCount(companiesRes);
                const jobsCount = await getCount(jobsRes);
                const coursesCount = await getCount(coursesRes);

                setStats({
                    students: studentsCount,
                    professionals: professionalsCount,
                    mentors: mentorsCount,
                    companies: companiesCount,
                    jobs: jobsCount,
                    courses: coursesCount
                });

            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { 
            label: "Students", 
            count: stats.students, 
            icon: GraduationHat01, 
            href: "/dashboard/users/students",
            color: "primary" as const
        },
        { 
            label: "Professionals", 
            count: stats.professionals, 
            icon: Users01, 
            href: "/dashboard/users/professionals",
            color: "primary" as const
        },
        { 
            label: "Mentors", 
            count: stats.mentors, 
            icon: Users01, 
            href: "/dashboard/users/mentors",
            color: "primary" as const
        },
        { 
            label: "Companies", 
            count: stats.companies, 
            icon: Building01, 
            href: "/dashboard/users/companies",
            color: "primary" as const
        },
        { 
            label: "Jobs & Internships", 
            count: stats.jobs, 
            icon: Briefcase01, 
            href: "/dashboard/jobs",
            color: "primary" as const
        },
        { 
            label: "Courses", 
            count: stats.courses, 
            icon: BookOpen01, 
            href: "/dashboard/courses",
            color: "primary" as const
        },
    ];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-display-sm font-semibold text-primary">Dashboard</h1>
                <p className="text-md text-tertiary">Welcome back! Here’s a quick overview of your platform.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <div 
                        key={index}
                        onClick={() => router.push(card.href)}
                        className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-brand-solid cursor-pointer group"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-tertiary group-hover:text-primary transition-colors">{card.label}</p>
                            <FeaturedIcon icon={card.icon} color="brand" theme="modern" size="md" />
                        </div>
                        <p className="text-display-md font-semibold text-primary">{card.count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
