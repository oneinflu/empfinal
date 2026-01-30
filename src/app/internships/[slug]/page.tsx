import { InternshipDetailLayout } from "@/components/marketing/internship/layout";
import { Opportunity } from "@/components/marketing/opportunity/types";

// Mock Data Generator
const getInternshipData = (slug: string): Opportunity => {
    return {
        id: "2",
        title: "Product Design Intern",
        company: "TechCorp Solutions",
        logo: "/logos/5.webp",
        location: "Bangalore",
        type: "Hybrid",
        tags: ["Design", "UI/UX"],
        deadline: "20 Feb 26",
        eligibility: "Students & Fresh Graduates",
        locations: ["Bangalore", "Remote"],
        roleDescription: `
            <p class="mb-4">We are looking for a creative Product Design Intern to join our team. You will work closely with our senior designers to create intuitive and visually appealing user interfaces for our web and mobile applications.</p>
        `,
        responsibilities: [
            "Assist in creating wireframes, prototypes, and high-fidelity mockups.",
            "Conduct user research and usability testing.",
            "Collaborate with developers to ensure design implementation accuracy.",
            "Maintain and update the design system.",
            "Participate in design reviews and brainstorming sessions."
        ],
        experience: {
            min: 0,
            max: 1
        },
        workDetails: {
            days: 5
        },
        jobTiming: "Full Time",
        salary: "₹15k - ₹25k / Month",
        faqs: [
            {
                question: "Is this a paid internship?",
                answer: "Yes, this is a paid internship with a monthly stipend of ₹15k - ₹25k."
            },
            {
                question: "Will I get a PPO (Pre-Placement Offer)?",
                answer: "Based on performance, successful interns may be offered a full-time role."
            },
            {
                question: "What is the duration of the internship?",
                answer: "The internship duration is 6 months."
            }
        ],
        relatedOpportunities: [
            {
                id: "r1",
                title: "Frontend Developer Intern",
                company: "WebWizards",
                logo: "/logos/6.webp",
                type: "Internship"
            },
            {
                id: "r2",
                title: "UI/UX Design Masterclass",
                company: "DesignSchool",
                logo: "/logos/7.webp",
                type: "Course"
            },
            {
                id: "r3",
                title: "1:1 Mentorship with Design Lead",
                company: "Mentro",
                logo: "/logos/5.webp",
                type: "Mentorship"
            }
        ]
    };
};

export default function InternshipDetailPage({ params }: { params: { slug: string } }) {
    const data = getInternshipData(params.slug);
    return <InternshipDetailLayout opportunity={data} />;
}
