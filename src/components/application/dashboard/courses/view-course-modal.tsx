"use client";

import { useEffect, useState } from "react";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { XClose, CheckCircle, BookOpen01, User01, Building02, CurrencyDollar, Clock, Calendar } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

interface ViewCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string | null;
}

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

export const ViewCourseModal = ({ isOpen, onClose, courseId }: ViewCourseModalProps) => {
    const [course, setCourse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && courseId) {
            fetchCourseDetails();
        } else {
            setCourse(null);
        }
    }, [isOpen, courseId]);

    const fetchCourseDetails = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/admin/courses/${courseId}`);
            if (response.ok) {
                const data = await response.json();
                setCourse(data);
            }
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className="w-full max-w-3xl">
                <Dialog className="flex flex-col max-h-[90vh] rounded-xl bg-white shadow-xl outline-none overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : course ? (
                        <>
                            {/* Header */}
                            <div className="flex items-start justify-between px-6 py-4 border-b border-secondary">
                                <div className="flex gap-4">
                                    <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-secondary shrink-0">
                                        {course.bannerUrl ? (
                                            <img src={course.bannerUrl} alt={course.title} className="h-full w-full object-cover" />
                                        ) : (
                                            <BookOpen01 className="h-8 w-8 text-tertiary" />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-xl font-semibold text-primary">{course.title}</h2>
                                        <div className="flex items-center gap-2 text-sm text-tertiary">
                                            <Badge size="sm" color="blue">{course.level}</Badge>
                                            <span>•</span>
                                            <span>{course.duration}</span>
                                            <span>•</span>
                                            <span>{course.format}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button color="tertiary" size="sm" onClick={onClose} iconLeading={XClose} aria-label="Close" />
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="flex flex-col gap-6">
                                    {/* Banner Image if available */}
                                    {course.bannerUrl && (
                                        <div className="w-full h-48 rounded-xl overflow-hidden border border-secondary shrink-0">
                                            <img src={course.bannerUrl} alt="Course Banner" className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Main Content */}
                                        <div className="md:col-span-2 flex flex-col gap-6">
                                            {/* Description */}
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-md font-semibold text-primary">About this course</h3>
                                                <p className="text-sm text-secondary leading-relaxed whitespace-pre-wrap">{course.description || course.shortDescription}</p>
                                            </div>

                                            {/* Skills */}
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-md font-semibold text-primary">Skills you'll learn</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {course.skills?.map((skill: any) => (
                                                        <Badge key={skill._id} size="md" color="gray">
                                                            {skill.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Modules */}
                                            {course.modules && course.modules.length > 0 && (
                                                <div className="flex flex-col gap-4">
                                                    <h3 className="text-md font-semibold text-primary">Curriculum</h3>
                                                    <div className="flex flex-col gap-3">
                                                        {course.modules.map((module: any, idx: number) => (
                                                            <div key={idx} className="p-4 rounded-lg border border-secondary bg-gray-50">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <h4 className="font-medium text-primary">{module.title}</h4>
                                                                    <span className="text-xs text-tertiary">{module.estimatedTime}</span>
                                                                </div>
                                                                <p className="text-sm text-tertiary mb-3">{module.description}</p>
                                                                <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-200">
                                                                    {module.lessons?.map((lesson: any, lIdx: number) => (
                                                                        <div key={lIdx} className="flex items-center gap-2 text-sm text-secondary">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                                                            <span>{lesson.title}</span>
                                                                            <span className="text-xs text-tertiary">({lesson.duration})</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sidebar Info */}
                                        <div className="flex flex-col gap-6">
                                            {/* Provider Info */}
                                            <div className="p-4 rounded-xl border border-secondary bg-white flex flex-col gap-4">
                                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Provided By</h3>
                                                {course.company ? (
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={course.company.logoUrl} alt={course.company.name} size="md" />
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-primary">{course.company.name}</span>
                                                            <span className="text-xs text-tertiary">Company</span>
                                                        </div>
                                                    </div>
                                                ) : course.instructor ? (
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={course.instructor.user?.avatarUrl} alt={course.instructor.user?.name} size="md" />
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-primary">{course.instructor.user?.name}</span>
                                                            <span className="text-xs text-tertiary">{course.instructor.currentRole} at {course.instructor.currentCompany}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-tertiary">Unknown Provider</span>
                                                )}
                                            </div>

                                            {/* Key Stats */}
                                            <div className="p-4 rounded-xl border border-secondary bg-white flex flex-col gap-4">
                                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Course Details</h3>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm text-secondary">
                                                        <User01 className="w-4 h-4 text-tertiary" />
                                                        <span>Enrolled</span>
                                                    </div>
                                                    <span className="font-medium">{course.enrolledCount}</span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm text-secondary">
                                                        <CurrencyDollar className="w-4 h-4 text-tertiary" />
                                                        <span>Price</span>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="font-medium text-brand-solid">{course.price}</span>
                                                        {course.originalPrice && (
                                                            <span className="text-xs text-tertiary line-through">{course.originalPrice}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm text-secondary">
                                                        <CheckCircle className="w-4 h-4 text-tertiary" />
                                                        <span>Rating</span>
                                                    </div>
                                                    <span className="font-medium">{course.rating} / 5.0</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12 text-tertiary">
                            Failed to load course details.
                        </div>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
