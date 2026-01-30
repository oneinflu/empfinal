"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Course } from "@/components/marketing/course/types";
import { 
    ChevronLeft, ChevronRight, Play, PauseCircle, 
    VolumeMax, VolumeX, Settings01, Expand01, Minimize01, 
    ArrowLeft, Monitor01, File02, Download01,
    Share01, DotsVertical, SearchLg, Lock01
} from "@untitledui/icons";
import { cx } from "@/utils/cx";

// --- Mock Data ---
const getCourseData = (slug: string): Course => {
    return {
        id: "c1",
        title: "The Complete Full Stack Web Development Bootcamp",
        subtitle: "Become a full-stack web developer",
        description: "<p>Premium lesson player.</p>",
        thumbnail: "/courses/1.webp",
        rating: 4.8,
        ratingCount: 15430,
        students: 850000,
        lastUpdated: "January 2026",
        language: "English",
        price: { current: 499, original: 3499, currency: "₹", discountPercentage: 86 },
        instructor: {
            name: "Dr. Angela Yu",
            role: "Developer and Lead Instructor",
            image: "/logos/1.webp",
            bio: "Lead instructor at London App Brewery.",
            rating: 4.7,
            students: 2300000,
            courses: 7,
        },
        learningOutcomes: ["Build projects", "Learn modern stacks"],
        requirements: ["No experience needed"],
        curriculum: [
            {
                title: "Front-End Web Development",
                duration: "12h 45m",
                lectures: [
                    { title: "Introduction to HTML", duration: "15m", isPreview: true },
                    { title: "CSS Basics", duration: "45m", isPreview: true },
                    { title: "Bootstrap 5", duration: "1h 20m" },
                ],
            },
            {
                title: "Javascript ES6",
                duration: "8h 30m",
                lectures: [
                    { title: "Introduction to Javascript", duration: "30m", isPreview: true },
                    { title: "Control Flow", duration: "45m" },
                    { title: "DOM Manipulation", duration: "1h 15m" },
                    { title: "Advanced JS", duration: "2h 10m" },
                ],
            },
            {
                title: "React.js Framework",
                duration: "14h 20m",
                lectures: [
                    { title: "React Components", duration: "45m" },
                    { title: "Props & State", duration: "1h" },
                    { title: "Hooks Deep Dive", duration: "2h" },
                ],
            },
            {
                title: "Backend Development",
                duration: "18h 15m",
                lectures: [
                    { title: "Node.js Basics", duration: "1h" },
                    { title: "Express Server", duration: "1h 30m" },
                    { title: "API Development", duration: "2h" },
                ],
            },
        ],
        features: ["65 hours on-demand video"],
        totalModules: 8,
        totalHandsOnExercises: 6,
        totalHours: 65.5,
        totalResources: 4,
        certificateAvailable: true,
        reviews: [],
    };
};

export default function LessonPlayerPage() {
    const router = useRouter();
    const params = useParams<{ slug: string; section: string; lecture: string }>();
    const course = getCourseData(params.slug);
    const sectionIndex = Number(params.section) || 0;
    const lectureIndex = Number(params.lecture) || 0;

    const [currentSection, setCurrentSection] = useState<number>(sectionIndex);
    const [currentLecture, setCurrentLecture] = useState<number>(lectureIndex);
    const [expandedSection, setExpandedSection] = useState<number | null>(sectionIndex);
    
    // Player State
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const currentLectureData = useMemo(() => 
        course.curriculum[currentSection]?.lectures[currentLecture], 
        [course, currentSection, currentLecture]
    );

    useEffect(() => {
        if (expandedSection !== currentSection) {
            setExpandedSection(currentSection);
        }
    }, [currentSection]);

    // --- Video Handlers ---
    const handlePlayPause = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
        setProgress(newTime);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setProgress(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.parentElement?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    };

    // --- Navigation Handlers ---
    const handleNext = () => {
        const section = course.curriculum[currentSection];
        if (currentLecture < section.lectures.length - 1) {
            setCurrentLecture(prev => prev + 1);
        } else if (currentSection < course.curriculum.length - 1) {
            setCurrentSection(prev => prev + 1);
            setCurrentLecture(0);
        }
    };

    const handlePrev = () => {
        if (currentLecture > 0) {
            setCurrentLecture(prev => prev - 1);
        } else if (currentSection > 0) {
            const prevSectionIndex = currentSection - 1;
            const prevSection = course.curriculum[prevSectionIndex];
            setCurrentSection(prevSectionIndex);
            setCurrentLecture(prevSection.lectures.length - 1);
        }
    };

    return (
        <div className="flex h-screen bg-[#0F1117] text-white overflow-hidden font-sans">
            {/* --- LEFT: Main Content (Player) --- */}
            <div className="flex-1 flex flex-col relative">
                {/* Top Navigation Bar */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0F1117]/50 backdrop-blur-md z-20">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.back()}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-sm font-medium text-white/90 line-clamp-1">{course.title}</h1>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <span className="flex items-center gap-1"><Monitor01 className="w-3 h-3" /> Section {currentSection + 1}, Lecture {currentLecture + 1}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button size="sm" color="tertiary" className="!bg-white/5 !text-white !border-white/10 hover:!bg-white/10">
                            <Share01 className="w-4 h-4 mr-2" /> Share
                        </Button>
                        <Button size="sm" color="tertiary" className="!bg-white/5 !text-white !border-white/10 hover:!bg-white/10">
                            <DotsVertical className="w-4 h-4" />
                        </Button>
                    </div>
                </header>

                {/* Player Area */}
                <div className="flex-1 flex items-center justify-center bg-[#050505] p-6 lg:p-10 relative overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

                    <div 
                        className="w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl relative group border border-white/10 overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setShowControls(false)}
                    >
                        <video
                            ref={videoRef}
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            poster={course.thumbnail}
                            className="w-full h-full object-cover"
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onClick={handlePlayPause}
                        />

                        {/* Custom Controls Overlay */}
                        <div className={cx(
                            "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-6",
                            showControls || !isPlaying ? "opacity-100" : "opacity-0"
                        )}>
                            {/* Progress Bar */}
                            <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative group/slider">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" 
                                    style={{ width: `${(progress / duration) * 100}%` }}
                                />
                                <input 
                                    type="range" 
                                    min="0" 
                                    max={duration || 100} 
                                    value={progress} 
                                    onChange={handleProgressChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button onClick={handlePlayPause} className="text-white hover:text-indigo-400 transition-colors">
                                        {isPlaying ? <PauseCircle className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                                    </button>
                                    
                                    <div className="flex items-center gap-3 group/vol">
                                        <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-white hover:text-indigo-400">
                                            {volume === 0 ? <VolumeX className="w-6 h-6" /> : <VolumeMax className="w-6 h-6" />}
                                        </button>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="1" 
                                            step="0.1" 
                                            value={volume} 
                                            onChange={handleVolumeChange}
                                            className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300 h-1 bg-white/30 rounded-lg accent-indigo-500"
                                        />
                                    </div>

                                    <div className="text-sm font-medium text-white/80">
                                        {formatTime(progress)} / {formatTime(duration)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button className="text-white/70 hover:text-white transition-colors">
                                        <Settings01 className="w-5 h-5" />
                                    </button>
                                    <button onClick={toggleFullscreen} className="text-white/70 hover:text-white transition-colors">
                                        {isFullscreen ? <Minimize01 className="w-5 h-5" /> : <Expand01 className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Center Play Button (Initial/Paused) */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center pl-1 border border-white/20 shadow-2xl animate-pulse">
                                    <Play className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar (Lesson Info) */}
                <div className="h-20 border-t border-white/5 bg-[#0F1117] flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handlePrev}
                            disabled={currentSection === 0 && currentLecture === 0}
                            className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase mb-0.5">Next Lesson</span>
                            <span className="text-sm font-medium text-white/90">
                                {course.curriculum[currentSection].lectures[currentLecture + 1]?.title || "Course Completed"}
                            </span>
                        </div>
                        <button 
                            onClick={handleNext}
                            className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-6">
                         <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                            <File02 className="w-4 h-4" />
                            <span>Transcript</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                            <Download01 className="w-4 h-4" />
                            <span>Resources</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT: Sidebar (Curriculum) --- */}
            <aside className="w-[400px] bg-white border-l border-gray-200 flex flex-col shadow-2xl z-30">
                <div className="p-5 border-b border-gray-100 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-lg text-gray-900">Course Content</h2>
                        <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
                            <SearchLg className="w-4 h-4" />
                        </button>
                    </div>
                    
                    {/* Progress Card */}
                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-semibold text-indigo-900">35% Completed</span>
                            <span className="text-indigo-700 font-medium">12/48 Items</span>
                        </div>
                        <div className="w-full bg-indigo-200 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-indigo-600 h-full rounded-full w-[35%]" />
                        </div>
                    </div>
                </div>

                {/* Modules List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {course.curriculum.map((section, sIndex) => (
                        <div key={sIndex} className="border-b border-gray-100 last:border-0">
                            <button 
                                onClick={() => setExpandedSection(expandedSection === sIndex ? null : sIndex)}
                                className={cx(
                                    "w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors",
                                    expandedSection === sIndex ? "bg-gray-50" : ""
                                )}
                            >
                                <div className={cx(
                                    "mt-0.5 transition-transform duration-200",
                                    expandedSection === sIndex ? "rotate-90 text-gray-900" : "text-gray-400"
                                )}>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={cx(
                                        "text-sm font-semibold mb-1",
                                        expandedSection === sIndex ? "text-gray-900" : "text-gray-700"
                                    )}>
                                        Section {sIndex + 1}: {section.title}
                                    </h3>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                        <span>0 / {section.lectures.length} | {section.duration}</span>
                                    </div>
                                </div>
                            </button>

                            {/* Lectures */}
                            <div className={cx(
                                "overflow-hidden transition-all duration-300 ease-in-out bg-gray-50/50",
                                expandedSection === sIndex ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="pb-2">
                                    {section.lectures.map((lec, lIndex) => {
                                        const isActive = currentSection === sIndex && currentLecture === lIndex;
                                        return (
                                            <button
                                                key={lIndex}
                                                onClick={() => {
                                                    setCurrentSection(sIndex);
                                                    setCurrentLecture(lIndex);
                                                }}
                                                className={cx(
                                                    "w-full flex items-start gap-3 px-5 py-3 text-left transition-all border-l-[3px]",
                                                    isActive 
                                                        ? "bg-white border-indigo-600 shadow-sm" 
                                                        : "border-transparent hover:bg-gray-100 text-gray-600"
                                                )}
                                            >
                                                <div className={cx(
                                                    "mt-0.5",
                                                    isActive ? "text-indigo-600" : "text-gray-400"
                                                )}>
                                                    {isActive ? (
                                                        <div className="w-4 h-4 flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border border-current" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className={cx(
                                                        "text-sm font-medium mb-0.5",
                                                        isActive ? "text-indigo-700" : "text-gray-700"
                                                    )}>
                                                        {lIndex + 1}. {lec.title}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Play className="w-3 h-3" />
                                                        <span>{lec.duration}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}

function formatTime(seconds: number) {
    if (!seconds) return "00:00";
    const s = Math.floor(seconds % 60);
    const m = Math.floor((seconds / 60) % 60);
    const h = Math.floor(seconds / 3600);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}