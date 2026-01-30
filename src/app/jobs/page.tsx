import { PageHero } from "@/components/marketing/page-hero";
import { CodeBrowser, LayersThree01, Palette, CurrencyRupee, Announcement01, Briefcase01, Users01, FileShield01 } from "@untitledui/icons";

export default function JobsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <PageHero
                titlePrefix="Find your dream"
                highlightedTitle="Job"
                description="Explore premium roles at top companies and startups."
                themeColor="purple"
                categories={[
                    { label: "Engineering", icon: <CodeBrowser className="w-5 h-5" /> },
                    { label: "Product", icon: <LayersThree01 className="w-5 h-5" /> },
                    { label: "Design", icon: <Palette className="w-5 h-5" /> },
                    { label: "Finance", icon: <CurrencyRupee className="w-5 h-5" /> },
                    { label: "Marketing", icon: <Announcement01 className="w-5 h-5" /> },
                    { label: "Sales", icon: <Briefcase01 className="w-5 h-5" /> },
                    { label: "HR", icon: <Users01 className="w-5 h-5" /> },
                    { label: "Legal", icon: <FileShield01 className="w-5 h-5" /> },
                ]}
            />
            
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                    <p className="text-gray-500">Job listings will appear here.</p>
                </div>
            </div>
        </main>
    );
}
