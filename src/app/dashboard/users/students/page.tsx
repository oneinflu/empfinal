"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, SearchLg, Edit01, Trash01, GraduationHat01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ViewStudentModal } from "@/components/application/dashboard/users/students/view-student-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/users/students/delete-confirmation-modal";

interface StudentProfile {
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
    skills: {
        _id: string;
        name: string;
    }[];
    resumeUrl?: string;
}

const columns = [
    { name: "Student", id: "name", isRowHeader: true },
    { name: "Education", id: "education" },
    { name: "Phone", id: "phone" },
    { name: "Skills", id: "skills" },
    { name: "", id: "actions" },
];

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";
const ITEMS_PER_PAGE = 5;

export default function StudentsPage() {
    const router = useRouter();
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    // View Modal State
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<StudentProfile | null>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/students`);
            if (!response.ok) throw new Error("Failed to fetch students");
            const data = await response.json();
            const studentsData = Array.isArray(data) ? data : (data.data || data.students || []);
            setStudents(studentsData);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleAdd = () => {
        router.push("/dashboard/users/students/add");
    };

    const handleView = (student: StudentProfile) => {
        setSelectedStudentId(student._id);
        setIsViewModalOpen(true);
    };

    const handleEdit = (student: StudentProfile) => {
        router.push(`/dashboard/users/students/edit/${student._id}`);
    };

    const handleDeleteClick = (student: StudentProfile) => {
        setStudentToDelete(student);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!studentToDelete) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/admin/students/${studentToDelete._id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                 // Fallback try
                 const response2 = await fetch(`${API_BASE_URL}/student-profiles/${studentToDelete._id}`, {
                    method: "DELETE",
                });
                if (!response2.ok) throw new Error("Failed to delete student");
            }

            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    // Filter Logic
    const filteredStudents = students.filter((student) => {
        const matchesSearch = 
            student.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            student.user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
    const paginatedStudents = filteredStudents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-display-sm font-semibold text-primary">Students</h1>
                    <p className="text-md text-tertiary">Manage student profiles and view details.</p>
                 </div>
                 <Button color="primary" iconLeading={Plus} onClick={handleAdd}>Add Student</Button>
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
                <Table aria-label="Students table">
                    <Table.Header columns={columns}>
                        {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                    </Table.Header>
                    <Table.Body items={paginatedStudents}>
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
                                    {item.educations && item.educations.length > 0 ? (
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{item.educations[0].institutionName}</span>
                                            <span className="text-xs text-tertiary">{item.educations[0].degree}</span>
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
                                            aria-label="Edit Student" 
                                            color="tertiary" 
                                            onClick={() => handleEdit(item)}
                                        />
                                        <ButtonUtility 
                                            icon={Trash01} 
                                            aria-label="Delete Student" 
                                            color="tertiary" 
                                            className="text-error-500 hover:text-error-600 hover:bg-error-50"
                                            onClick={() => handleDeleteClick(item)}
                                        />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                
                {filteredStudents.length > 0 ? (
                    <PaginationCardMinimal
                        page={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                ) : (
                    <div className="p-6 text-center text-tertiary">
                        No students found matching your criteria.
                    </div>
                )}
            </TableCard.Root>

            <ViewStudentModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                studentId={selectedStudentId}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Student"
                description={`Are you sure you want to delete ${studentToDelete?.user.name}? This action cannot be undone.`}
            />
        </div>
    );
}
