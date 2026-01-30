"use client";

import { Opportunity } from "./types";
import { OpportunityHeader } from "./header";
import { OpportunitySidebar } from "./sidebar";
import { OpportunityContent } from "./content";
import { Home01 } from "@untitledui/icons";
import Link from "next/link";

export const OpportunityDetailLayout = ({ opportunity }: { opportunity: Opportunity }) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 180; // Sticky header height + buffer
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const tabs = [
        { label: "Description", id: "description" },
        { label: "Dates & Deadlines", id: "dates" },
        { label: "Compensation", id: "compensation" },
        { label: "Reviews", id: "reviews" },
        { label: "FAQs & Discussions", id: "faqs" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <OpportunityHeader 
                    title={opportunity.title}
                    company={opportunity.company}
                    logo={opportunity.logo}
                    location={opportunity.location}
                    type={opportunity.type}
                />

                {/* Navbar (Internal) */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10 mb-6 hidden md:block shadow-sm">
                    <div className="flex items-center gap-8 text-sm font-medium text-gray-600 overflow-x-auto no-scrollbar px-4">
                        <Link href="/" className="p-4 hover:text-blue-600">
                            <Home01 className="w-5 h-5" />
                        </Link>
                        {tabs.map((tab, i) => (
                            <button 
                                key={tab.id}
                                onClick={() => scrollToSection(tab.id)}
                                className={`py-4 border-b-2 transition-colors whitespace-nowrap hover:text-blue-600 hover:border-blue-300 ${i === 0 ? 'border-transparent' : 'border-transparent'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                    {/* Main Content */}
                    <div>
                        <OpportunityContent opportunity={opportunity} />
                        
                        {/* Footer Info */}
                        <div className="mt-8 space-y-3 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">🕒</span>
                                <span>Updated On: 30 Jan 26, 11:00 AM IST</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mt-0.5">i</span>
                                <p>The data on this page gets updated in every 15 minutes.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] mt-0.5">!</span>
                                <p>This opportunity has been listed by {opportunity.company}. Empedia is not liable for any content mentioned in this opportunity or the process followed by the organizers for this opportunity. However, please raise a complaint if you want Empedia to look into the matter.</p>
                            </div>
                            
                            <div className="pt-4 flex gap-6 text-blue-600 font-medium">
                                <button className="hover:underline flex items-center gap-1">
                                    <span>Raise a Complaint</span>
                                </button>
                                <button className="text-red-600 hover:underline flex items-center gap-1">
                                    <span>Report An Issue</span>
                                </button>
                            </div>

                            {/* Breadcrumbs */}
                            <div className="pt-6 flex items-center gap-2 text-xs text-gray-400">
                                <Home01 className="w-3 h-3" />
                                <span>/</span>
                                <span>Job</span>
                                <span>/</span>
                                <span className="text-gray-600">{opportunity.title}</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <OpportunitySidebar 
                            deadline="14 Days Left"
                            featuredOpportunities={opportunity.relatedOpportunities}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
