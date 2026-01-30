"use client";

import { Opportunity } from "./types";
import { 
    MarkerPin01, 
    Briefcase01, 
    File02, 
    Clock, 
    AlertCircle,
    Plus,
    Minus
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import Image from "next/image";
import { useState } from "react";
import { cx } from "@/utils/cx";

const Section = ({ title, children, className = "", id }: { title: string, children: React.ReactNode, className?: string, id?: string }) => (
    <div className={`mb-10 ${className}`} id={id}>
        <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="pl-0">{children}</div>
    </div>
);

const InfoCard = ({ icon: Icon, title, value }: { icon: any, title: string, value: string | React.ReactNode }) => (
    <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-white">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <div className="font-bold text-gray-900 mb-1">{title}</div>
            <div className="text-sm text-gray-600">{value}</div>
        </div>
    </div>
);

export const OpportunityContent = ({ opportunity }: { opportunity: Opportunity }) => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            {/* Eligibility */}
            <Section title="Eligibility" id="description">
                <div className="space-y-4">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Target Audience</div>
                        <div className="font-medium text-gray-900">{opportunity.eligibility}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Locations</div>
                        <div className="font-medium text-gray-900">{opportunity.locations.join(", ")}</div>
                    </div>
                </div>
            </Section>

            {/* Details */}
            <Section title="Details">
                <div className="prose prose-blue max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: opportunity.roleDescription }} />
                    
                    <h4 className="text-sm font-bold text-gray-900 mt-6 mb-3">Responsibilities:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {opportunity.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-6 flex justify-center">
                    <button className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                        Read More <span>↓</span>
                    </button>
                </div>
            </Section>

            {/* Important Dates */}
            <Section title="Important dates & deadlines?" id="dates">
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 max-w-md">
                    <div className="bg-white p-2 rounded-lg border border-gray-100 text-center min-w-[60px]">
                        <div className="text-xs bg-blue-600 text-white rounded-t-md py-0.5">14</div>
                        <div className="text-xs font-bold text-gray-900 py-1">Feb</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">{opportunity.deadline}</div>
                        <div className="text-xs text-gray-500">Application Deadline</div>
                    </div>
                </div>
            </Section>
            
            {/* Compensation (if available) */}
            {opportunity.salary && (
                <Section title="Compensation" id="compensation">
                    <InfoCard 
                        icon={Briefcase01} 
                        title="Salary / Stipend" 
                        value={opportunity.salary} 
                    />
                </Section>
            )}

            {/* Additional Information */}
            <Section title="Additional Information" id="additional-info">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 shadow-sm">
                                <MarkerPin01 className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Job Location</div>
                                <div className="font-semibold text-gray-900">{opportunity.locations.join(", ")}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 shadow-sm">
                                <Briefcase01 className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Experience</div>
                                <div className="font-semibold text-gray-900">
                                    {opportunity.experience.min} - {opportunity.experience.max} Years
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 shadow-sm">
                                <File02 className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Work Detail</div>
                                <div className="font-semibold text-gray-900">{opportunity.workDetails.days} Days / Week</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 shadow-sm">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Job Type & Timing</div>
                                <div className="font-semibold text-gray-900">{opportunity.type} • {opportunity.jobTiming}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Related Opportunities */}
            <Section title="Related Opportunities">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {opportunity.relatedOpportunities.map((opp) => (
                        <div key={opp.id} className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer bg-white group">
                            <div className="w-12 h-12 relative mb-3 rounded-lg overflow-hidden border border-gray-100">
                                <Image
                                    src={opp.logo}
                                    alt={opp.company}
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[40px]">
                                {opp.title}
                            </h4>
                            <p className="text-sm text-gray-500">{opp.company}</p>
                            <div className="mt-3 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded inline-block">
                                {opp.type}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Feedback & Rating */}
            <Section title="Feedback & Rating" id="reviews">
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
                    <div className="flex justify-center mb-3 text-gray-400">
                        <File02 className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-gray-900 mb-1">Write a review</div>
                    <div className="text-sm text-gray-500">
                        Register for this opportunity to give your feedback and review.
                    </div>
                </div>
            </Section>

            {/* FAQs */}
            <Section title="Frequently Asked Questions/Discussions" id="faqs">
                {opportunity.faqs && opportunity.faqs.length > 0 ? (
                    <div className="space-y-4">
                        {opportunity.faqs.map((faq, index) => {
                            const isOpen = openFaqIndex === index;
                            return (
                                <div key={index} className={cx("rounded-xl border transition-all duration-200", isOpen ? "bg-blue-50 border-blue-100" : "bg-white border-gray-200")}>
                                    <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-4 text-left">
                                        <span className="font-medium text-gray-900">{faq.question}</span>
                                        {isOpen ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-gray-400" />}
                                    </button>
                                    {isOpen && <div className="px-4 pb-4 text-sm text-gray-600 border-t border-blue-100/50 pt-4">{faq.answer}</div>}
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3 text-yellow-800 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>No FAQs available.</span>
                    </div>
                )}
                
                <div className="mt-6">
                    <span className="text-gray-900 font-medium">Can't find the answer you are looking for? </span>
                    <button className="text-blue-600 hover:underline font-medium">
                        Ask a question (Be specific)
                    </button>
                </div>
            </Section>

             {/* Disclaimer */}
             <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3 text-sm text-yellow-800">
                <div className="flex-shrink-0 mt-0.5">💡</div>
                <p>
                    If an employer asks you to pay any kind of fee, please notify us immediately. 
                    Empedia does not charge any fee from the applicants and we do not allow other companies also to do so.
                </p>
            </div>
        </div>
    );
};
