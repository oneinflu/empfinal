import { CourseDetailLayout } from "@/components/marketing/course/layout";
import { Course } from "@/components/marketing/course/types";

const getCourseData = (slug: string): Course => {
    return {
        id: "c1",
        title: "The Complete Full Stack Web Development Bootcamp",
        subtitle: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
        description: `
            <p class="mb-4">Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With over 150,000 ratings and a 4.8 average, my Web Development course is one of the HIGHEST RATED courses in the history of Udemy!</p>
            <p class="mb-4">At 65+ hours, this Web Development course is without a doubt the most comprehensive web development course available online. Even if you have zero programming experience, this course will take you from beginner to mastery.</p>
        `,
        thumbnail: "/courses/1.webp",
        rating: 4.8,
        ratingCount: 15430,
        students: 850000,
        lastUpdated: "January 2026",
        language: "English",
        
        price: {
            current: 499,
            original: 3499,
            currency: "₹",
            discountPercentage: 86
        },

        instructor: {
            name: "Dr. Angela Yu",
            role: "Developer and Lead Instructor",
            image: "/logos/1.webp",
            bio: "I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer.",
            rating: 4.7,
            students: 2300000,
            courses: 7
        },

        learningOutcomes: [
            "Build 16 web development projects for your portfolio",
            "Learn the latest technologies, including Javascript ES6, Bootstrap 5, MongoDB",
            "Build fully-fledged websites and web apps for your startup or business",
            "Master backend development with Node",
            "Master frontend development with React"
        ],

        requirements: [
            "No programming experience needed - I'll teach you everything you need to know",
            "A Mac or PC computer with access to the internet",
            "No paid software required - all web development tools used are free"
        ],

        curriculum: [
            {
                title: "Front-End Web Development",
                duration: "12h 45m",
                lectures: [
                    { title: "Introduction to HTML", duration: "15m", isPreview: true },
                    { title: "CSS Basics", duration: "45m", isPreview: true },
                    { title: "Bootstrap 5", duration: "1h 20m" }
                ]
            },
            {
                title: "Javascript ES6",
                duration: "8h 30m",
                lectures: [
                    { title: "Introduction to Javascript", duration: "30m" },
                    { title: "Control Flow", duration: "45m" }
                ]
            },
            {
                title: "Backend Development",
                duration: "14h 15m",
                lectures: [
                    { title: "Node.js and Express", duration: "1h 15m" },
                    { title: "APIs", duration: "50m" }
                ]
            }
        ],

        features: [
            "65 hours on-demand video",
            "8 coding exercises",
            "Access on mobile and TV",
            "Full lifetime access",
            "Certificate of completion"
        ],

        // Hero Stats
        totalModules: 8,
        totalHandsOnExercises: 6,
        totalHours: 65.5,
        totalResources: 4,
        certificateAvailable: true,

        reviews: [
            {
                id: "r1",
                user: "Sarah Jenkins",
                rating: 5,
                date: "2 days ago",
                comment: "This course is absolutely amazing. Angela is a fantastic teacher who explains everything clearly."
            },
            {
                id: "r2",
                user: "Michael Chen",
                rating: 4.5,
                date: "1 week ago",
                comment: "Great content, very comprehensive. Some sections on React could be updated but overall excellent."
            }
        ]
    };
};

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
    const data = getCourseData(params.slug);
    return <CourseDetailLayout course={data} />;
}
