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
import { ViewJobModal } from "@/components/application/dashboard/jobs/view-job-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/jobs/delete-confirmation-modal";

interface Job {
    _id: string;
    title: string;
    type: string;
    company: {
        _id: string;
        name: string;
        avatarUrl?: string;
    };
    companyName: string;
    companyLogoUrl?: string;
    location: string;
    status: string;
    createdAt: string;
}

const columns = [
    { name: "Job Title", id: "title", isRowHeader: true },
    { name: "Company", id: "company" },
    { name: "Type", id: "type" },
    { name: "Location", id: "location" },
    { name: "Status", id: "status" },
    { name: "", id: "actions" },
];

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";
const ITEMS_PER_PAGE = 5;

export default function JobsPage() {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    // View Modal State
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/jobs`);
            if (!response.ok) throw new Error("Failed to fetch jobs");
            const data = await response.json();
            const jobsData = Array.isArray(data) ? data : (data.data || data.jobs || []);
            setJobs(jobsData);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleAdd = () => {
        router.push("/dashboard/jobs/add");
    };

    const handleView = (job: Job) => {
        setSelectedJobId(job._id);
        setIsViewModalOpen(true);
    };

    const handleEdit = (job: Job) => {
        // router.push(`/dashboard/jobs/edit/${job._id}`);
        // Not implemented yet, placeholder
        console.log("Edit", job._id);
    };

    const handleDeleteClick = (job: Job) => {
        setJobToDelete(job);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!jobToDelete) return;

        try {
            // Note: API endpoint for delete might be /admin/jobs/:id or similar
            // Assuming DELETE method on /admin/jobs/:id based on standard REST
            // But prompt didn't explicitly specify DELETE endpoint.
            // Professionals used DELETE /admin/professionals/:id. Assuming same pattern.
            const response = await fetch(`${API_BASE_URL}/admin/jobs/${jobToDelete._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setJobs(jobs.filter(j => j._id !== jobToDelete._id));
            } else {
                console.error("Failed to delete job");
            }
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    // Filter and Pagination
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.companyName || job.company?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const currentJobs = filteredJobs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-display-sm font-semibold text-primary">Jobs</h1>
                    <p className="text-md text-tertiary">Manage job postings and applications.</p>
                </div>
                <Button 
                    size="lg" 
                    color="primary" 
                    onClick={handleAdd}
                    iconLeading={Plus}
                >
                    Add Job
                </Button>
            </div>

            {/* Table Section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="w-full max-w-sm">
                        <Input 
                            placeholder="Search by title or company..." 
                            icon={SearchLg}
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                        />
                    </div>
                </div>

                <TableCard.Root>
                    <Table aria-label="Jobs table">
                        <Table.Header columns={columns}>
                            {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                        </Table.Header>
                        <Table.Body items={currentJobs}>
                            {(item) => (
                                <Table.Row id={item._id}>
                                    <Table.Cell>
                                        <span className="text-sm font-medium text-primary">{item.title}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar 
                                                size="sm" 
                                                src={item.companyLogoUrl || item.company?.avatarUrl} 
                                                alt={item.companyName || item.company?.name} 
                                                initials={(item.companyName || item.company?.name)?.[0] || "C"}
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-primary">
                                                    {item.companyName || item.company?.name || "Unknown"}
                                                </span>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge size="sm" color="blue">{item.type}</Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-secondary">{item.location}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge 
                                            size="sm" 
                                            color={item.status === "active" ? "success" : item.status === "closed" ? "error" : "warning"}
                                        >
                                            {item.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center justify-end gap-2">
                                            <ButtonUtility 
                                                icon={Eye} 
                                                color="tertiary" 
                                                onClick={() => handleView(item)}
                                                aria-label="View job"
                                            />
                                            <ButtonUtility 
                                                icon={Edit01} 
                                                color="tertiary" 
                                                onClick={() => handleEdit(item)}
                                                aria-label="Edit job"
                                            />
                                            <ButtonUtility 
                                                icon={Trash01} 
                                                color="tertiary" 
                                                onClick={() => handleDeleteClick(item)}
                                                aria-label="Delete job"
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                    <PaginationCardMinimal 
                        page={currentPage}
                        total={totalPages}
                        onPageChange={handlePageChange}
                    />
                </TableCard.Root>
            </div>

            <ViewJobModal 
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                jobId={selectedJobId}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Job"
                description="Are you sure you want to delete this job posting? This action cannot be undone."
            />
        </div>
    );
}
