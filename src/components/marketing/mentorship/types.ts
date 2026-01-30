export interface Mentorship {
    id: string;
    mentor: {
        name: string;
        role: string;
        company: string;
        companyLogo: string;
        image: string;
        about: string;
        linkedin?: string;
        twitter?: string;
        languages: string[];
    };
    
    expertise: string[];
    
    stats: {
        sessions: number;
        rating: number;
        reviews: number;
        experienceYears: number;
    };

    services: {
        id: string;
        title: string;
        duration: number; // minutes
        price: number;
        currency: string;
        description: string;
    }[];

    reviews: {
        id: string;
        user: string;
        avatar?: string;
        rating: number;
        date: string;
        comment: string;
    }[];
}
