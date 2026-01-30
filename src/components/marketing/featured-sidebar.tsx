import Image from "next/image";

export interface FeaturedItemProps {
    title: string;
    subtitle: string;
    logoUrl?: string;
    type?: string; // e.g., "College Fest", "Competition", "Job"
}

const FeaturedItem = ({ title, subtitle, logoUrl }: FeaturedItemProps) => (
    <div className="flex gap-3 items-start py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2 cursor-pointer">
        <div className="h-10 w-10 flex-shrink-0 rounded-lg border border-gray-200 bg-white p-1 overflow-hidden">
             {logoUrl ? (
                <Image src={logoUrl} alt={title} width={40} height={40} className="h-full w-full object-contain" />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs font-bold text-gray-400">
                    {title.charAt(0)}
                </div>
            )}
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">{title}</h4>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    </div>
);

export const FeaturedSidebar = () => {
    const items: FeaturedItemProps[] = [
        {
            title: "SEED Business School Festival_Spring 2026",
            subtitle: "College Fest",
            logoUrl: "/logos/5.webp"
        },
        {
            title: "L&T OutThink 2026: PPIs and Cash Prize worth INR 2.25 Lakh!",
            subtitle: "Competition",
            logoUrl: "/logos/6.webp"
        },
        {
            title: "Deconstruct Skincare Internship - Season 2",
            subtitle: "Job",
            logoUrl: "/logos/7.webp"
        },
        {
            title: "Hero Campus Challenge Season 10: PPIs & Prizes Worth...",
            subtitle: "Competition",
            logoUrl: "/logos/8.webp"
        },
        {
            title: "PPIs at L'Oréal + Intrapreneurship & Internation...",
            subtitle: "Competition",
            logoUrl: "/logos/9.webp"
        },
        {
            title: "Spark-Wars 4.0",
            subtitle: "Hackathons",
            logoUrl: "/logos/1.webp"
        },
        {
            title: "Unstop Freedom Festival 🇮🇳",
            subtitle: "College Fest",
            logoUrl: "/logos/2.webp"
        },
        {
            title: "Polycab Hiring Challenge",
            subtitle: "Job",
            logoUrl: "/logos/3.webp"
        },
        {
            title: "Royals HunaRR Manch – S2 | Change to meet RR Squad -...",
            subtitle: "Competition",
            logoUrl: "/logos/4.webp"
        }
    ];

    return (
        <div className="bg-gray-50 rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Featured</h3>
            <div className="flex flex-col gap-1">
                {items.map((item, index) => (
                    <FeaturedItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};
