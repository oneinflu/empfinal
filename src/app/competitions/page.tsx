import { PageHero } from "@/components/marketing/page-hero";
import { CodeBrowser, File02, HelpCircle, Briefcase01, Palette, Settings01, Star01, Trophy01 } from "@untitledui/icons";

export default function CompetitionsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <PageHero
                titlePrefix="Compete in 500+"
                highlightedTitle="Competitions"
                description="Showcase your skills, win prizes, and get recognized."
                themeColor="orange"
                categories={[
                    { label: "Hackathons", icon: <CodeBrowser className="w-5 h-5" /> },
                    { label: "Case Studies", icon: <File02 className="w-5 h-5" /> },
                    { label: "Quizzes", icon: <HelpCircle className="w-5 h-5" /> },
                    { label: "Business", icon: <Briefcase01 className="w-5 h-5" /> },
                    { label: "Design", icon: <Palette className="w-5 h-5" /> },
                    { label: "Engineering", icon: <Settings01 className="w-5 h-5" /> },
                    { label: "Cultural", icon: <Star01 className="w-5 h-5" /> },
                    { label: "Sports", icon: <Trophy01 className="w-5 h-5" /> },
                ]}
            />
            
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                    <p className="text-gray-500">Competition listings will appear here.</p>
                </div>
            </div>
        </main>
    );
}
