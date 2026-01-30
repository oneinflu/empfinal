import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Building01, Globe01, Users01, MarkerPin01, Calendar, XClose } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useEffect, useState } from "react";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

interface CompanyProfile {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        avatarUrl?: string;
        type: string;
    };
    location: string;
    about: string;
    teamSize: number;
    headquartersLocation: string;
    companyType: string;
    website: string;
    logoUrl?: string;
    coverImageUrl?: string;
    socialLinks: {
        platform: string;
        url: string;
    }[];
    skillsLookingFor: {
        _id: string;
        name: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

interface ViewCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    companyId: string | null;
}

import { authenticatedFetch } from "@/utils/api";

export const ViewCompanyModal = ({ isOpen, onClose, companyId }: ViewCompanyModalProps) => {
    const [company, setCompany] = useState<CompanyProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && companyId) {
            fetchCompanyDetails();
        } else {
            setCompany(null);
        }
    }, [isOpen, companyId]);

    const fetchCompanyDetails = async () => {
        try {
            setIsLoading(true);
            const response = await authenticatedFetch(`/company-profiles/${companyId}`);
            if (!response.ok) throw new Error("Failed to fetch company details");
            const data = await response.json();
            setCompany(data);
        } catch (error) {
            console.error("Error fetching company details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className="w-full max-w-3xl">
                <Dialog className="relative flex flex-col rounded-xl bg-primary shadow-xl outline-none overflow-hidden max-h-[90vh]">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 pointer-events-none -translate-x-1/4 -translate-y-1/4">
                        <BackgroundPattern pattern="circle" className="text-brand-tertiary/40 w-[400px] h-[400px]" />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 flex flex-col p-6 pb-0">
                        <FeaturedIcon icon={Building01} color="brand" theme="modern" size="lg" />
                        
                        <ButtonUtility 
                            icon={XClose} 
                            color="tertiary" 
                            onClick={onClose} 
                            aria-label="Close"
                            className="absolute top-4 right-4"
                        />

                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-primary">Company Details</h2>
                            <p className="text-sm text-tertiary">View comprehensive information about the company.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-6 overflow-y-auto relative z-10">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                            </div>
                        ) : company ? (
                            <>
                                {/* Header Section with Cover & Avatar */}
                                <div className="relative mb-8">
                                    <div className="h-32 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden relative">
                                        <BackgroundPattern pattern="circle" className="text-brand-tertiary/40 w-full h-full absolute inset-0 opacity-50" />
                                        {company.coverImageUrl && (
                                            <img src={company.coverImageUrl} alt="Cover" className="w-full h-full object-cover relative z-10" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-10 left-6 flex items-end gap-4 z-20">
                                        <Avatar 
                                            src={company.logoUrl || company.user.avatarUrl || ""} 
                                            alt={company.user.name} 
                                            size="2xl" 
                                            className="ring-4 ring-white bg-white"
                                            initials={company.user.name.charAt(0)}
                                        />
                                        <div className="mb-2">
                                            <h2 className="text-xl font-bold text-primary">{company.user.name}</h2>
                                            <p className="text-sm text-tertiary">{company.user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-2">Overview</h3>
                                            <p className="text-md text-primary">{company.about}</p>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2 text-sm text-secondary">
                                                <MarkerPin01 className="w-4 h-4 text-tertiary" />
                                                <span className="font-medium text-primary">Location:</span> {company.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-secondary">
                                                <MarkerPin01 className="w-4 h-4 text-tertiary" />
                                                <span className="font-medium text-primary">HQ:</span> {company.headquartersLocation}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-secondary">
                                                <Users01 className="w-4 h-4 text-tertiary" />
                                                <span className="font-medium text-primary">Team Size:</span> {company.teamSize} employees
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-secondary">
                                                <Calendar className="w-4 h-4 text-tertiary" />
                                                <span className="font-medium text-primary">Joined:</span> {new Date(company.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-3">Company Type</h3>
                                            <Badge color="blue" size="lg">{company.companyType}</Badge>
                                        </div>

                                        {company.website && (
                                            <div>
                                                <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-2">Online Presence</h3>
                                                <a 
                                                    href={company.website} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="flex items-center gap-2 text-brand-600 hover:underline mb-2"
                                                >
                                                    <Globe01 className="w-4 h-4" />
                                                    {company.website}
                                                </a>
                                                <div className="flex gap-3">
                                                    {company.socialLinks.map((link, index) => (
                                                        <a 
                                                            key={index}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-sm text-secondary hover:text-brand-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200"
                                                        >
                                                            {link.platform}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {company.skillsLookingFor && company.skillsLookingFor.length > 0 && (
                                            <div>
                                                <h3 className="text-sm font-medium text-tertiary uppercase tracking-wider mb-3">Skills Needed</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {company.skillsLookingFor.map((skill) => (
                                                        <Badge key={skill._id} color="gray" size="md">
                                                            {skill.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 text-tertiary">
                                Could not load company details.
                            </div>
                        )}
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
