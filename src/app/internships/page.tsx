import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { CodeBrowser, Briefcase01, Settings01, Announcement01, Dataflow01, LayersThree01, Palette, Users01 } from "@untitledui/icons";
import { FilterBar } from "@/components/marketing/filter-bar";
import { InternshipCard } from "@/components/marketing/internship-card";
import { FeaturedSidebar } from "@/components/marketing/featured-sidebar";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";

export default function InternshipsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <PageHero
                titlePrefix="Explore 27088+"
                highlightedTitle="Internships"
                description="Kickstart your career with real-world internship opportunities."
                themeColor="blue"
                categories={[
                    { label: "Developer", icon: <CodeBrowser className="w-5 h-5" /> },
                    { label: "Sales", icon: <Briefcase01 className="w-5 h-5" /> },
                    { label: "Ops", icon: <Settings01 className="w-5 h-5" /> },
                    { label: "Marketing", icon: <Announcement01 className="w-5 h-5" /> },
                    { label: "Analytics", icon: <Dataflow01 className="w-5 h-5" /> },
                    { label: "Product", icon: <LayersThree01 className="w-5 h-5" /> },
                    { label: "Design", icon: <Palette className="w-5 h-5" /> },
                    { label: "HR", icon: <Users01 className="w-5 h-5" /> },
                ]}
            />
            
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content: Filters & Listings */}
                    <div className="lg:col-span-3">
                        <FilterBar />
                        
                        <div className="mt-6 flex flex-col gap-4">
                            <Link href="/internships/tech-blog-writer-internship">
                                <InternshipCard 
                                    title="Tech Blog Writer Internship"
                                    company="Kaizenstat"
                                    logoUrl="/logos/1.webp"
                                    type="Full Time"
                                    location="Remote"
                                    locationType="Remote"
                                    tags={["Python", "Technical Communication", "Content Writing", "SEO"]}
                                    pills={["Undergraduate", "Postgraduate", "Engineering Students"]}
                                    postedDate="Jan 30, 2026"
                                    daysLeft={14}
                                />
                            </Link>
                            
                            <Link href="/internships/ai-engineer-internship">
                                <InternshipCard 
                                    title="AI Engineer Internship"
                                    company="Bridge-it Inc"
                                    logoUrl="/logos/2.webp"
                                    type="Full Time"
                                    location="Remote"
                                    locationType="Remote"
                                    tags={["Data Wrangling", "Generative Adversarial Networks (GANs)", "Python", "TensorFlow"]}
                                    pills={["Undergraduate", "Postgraduate", "Engineering Students"]}
                                    postedDate="Jan 29, 2026"
                                    daysLeft={12}
                                    salary="15 K - 18 K/Month"
                                />
                            </Link>
                            
                            <Link href="/internships/full-stack-developer-internship">
                                <InternshipCard 
                                    title="Full Stack Developer Internship"
                                    company="Elgrace"
                                    logoUrl="/logos/3.webp"
                                    type="Full Time"
                                    location="Delhi, Gurgaon"
                                    locationType="On-site"
                                    tags={["Machine Learning Concepts", "Python", "API Development (REST)", "React"]}
                                    pills={["Undergraduate", "Postgraduate", "Engineering Students"]}
                                    postedDate="Jan 30, 2026"
                                    daysLeft={14}
                                />
                            </Link>
                            
                            <Link href="/internships/financial-advisor-internship">
                                <InternshipCard 
                                    title="Financial Advisor Internship"
                                    company="Jayat Consulting Services"
                                    logoUrl="/logos/4.webp"
                                    type="Full Time"
                                    location="Hyderabad"
                                    locationType="Hybrid"
                                    tags={["Communication Skills", "Customer Service", "Finance", "Sales"]}
                                    pills={["Undergraduate", "Postgraduate", "Engineering Students"]}
                                    postedDate="Jan 30, 2026"
                                    daysLeft={13}
                                />
                            </Link>
                        </div>

                        <div className="mt-8">
                             <PaginationPageMinimalCenter total={10} page={1} />
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
