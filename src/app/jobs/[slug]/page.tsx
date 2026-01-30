import { JobDetailLayout } from "@/components/marketing/job/layout";
import { Opportunity } from "@/components/marketing/opportunity/types";

// Mock Data Generator
const getJobData = (slug: string): Opportunity => {
    return {
        id: "1",
        title: "Senior Site Engineer",
        company: "Natural Power Asia Pvt. Ltd.",
        logo: "/logos/1.webp",
        location: "Hyderabad",
        type: "In Office",
        tags: ["Engineering", "Site Work"],
        deadline: "14 Feb 26",
        eligibility: "Experienced Professionals",
        locations: ["Hyderabad"],
        roleDescription: `
            <p class="mb-4">The Senior Site & Electrical Engineer is responsible for leading site execution and electrical works for solar rooftop and ground-mounted projects, ensuring quality, safety, and timely completion while coordinating with project managers, contractors, and internal teams.</p>
        `,
        responsibilities: [
            "Lead and supervise site execution of solar rooftop and ground-mounted projects.",
            "Manage electrical installation activities: DC/AC cabling, inverters, LT/HT panels, earthing, and lightning protection.",
            "Ensure work is carried out as per approved drawings, SLDs, BOQ, and safety standards.",
            "Coordinate with contractors, technicians, vendors, and site teams.",
            "Plan manpower, materials, and tools for smooth site execution.",
            "Monitor material consumption and coordinate with stores for timely supply.",
            "Conduct testing and commissioning activities."
        ],
        experience: {
            min: 3,
            max: 8
        },
        workDetails: {
            days: 5
        },
        jobTiming: "Full Time",
        salary: "₹8L - ₹12L / Year",
        faqs: [
            {
                question: "What is the interview process?",
                answer: "The process involves an initial screening, followed by two technical rounds and a final HR discussion."
            },
            {
                question: "Is remote work allowed?",
                answer: "This role requires presence in the office for at least 3 days a week."
            },
            {
                question: "Are there any joining bonuses?",
                answer: "Yes, we offer a joining bonus for immediate joiners."
            }
        ],
        relatedOpportunities: [
            {
                id: "r1",
                title: "Deconstruct Skincare Internship - Season 2",
                company: "Deconstruct",
                logo: "/logos/2.webp",
                type: "Internship"
            },
            {
                id: "r2",
                title: "Polycab Hiring Challenge - GET Sales | 2026",
                company: "Polycab",
                logo: "/logos/3.webp",
                type: "Competition"
            },
            {
                id: "r3",
                title: "Full Stack Development Course",
                company: "Empedia Learning",
                logo: "/logos/4.webp",
                type: "Course"
            },
            {
                id: "r4",
                title: "Career Mentorship Session",
                company: "TopMate",
                logo: "/logos/1.webp",
                type: "Mentorship"
            }
        ]
    };
};

export default function JobDetailPage({ params }: { params: { slug: string } }) {
    const data = getJobData(params.slug);
    return <JobDetailLayout opportunity={data} />;
}
