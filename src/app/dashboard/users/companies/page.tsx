"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, SearchLg, Globe01, Link01, Edit01, Trash01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ViewCompanyModal } from "@/components/application/dashboard/users/companies/view-company-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/users/companies/delete-confirmation-modal";

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

const columns = [
    { name: "Company", id: "name", isRowHeader: true },
    { name: "Location", id: "location" },
    { name: "Type", id: "companyType" },
    { name: "Team Size", id: "teamSize" },
    { name: "Website", id: "website" },
    { name: "", id: "actions" },
];

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";
const ITEMS_PER_PAGE = 5;

export default function CompaniesPage() {
    const router = useRouter();
    const [companies, setCompanies] = useState<CompanyProfile[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    // View Modal State
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<CompanyProfile | null>(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/company-profiles`);
            if (!response.ok) throw new Error("Failed to fetch companies");
            const data = await response.json();
            const companiesData = Array.isArray(data) ? data : (data.data || data.companies || []);
            setCompanies(companiesData);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    const handleAdd = () => {
        router.push("/dashboard/users/companies/add");
    };

    const handleView = (company: CompanyProfile) => {
        setSelectedCompanyId(company._id);
        setIsViewModalOpen(true);
    };

    const handleEdit = (company: CompanyProfile) => {
        router.push(`/dashboard/users/companies/edit/${company._id}`);
    };

    const handleDeleteClick = (company: CompanyProfile) => {
        setCompanyToDelete(company);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!companyToDelete) return;
        
        try {
            // Assuming endpoint structure
            const response = await fetch(`${API_BASE_URL}/admin/companies/${companyToDelete._id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                 // Fallback try
                 const response2 = await fetch(`${API_BASE_URL}/company-profiles/${companyToDelete._id}`, {
                    method: "DELETE",
                });
                if (!response2.ok) throw new Error("Failed to delete company");
            }

            // Refresh list
            fetchCompanies();
        } catch (error) {
            console.error("Error deleting company:", error);
        }
    };

    // Filter Logic
    const filteredCompanies = companies.filter((company) => {
        const matchesSearch = 
            company.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            company.user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType ? company.companyType === selectedType : true;
        return matchesSearch && matchesType;
    });

    // Extract unique types for filter
    const uniqueTypes = Array.from(new Set(companies.map(c => c.companyType))).filter(Boolean);
    const filterOptions = [
        { id: "all", label: "All Types" },
        ...uniqueTypes.map(type => ({ id: type, label: type }))
    ];

    // Pagination Logic
    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
    const paginatedCompanies = filteredCompanies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleTypeFilterChange = (key: string) => {
        setSelectedType(key === "all" ? null : key);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-display-sm font-semibold text-primary">Companies</h1>
                    <p className="text-md text-tertiary">Manage company profiles and view details.</p>
                 </div>
                 <Button color="primary" iconLeading={Plus} onClick={handleAdd}>Add Company</Button>
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
                        placeholder="Filter by type"
                        items={filterOptions}
                        selectedKey={selectedType || "all"}
                        onSelectionChange={(key) => handleTypeFilterChange(key as string)}
                    >
                        {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                    </Select>
                </div>
            </div>

            <TableCard.Root>
                <Table aria-label="Companies table">
                    <Table.Header columns={columns}>
                        {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                    </Table.Header>
                    <Table.Body items={paginatedCompanies}>
                        {(item) => (
                            <Table.Row id={item._id}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar 
                                            src={item.logoUrl || item.user.avatarUrl || ""} 
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
                                <Table.Cell>{item.location}</Table.Cell>
                                <Table.Cell>
                                    <Badge color="blue" size="sm">{item.companyType}</Badge>
                                </Table.Cell>
                                <Table.Cell>{item.teamSize}</Table.Cell>
                                <Table.Cell>
                                    {item.website && (
                                        <a href={item.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-brand-600 hover:underline">
                                            <Globe01 className="w-4 h-4" />
                                            Website
                                        </a>
                                    )}
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
                                            aria-label="Edit Company" 
                                            color="tertiary" 
                                            onClick={() => handleEdit(item)}
                                        />
                                        <ButtonUtility 
                                            icon={Trash01} 
                                            aria-label="Delete Company" 
                                            color="tertiary" 
                                            onClick={() => handleDeleteClick(item)}
                                            className="text-error-500 hover:text-error-600 hover:bg-error-50"
                                        />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                
                {filteredCompanies.length > 0 ? (
                    <PaginationCardMinimal
                        page={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                ) : (
                    <div className="p-6 text-center text-tertiary">
                        No companies found matching your criteria.
                    </div>
                )}
            </TableCard.Root>

            <ViewCompanyModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                companyId={selectedCompanyId}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Company"
                description={`Are you sure you want to delete ${companyToDelete?.user.name}? This action cannot be undone.`}
            />
        </div>
    );
}
