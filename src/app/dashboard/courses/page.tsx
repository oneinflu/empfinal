"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, SearchLg, Edit01, Trash01, BookOpen01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ViewCourseModal } from "@/components/application/dashboard/courses/view-course-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/courses/delete-confirmation-modal";

interface Course {
    _id: string;
    title: string;
    level: string;
    duration: string;
    format: string;
    price: string;
    enrolledCount: number;
    rating: number;
    company?: {
        name: string;
        logoUrl?: string;
    };
    instructor?: {
        user?: {
            name: string;
            avatarUrl?: string;
        };
        currentRole?: string;
        currentCompany?: string;
    };
    category?: {
        name: string;
    };
    skills?: {
        name: string;
    }[];
}

const columns = [
    { name: "Course", id: "title", isRowHeader: true },
    { name: "Provider", id: "provider" },
    { name: "Level", id: "level" },
    { name: "Category", id: "category" },
    { name: "Enrolled", id: "enrolledCount" },
    { name: "", id: "actions" },
];

const API_BASE_URL = "https://empnodeapis-6f68i.ondigitalocean.app/api";
const ITEMS_PER_PAGE = 5;

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    // View Modal State
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/courses`);
            if (!response.ok) throw new Error("Failed to fetch courses");
            const data = await response.json();
            const coursesData = Array.isArray(data) ? data : (data.data || data.courses || []);
            setCourses(coursesData);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleAdd = () => {
        router.push("/dashboard/courses/add");
    };

    const handleView = (course: Course) => {
        setSelectedCourseId(course._id);
        setIsViewModalOpen(true);
    };

    const handleEdit = (course: Course) => {
        // router.push(`/dashboard/courses/edit/${course._id}`);
        console.log("Edit not implemented yet");
    };

    const handleDeleteClick = (course: Course) => {
        setCourseToDelete(course);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!courseToDelete) return;

        try {
            const response = await fetch(`${API_BASE_URL}/admin/courses/${courseToDelete._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setCourses(courses.filter(c => c._id !== courseToDelete._id));
            } else {
                console.error("Failed to delete course");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        } finally {
            setIsDeleteModalOpen(false);
            setCourseToDelete(null);
        }
    };

    // Filter and Pagination
    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.company?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.instructor?.user?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
    const currentCourses = filteredCourses.slice(
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
                    <h1 className="text-display-sm font-semibold text-primary">Courses</h1>
                    <p className="text-md text-tertiary">Manage courses and learning materials.</p>
                </div>
                <Button 
                    size="lg" 
                    color="primary" 
                    onClick={handleAdd}
                    iconLeading={Plus}
                >
                    Add Course
                </Button>
            </div>

            {/* Table Section */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="w-full max-w-sm">
                        <Input 
                            placeholder="Search by title, company or instructor..." 
                            icon={SearchLg}
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                        />
                    </div>
                </div>

                <TableCard.Root>
                    <Table aria-label="Courses table">
                        <Table.Header columns={columns}>
                            {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                        </Table.Header>
                        <Table.Body items={currentCourses}>
                            {(item) => (
                                <Table.Row id={item._id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center text-tertiary">
                                                <BookOpen01 className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-medium text-primary">{item.title}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            {item.company ? (
                                                <>
                                                    <Avatar 
                                                        size="sm" 
                                                        src={item.company.logoUrl} 
                                                        alt={item.company.name} 
                                                        initials={item.company.name[0]}
                                                    />
                                                    <span className="text-sm font-medium text-primary">{item.company.name}</span>
                                                </>
                                            ) : item.instructor ? (
                                                <>
                                                    <Avatar 
                                                        size="sm" 
                                                        src={item.instructor.user?.avatarUrl} 
                                                        alt={item.instructor.user?.name} 
                                                        initials={item.instructor.user?.name?.[0] || "I"}
                                                    />
                                                    <span className="text-sm font-medium text-primary">{item.instructor.user?.name}</span>
                                                </>
                                            ) : (
                                                <span className="text-sm text-tertiary">Unknown</span>
                                            )}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge size="sm" color="blue">{item.level}</Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-secondary">{item.category?.name || "-"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-secondary">{item.enrolledCount}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center justify-end gap-2">
                                            <ButtonUtility 
                                                icon={Eye} 
                                                color="tertiary" 
                                                onClick={() => handleView(item)}
                                                aria-label="View course"
                                            />
                                            <ButtonUtility 
                                                icon={Edit01} 
                                                color="tertiary" 
                                                onClick={() => handleEdit(item)}
                                                aria-label="Edit course"
                                            />
                                            <ButtonUtility 
                                                icon={Trash01} 
                                                color="tertiary" 
                                                onClick={() => handleDeleteClick(item)}
                                                aria-label="Delete course"
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

            <ViewCourseModal 
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                courseId={selectedCourseId}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
