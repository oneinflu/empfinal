"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit01, Trash01, SearchLg } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { DeleteConfirmationModal } from "@/components/application/dashboard/users/mentors/delete-confirmation-modal";

interface MentorProfile {
    _id: string;
    user: {
        name: string;
        email: string;
        avatarUrl?: string;
    };
    currentRole: string;
    currentCompany: string;
    industry: string;
    rating: number;
    quickCallPrice: number;
}

const columns = [
    { name: "Name", id: "name", isRowHeader: true },
    { name: "Current Role", id: "currentRole" },
    { name: "Industry", id: "industry" },
    { name: "Rating", id: "rating" },
    { name: "Price", id: "quickCallPrice" },
    { name: "", id: "actions" },
];

import { authenticatedFetch } from "@/utils/api";

const ITEMS_PER_PAGE = 5;

export default function MentorsPage() {
    const router = useRouter();
    const [mentors, setMentors] = useState<MentorProfile[]>([]);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [mentorToDelete, setMentorToDelete] = useState<MentorProfile | null>(null);

    // Search, Filter, Pagination State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        try {
            const response = await authenticatedFetch(`/mentor-profiles`);
            if (!response.ok) throw new Error("Failed to fetch mentors");
            const data = await response.json();
            // Handle potentially different response structures
            const mentorsData = Array.isArray(data) ? data : (data.data || data.mentors || []);
            setMentors(mentorsData);
        } catch (error) {
            console.error("Error fetching mentors:", error);
        }
    };

    const handleAdd = () => {
        router.push("/dashboard/users/mentors/add");
    };

    const handleEdit = (mentor: MentorProfile) => {
        router.push(`/dashboard/users/mentors/edit/${mentor._id}`);
    };

    const handleDelete = (mentor: MentorProfile) => {
        setMentorToDelete(mentor);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (mentorToDelete) {
            try {
                // Guessing DELETE endpoint
                const response = await authenticatedFetch(`/admin/mentors/${mentorToDelete._id}`, {
                    method: "DELETE",
                });

                if (!response.ok) throw new Error("Failed to delete mentor");

                await fetchMentors();
            } catch (error) {
                console.error("Error deleting mentor:", error);
            }
        }
    };

    // Filter Logic
    const filteredMentors = mentors.filter((mentor) => {
        const matchesSearch = 
            mentor.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            mentor.user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIndustry = selectedIndustry ? mentor.industry === selectedIndustry : true;
        return matchesSearch && matchesIndustry;
    });

    // Extract unique industries for filter
    const uniqueIndustries = Array.from(new Set(mentors.map(m => m.industry))).filter(Boolean);
    const filterOptions = [
        { id: "all", label: "All Industries" },
        ...uniqueIndustries.map(ind => ({ id: ind, label: ind }))
    ];

    // Pagination Logic
    const totalPages = Math.ceil(filteredMentors.length / ITEMS_PER_PAGE);
    const paginatedMentors = filteredMentors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleIndustryFilterChange = (key: string) => {
        setSelectedIndustry(key === "all" ? null : key);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-display-sm font-semibold text-primary">Mentors</h1>
                    <p className="text-md text-tertiary">Manage your mentors and their profiles.</p>
                 </div>
                 <Button color="primary" iconLeading={Plus} onClick={handleAdd}>Add Mentor</Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Input 
                    placeholder="Search by name or email..." 
                    icon={SearchLg} 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    wrapperClassName="w-full sm:max-w-xs"
                />
                <div className="w-full sm:max-w-xs">
                    <Select
                        placeholder="Filter by industry"
                        items={filterOptions}
                        selectedKey={selectedIndustry || "all"}
                        onSelectionChange={(key) => handleIndustryFilterChange(key as string)}
                    >
                        {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                    </Select>
                </div>
            </div>

            <TableCard.Root>
                <Table aria-label="Mentors table">
                    <Table.Header columns={columns}>
                        {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                    </Table.Header>
                    <Table.Body items={paginatedMentors}>
                        {(item) => (
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
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-primary">{item.currentRole}</span>
                                        <span className="text-sm text-tertiary">{item.currentCompany}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{item.industry}</Table.Cell>
                                <Table.Cell>{item.rating.toFixed(1)}</Table.Cell>
                                <Table.Cell>${item.quickCallPrice}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-end gap-2">
                                        <ButtonUtility 
                                            icon={Edit01} 
                                            aria-label="Edit" 
                                            color="tertiary" 
                                            onClick={() => handleEdit(item)}
                                        />
                                        <ButtonUtility 
                                            icon={Trash01} 
                                            aria-label="Delete" 
                                            color="tertiary" 
                                            onClick={() => handleDelete(item)}
                                        />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                
                {filteredMentors.length > 0 ? (
                    <PaginationCardMinimal
                        page={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                ) : (
                    <div className="p-6 text-center text-tertiary">
                        No mentors found matching your criteria.
                    </div>
                )}
            </TableCard.Root>

            <DeleteConfirmationModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Mentor"
                description={`Are you sure you want to delete "${mentorToDelete?.user.name}"? This action cannot be undone.`}
            />
        </div>
    );
}
