export interface Course {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    thumbnail: string;
    previewVideoUrl?: string;
    
    rating: number;
    ratingCount: number;
    students: number;
    lastUpdated: string;
    language: string;
    
    price: {
        current: number;
        original: number;
        currency: string;
        discountPercentage: number;
    };

    instructor: {
        name: string;
        role: string;
        image: string;
        bio: string;
        rating: number;
        students: number;
        courses: number;
    };

    learningOutcomes: string[];
    requirements: string[];
    
    curriculum: {
        title: string;
        duration: string;
        lectures: {
            title: string;
            duration: string;
            isPreview?: boolean;
        }[];
    }[];

    features: string[]; // e.g. "14 hours on-demand video", "Access on mobile and TV"

    // Hero Stats
    totalModules: number;
    totalHandsOnExercises: number;
    totalHours: number;
    totalResources: number;
    certificateAvailable: boolean;
    
    reviews: {
        id: string;
        user: string;
        avatar?: string;
        rating: number;
        date: string;
        comment: string;
    }[];
}
