"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, SearchLg, Edit01, Trash01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ViewProfessionalModal } from "@/components/application/dashboard/users/professionals/view-professional-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/users/professionals/delete-confirmation-modal";

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
        degree: string;
        yearOfPassing: number;
    }[];
    internships: {
        organization: string;
        role: string;
    }[];
    workExperiences: {
        organization: string;
        role: string;
        endDate: string | null;
    }[];
    skills: {
        _id: string;
        name: string;
    }[];
}

const columns = [
    { name: "Professional", id: "name", isRowHeader: true },
    { name: "Current Role", id: "role" },
    { name: "Phone", id: "phone" },
    { name: "Skills", id: "skills" },
    { name: "", id: "actions" },
];

import { authenticatedFetch } from "@/utils/api";

const ITEMS_PER_PAGE = 5;

export default function ProfessionalsPage() {
    const router = useRouter();
    const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    // View Modal State
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [professionalToDelete, setProfessionalToDelete] = useState<ProfessionalProfile | null>(null);

    useEffect(() => {
        fetchProfessionals();
    }, []);

    const fetchProfessionals = async () => {
        try {
            const response = await authenticatedFetch(`/admin/professionals`);
            if (!response.ok) throw new Error("Failed to fetch professionals");
            const data = await response.json();
            const professionalsData = Array.isArray(data) ? data : (data.data || data.professionals || []);
            setProfessionals(professionalsData);
        } catch (error) {
            console.error("Error fetching professionals:", error);
        }
    };

    const handleAdd = () => {
        router.push("/dashboard/users/professionals/add");
    };

    const handleView = (professional: ProfessionalProfile) => {
        setSelectedProfessionalId(professional._id);
        setIsViewModalOpen(true);
    };

    const handleEdit = (professional: ProfessionalProfile) => {
        router.push(`/dashboard/users/professionals/edit/${professional._id}`);
    };

    const handleDeleteClick = (professional: ProfessionalProfile) => {
        setProfessionalToDelete(professional);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!professionalToDelete) return;
        
        try {
            const response = await authenticatedFetch(`/admin/professionals/${professionalToDelete._id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                 throw new Error("Failed to delete professional");
            }

            fetchProfessionals();
        } catch (error) {
            console.error("Error deleting professional:", error);
        }
    };

    // Filter Logic
    const filteredProfessionals = professionals.filter((professional) => {
        const matchesSearch = 
            professional.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            professional.user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredProfessionals.length / ITEMS_PER_PAGE);
    const paginatedProfessionals = filteredProfessionals.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-display-sm font-semibold text-primary">Professionals</h1>
                    <p className="text-md text-tertiary">Manage professional profiles and view details.</p>
                 </div>
                 <Button color="primary" iconLeading={Plus} onClick={handleAdd}>Add Professional</Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Input 
                    placeholder="Search by name or email..." 
                    icon={SearchLg} 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    wrapperClassName="w-full sm:max-w-xs"
                />
            </div>

            <TableCard.Root>
                <Table aria-label="Professionals table">
                    <Table.Header columns={columns}>
                        {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                    </Table.Header>
                    <Table.Body items={paginatedProfessionals}>
                        {(item) => {
                            // Determine current role
                            const currentRole = item.workExperiences?.find(w => !w.endDate) || item.workExperiences?.[0];
                            
                            return (
                                <Table.Row id={item._id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar 
                                                src={item.user.avatarUrl || ""} 
                                                alt={item.user.name} 
                                                size="md" 
                                                initials={item.user.name.charAt(0)}
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-primary">{item.user.name}</span>
                                                <span className="text-sm text-tertiary">{item.user.email}</span>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {currentRole ? (
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{currentRole.role}</span>
                                                <span className="text-xs text-tertiary">{currentRole.organization}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-tertiary">-</span>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>{item.user.phone || "-"}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-wrap gap-1">
                                            {item.skills && item.skills.slice(0, 2).map(skill => (
                                                <Badge key={skill._id} color="gray" size="sm">{skill.name}</Badge>
                                            ))}
                                            {item.skills && item.skills.length > 2 && (
                                                <Badge color="gray" size="sm">+{item.skills.length - 2}</Badge>
                                            )}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex justify-end gap-2">
                                            <ButtonUtility 
                                                icon={Eye} 
                                                aria-label="View Details" 
                                                color="tertiary" 
                                                onClick={() => handleView(item)}
                                            />
                                            <ButtonUtility 
                                                icon={Edit01} 
                                                aria-label="Edit Professional" 
                                                color="tertiary" 
                                                onClick={() => handleEdit(item)}
                                            />
                                            <ButtonUtility 
                                                icon={Trash01} 
                                                aria-label="Delete Professional" 
                                                color="tertiary" 
                                                className="text-error-500 hover:text-error-600 hover:bg-error-50"
                                                onClick={() => handleDeleteClick(item)}
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        }}
                    </Table.Body>
                </Table>
                
                {filteredProfessionals.length > 0 ? (
                    <PaginationCardMinimal
                        page={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                ) : (
                    <div className="p-6 text-center text-tertiary">
                        No professionals found matching your criteria.
                    </div>
                )}
            </TableCard.Root>

            <ViewProfessionalModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                professionalId={selectedProfessionalId}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Professional"
                description={`Are you sure you want to delete ${professionalToDelete?.user.name}? This action cannot be undone.`}
            />
        </div>
    );
}
