"use client";

import { useEffect, useState } from "react";
import { XClose, CoinsStacked01, MarkerPin01, Briefcase01, Clock } from "@untitledui/icons";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";

interface ViewJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string | null;
}

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

export const ViewJobModal = ({ isOpen, onClose, jobId }: ViewJobModalProps) => {
    const [job, setJob] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && jobId) {
            fetchJobDetails();
        } else {
            setJob(null);
        }
    }, [isOpen, jobId]);

    const fetchJobDetails = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/admin/jobs/${jobId}`);
            if (!response.ok) throw new Error("Failed to fetch job details");
            const data = await response.json();
            setJob(data);
        } catch (error) {
            console.error("Error fetching job details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!job && !isLoading) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className="w-full max-w-[800px]">
                <Dialog className="flex flex-col h-[80vh] rounded-xl bg-primary shadow-xl outline-none overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between p-6 border-b border-secondary">
                        <div className="flex items-center gap-4">
                            <Avatar 
                                size="xl" 
                                src={job?.companyLogoUrl || job?.company?.avatarUrl} 
                                alt={job?.companyName || "Company"} 
                                initials={job?.companyName?.[0] || "C"} 
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-primary">{job?.title || "Job Title"}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium text-secondary">{job?.companyName || "Company Name"}</span>
                                    <Badge size="sm" color="success">{job?.type}</Badge>
                                    <Badge size="sm" color={job?.status === "active" ? "success" : "warning"}>{job?.status}</Badge>
                                </div>
                            </div>
                        </div>
                        <ButtonUtility icon={XClose} color="tertiary" onClick={onClose} aria-label="Close" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {/* Key Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-secondary/50 rounded-lg">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-tertiary">
                                            <CoinsStacked01 size={16} />
                                            <span className="text-xs font-medium">Salary</span>
                                        </div>
                                        <span className="text-sm font-semibold text-primary">
                                            {job?.salary?.min?.toLocaleString()} - {job?.salary?.max?.toLocaleString()} {job?.salary?.currency}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-tertiary">
                                            <MarkerPin01 size={16} />
                                            <span className="text-xs font-medium">Location</span>
                                        </div>
                                        <span className="text-sm font-semibold text-primary">{job?.location}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-tertiary">
                                            <Briefcase01 size={16} />
                                            <span className="text-xs font-medium">Work Mode</span>
                                        </div>
                                        <span className="text-sm font-semibold text-primary">{job?.workMode}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-tertiary">
                                            <Clock size={16} />
                                            <span className="text-xs font-medium">Experience</span>
                                        </div>
                                        <span className="text-sm font-semibold text-primary">{job?.minExperience} Years</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-md font-semibold text-primary">Description</h3>
                                    <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">{job?.description}</p>
                                </div>

                                {/* Skills */}
                                {job?.skills?.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Required Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {job?.skills.map((skill: any) => (
                                                <Badge key={skill._id} size="md" color="brand">{skill.name}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Responsibilities */}
                                {job?.responsibilities?.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-md font-semibold text-primary">Responsibilities</h3>
                                        <ul className="list-disc list-inside text-sm text-secondary space-y-1">
                                            {job?.responsibilities.map((item: string, index: number) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                {/* Overview */}
                                {job?.overview && (
                                     <div className="flex flex-col gap-4 border-t border-secondary pt-4">
                                        <h3 className="text-md font-semibold text-primary">Overview</h3>
                                        {job.overview.summary && <p className="text-sm text-secondary">{job.overview.summary}</p>}
                                        
                                        {job.overview.techStack?.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm font-medium text-primary">Tech Stack</span>
                                                <div className="flex flex-wrap gap-4">
                                                    {job.overview.techStack.map((stack: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2 bg-secondary/30 px-3 py-2 rounded-lg">
                                                            {stack.logo && <img src={stack.logo.replace(/`/g, "")} alt={stack.name} className="w-5 h-5 object-contain" />}
                                                            <span className="text-sm font-medium">{stack.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                     </div>
                                )}
                            </div>
                        )}
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
