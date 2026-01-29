import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Briefcase01, Phone, Mail01, XClose, Building01, BookOpen01, Award01, User01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useEffect, useState } from "react";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

interface ProfessionalProfile {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        avatarUrl?: string;
        type: string;
        phone: string;
    };
    educations: {
        institutionName: string;
        level: string;
        degree: string;
        yearOfPassing: number;
    }[];
    internships: {
        organization: string;
        role: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
    workExperiences: {
        organization: string;
        role: string;
        startDate: string;
        endDate: string | null;
        description: string;
    }[];
    certifications: {
        name: string;
        issuer: string;
        issueDate: string;
        expiryDate: string;
        credentialUrl: string;
    }[];
    skills: {
        _id: string;
        name: string;
    }[];
    resumeUrl?: string;
    createdAt?: string;
}

interface ViewProfessionalModalProps {
    isOpen: boolean;
    onClose: () => void;
    professionalId: string | null;
}

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";

export const ViewProfessionalModal = ({ isOpen, onClose, professionalId }: ViewProfessionalModalProps) => {
    const [professional, setProfessional] = useState<ProfessionalProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && professionalId) {
            fetchProfessionalDetails();
        } else {
            setProfessional(null);
        }
    }, [isOpen, professionalId]);

    const fetchProfessionalDetails = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/admin/professionals/${professionalId}`);
            if (!response.ok) {
                 throw new Error("Failed to fetch professional details");
            }
            const data = await response.json();
            setProfessional(data);
        } catch (error) {
            console.error("Error fetching professional details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className="w-full max-w-4xl">
                <Dialog className="relative flex flex-col rounded-xl bg-primary shadow-xl outline-none overflow-hidden max-h-[90vh]">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 pointer-events-none -translate-x-1/4 -translate-y-1/4">
                        <BackgroundPattern pattern="circle" className="text-brand-tertiary/40 w-[400px] h-[400px]" />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 flex flex-col p-6 pb-0">
                        <FeaturedIcon icon={User01} color="brand" theme="modern" size="lg" />
                        
                        <ButtonUtility 
                            icon={XClose} 
                            color="tertiary" 
                            onClick={onClose} 
                            aria-label="Close"
                            className="absolute top-4 right-4"
                        />

                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-primary">Professional Details</h2>
                            <p className="text-sm text-tertiary">View comprehensive information about the professional.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-6 overflow-y-auto relative z-10">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                            </div>
                        ) : professional ? (
                            <>
                                {/* Header Section with Avatar */}
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <Avatar 
                                        src={professional.user.avatarUrl || ""} 
                                        alt={professional.user.name} 
                                        size="xl" 
                                        className="ring-2 ring-white bg-white"
                                        initials={professional.user.name.charAt(0)}
                                    />
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-xl font-bold text-primary">{professional.user.name}</h2>
                                        <div className="flex items-center gap-4 text-sm text-secondary">
                                            <div className="flex items-center gap-1.5">
                                                <Mail01 className="w-4 h-4" />
                                                {professional.user.email}
                                            </div>
                                            {professional.user.phone && (
                                                <div className="flex items-center gap-1.5">
                                                    <Phone className="w-4 h-4" />
                                                    {professional.user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="flex flex-col gap-6">
                                        {/* Work Experience */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Briefcase01 className="w-4 h-4 text-brand-600" />
                                                <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider">Work Experience</h3>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                {professional.workExperiences && professional.workExperiences.length > 0 ? (
                                                    professional.workExperiences.map((exp, idx) => (
                                                        <div key={idx} className="p-3 border border-secondary rounded-lg bg-white">
                                                            <div className="font-semibold text-primary">{exp.role}</div>
                                                            <div className="text-sm font-medium text-brand-700">{exp.organization}</div>
                                                            <div className="text-xs text-tertiary mt-1 mb-2">
                                                                {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                                                            </div>
                                                            <p className="text-sm text-secondary line-clamp-2">{exp.description}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-sm text-tertiary italic">No work experience added.</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Internships */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Building01 className="w-4 h-4 text-brand-600" />
                                                <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider">Internships</h3>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                {professional.internships && professional.internships.length > 0 ? (
                                                    professional.internships.map((exp, idx) => (
                                                        <div key={idx} className="p-3 border border-secondary rounded-lg bg-white">
                                                            <div className="font-semibold text-primary">{exp.role}</div>
                                                            <div className="text-sm font-medium text-brand-700">{exp.organization}</div>
                                                            <div className="text-xs text-tertiary mt-1 mb-2">
                                                                {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                                                            </div>
                                                            <p className="text-sm text-secondary line-clamp-2">{exp.description}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-sm text-tertiary italic">No internships added.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="flex flex-col gap-6">
                                        {/* Education */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <BookOpen01 className="w-4 h-4 text-brand-600" />
                                                <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider">Education</h3>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                {professional.educations && professional.educations.length > 0 ? (
                                                    professional.educations.map((edu, idx) => (
                                                        <div key={idx} className="p-3 border border-secondary rounded-lg bg-white">
                                                            <div className="font-semibold text-primary">{edu.institutionName}</div>
                                                            <div className="text-sm text-secondary">{edu.degree}</div>
                                                            <div className="text-xs text-tertiary mt-1 flex justify-between">
                                                                <span>{edu.level}</span>
                                                                <span>Class of {edu.yearOfPassing}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-sm text-tertiary italic">No education details added.</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Certifications */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Award01 className="w-4 h-4 text-brand-600" />
                                                <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider">Certifications</h3>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                {professional.certifications && professional.certifications.length > 0 ? (
                                                    professional.certifications.map((cert, idx) => (
                                                        <div key={idx} className="p-3 border border-secondary rounded-lg bg-white">
                                                            <div className="font-semibold text-primary">{cert.name}</div>
                                                            <div className="text-sm text-secondary">{cert.issuer}</div>
                                                            <div className="text-xs text-tertiary mt-1 mb-2">
                                                                Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                                                            </div>
                                                            {cert.credentialUrl && (
                                                                <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline">
                                                                    View Credential
                                                                </a>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-sm text-tertiary italic">No certifications added.</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div>
                                            <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-3">Skills</h3>
                                            {professional.skills && professional.skills.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {professional.skills.map((skill) => (
                                                        <Badge key={skill._id} color="blue" size="md">
                                                            {skill.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-sm text-tertiary italic">No skills added.</div>
                                            )}
                                        </div>

                                        {/* Resume */}
                                        {professional.resumeUrl && (
                                            <div>
                                                <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-3">Resume</h3>
                                                <a 
                                                    href={professional.resumeUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors border border-brand-200"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    View Resume
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 text-tertiary">
                                Could not load professional details.
                            </div>
                        )}
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
