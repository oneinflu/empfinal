export interface Opportunity {
    id: string;
    title: string;
    company: string;
    logo: string;
    location: string;
    type: string; // "In Office" | "Remote" | "Hybrid"
    tags: string[];
    deadline: string;
    
    eligibility: string;
    locations: string[];
    roleDescription: string;
    responsibilities: string[];
    
    experience: {
        min: number;
        max: number;
    };
    workDetails: {
        days: number;
    };
    jobTiming: string; // "Full Time"
    salary?: string; // e.g. "₹25L - ₹35L / Year"
    
    relatedOpportunities: RelatedOpportunity[];
    
    faqs: {
        question: string;
        answer: string;
    }[];
}

export interface RelatedOpportunity {
    id: string;
    title: string;
    company: string;
    logo: string;
    type: "Job" | "Internship" | "Competition" | "Course" | "Mentorship";
}
