import { PageHero } from "@/components/marketing/page-hero";
import { CodeBrowser, LayersThree01, Palette, CurrencyRupee, Announcement01, Briefcase01, Users01, FileShield01 } from "@untitledui/icons";
import { FilterBar } from "@/components/marketing/filter-bar";
import { JobCard } from "@/components/marketing/job-card";
import { FeaturedSidebar } from "@/components/marketing/featured-sidebar";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";

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
            
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content: Filters & Listings */}
                    <div className="lg:col-span-3">
                        <FilterBar />
                        
                        <div className="mt-6 flex flex-col gap-4">
                            <JobCard 
                                title="Senior Frontend Engineer"
                                company="TechFlow Systems"
                                logoUrl="/logos/1.webp"
                                type="Full Time"
                                location="Bangalore"
                                locationType="Hybrid"
                                experience="3-5 Years"
                                tags={["React", "TypeScript", "Next.js", "Tailwind CSS"]}
                                pills={["Engineering", "Senior Level"]}
                                postedDate="Jan 30, 2026"
                                daysLeft={28}
                                salary="₹25L - ₹35L / Year"
                            />
                            
                            <JobCard 
                                title="Product Manager"
                                company="InnovateAI"
                                logoUrl="/logos/2.webp"
                                type="Full Time"
                                location="Gurgaon"
                                locationType="On-site"
                                experience="2-4 Years"
                                tags={["Product Strategy", "Agile", "User Research", "Data Analytics"]}
                                pills={["Product", "Mid Level"]}
                                postedDate="Jan 29, 2026"
                                daysLeft={25}
                                salary="₹18L - ₹28L / Year"
                            />
                            
                            <JobCard 
                                title="UX/UI Designer"
                                company="Creative Pulse"
                                logoUrl="/logos/3.webp"
                                type="Contract"
                                location="Remote"
                                locationType="Remote"
                                experience="1-3 Years"
                                tags={["Figma", "Prototyping", "User Flows", "Design Systems"]}
                                pills={["Design", "Creative"]}
                                postedDate="Jan 28, 2026"
                                daysLeft={15}
                                salary="₹12L - ₹18L / Year"
                            />
                            
                            <JobCard 
                                title="Marketing Specialist"
                                company="Growth Rocket"
                                logoUrl="/logos/4.webp"
                                type="Full Time"
                                location="Mumbai"
                                locationType="Hybrid"
                                experience="0-2 Years"
                                tags={["Digital Marketing", "SEO", "Content Strategy", "Social Media"]}
                                pills={["Marketing", "Entry Level"]}
                                postedDate="Jan 27, 2026"
                                daysLeft={10}
                                salary="₹8L - ₹12L / Year"
                            />
                        </div>
                    </div>
                    
                    {/* Sidebar: Featured */}
                    <div className="lg:col-span-1">
                        <FeaturedSidebar />
                    </div>
                </div>
            </div>
        </main>
    );
}
