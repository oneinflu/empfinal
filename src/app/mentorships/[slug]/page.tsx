import { MentorshipDetailLayout } from "@/components/marketing/mentorship/layout";
import { Mentorship } from "@/components/marketing/mentorship/types";

const getMentorshipData = (slug: string): Mentorship => {
    return {
        id: "m1",
        mentor: {
            name: "Priya Sharma",
            role: "Senior Product Designer",
            company: "Google",
            companyLogo: "/logos/1.webp",
            image: "/logos/2.webp", // Using placeholder
            about: "I am a Senior Product Designer at Google with over 8 years of experience in building user-centric products. I have previously worked with startups and large enterprises, helping them scale their design teams and processes. \n\nI am passionate about mentorship and have helped over 50+ designers land their dream jobs at top tech companies. I can help you with portfolio reviews, mock interviews, and career guidance.",
            languages: ["English", "Hindi"],
            linkedin: "#",
            twitter: "#"
        },
        
        expertise: [
            "Portfolio Review",
            "UX Research",
            "Design Systems",
            "Career Guidance",
            "Interview Prep",
            "Whiteboarding",
            "Salary Negotiation"
        ],
        
        stats: {
            sessions: 450,
            rating: 4.9,
            reviews: 120,
            experienceYears: 8
        },

        services: [
            {
                id: "s1",
                title: "1:1 Career Mentorship",
                duration: 45,
                price: 2000,
                currency: "₹",
                description: "Deep dive into your career goals, challenges, and create a roadmap for growth."
            },
            {
                id: "s2",
                title: "Portfolio Review",
                duration: 60,
                price: 2500,
                currency: "₹",
                description: "Detailed feedback on your portfolio case studies and presentation style."
            },
            {
                id: "s3",
                title: "Mock Interview",
                duration: 60,
                price: 3000,
                currency: "₹",
                description: "Simulated design interview with real-time feedback and improvement tips."
            }
        ],

        reviews: [
            {
                id: "r1",
                user: "Rahul Verma",
                avatar: "",
                rating: 5,
                date: "2 days ago",
                comment: "Priya provided excellent feedback on my portfolio. Her insights helped me improve my storytelling and case study structure."
            },
            {
                id: "r2",
                user: "Ananya Gupta",
                avatar: "",
                rating: 5,
                date: "1 week ago",
                comment: "The mock interview session was a game changer. I felt much more confident in my actual interview."
            }
        ]
    };
};

export default function MentorshipDetailPage({ params }: { params: { slug: string } }) {
    const data = getMentorshipData(params.slug);
    return <MentorshipDetailLayout mentorship={data} />;
}
