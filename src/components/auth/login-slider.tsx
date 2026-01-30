"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
    {
        id: 1,
        image: "/slider/login-img-1.webp",
        title: "Jobs",
        subtitle: "of various employment types"
    },
    {
        id: 2,
        image: "/slider/login-img-3.webp",
        title: "Practice",
        subtitle: "easy to complex problems"
    },
    {
        id: 3,
        image: "/slider/login-img-4.webp",
        title: "Compete",
        subtitle: "battle with the best"
    },
    {
        id: 4,
        image: "/slider/login-img-5.webp",
        title: "Mentorship",
        subtitle: "learn from experts"
    }
];

export const LoginSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const currentSlide = SLIDES[currentIndex];

    return (
        <div className="relative w-full h-full flex items-center justify-center p-12 overflow-hidden">
            {/* Background Pattern - Subtle dots */}
            <div className="absolute inset-0 opacity-10" 
                style={{ 
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                }} 
            />

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex flex-col items-center justify-center"
                    >
                        {/* Image Container */}
                        <div className="relative w-full max-w-[320px] aspect-square">
                            <Image
                                src={currentSlide.image}
                                alt={currentSlide.title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Text */}
                     
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
