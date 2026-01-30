"use client";

import { useState, useEffect } from "react";
import { Plus, Edit01, Trash01, SearchLg } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { Table, TableCard } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { AddEditTeamModal } from "@/components/application/dashboard/master-settings/teams/add-edit-team-modal";
import { DeleteConfirmationModal } from "@/components/application/dashboard/master-settings/teams/delete-confirmation-modal";

interface TeamMember {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    role: "superadmin" | "admin" | "hr";
    createdAt: string;
    updatedAt: string;
}

const columns = [
    { name: "Name", id: "name", isRowHeader: true },
    { name: "Role", id: "role" },
    { name: "", id: "actions" },
];

import { authenticatedFetch } from "@/utils/api";

const initialTeams: TeamMember[] = [];

const roleOptions = [
    { id: "superadmin", label: "Super Admin" },
    { id: "admin", label: "Admin" },
    { id: "hr", label: "HR" },
];

const roleBadgeColors: Record<string, "brand" | "blue" | "pink"> = {
    superadmin: "brand",
    admin: "blue",
    hr: "pink",
};

const ITEMS_PER_PAGE = 5;

export default function TeamsPage() {
    const [teams, setTeams] = useState<TeamMember[]>(initialTeams);
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState<TeamMember | null>(null);

    // Search, Filter, Pagination State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await authenticatedFetch(`/team`);
            if (!response.ok) throw new Error("Failed to fetch teams");
            const data = await response.json();
            const teamsData = Array.isArray(data) ? data : (data.data || data.teams || []);
            setTeams(teamsData);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    const handleAdd = () => {
        setEditingTeam(null);
        setIsAddEditOpen(true);
    };

    const handleEdit = (team: TeamMember) => {
        setEditingTeam(team);
        setIsAddEditOpen(true);
    };

    const handleDelete = (team: TeamMember) => {
        setTeamToDelete(team);
        setIsDeleteOpen(true);
    };

    const handleSaveTeam = async (data: { name: string; email: string; role: string; password?: string }) => {
        try {
            if (editingTeam) {
                const response = await authenticatedFetch(`/team/${editingTeam._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                
                if (!response.ok) throw new Error("Failed to update team member");
                
                await fetchTeams();
            } else {
                const response = await authenticatedFetch(`/team`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error("Failed to create team member");

                await fetchTeams();
            }
        } catch (error) {
            console.error("Error saving team member:", error);
        }
    };

    const confirmDelete = async () => {
        if (teamToDelete) {
            try {
                const response = await authenticatedFetch(`/team/${teamToDelete._id}`, {
                    method: "DELETE",
                });

                if (!response.ok) throw new Error("Failed to delete team member");

                await fetchTeams();
            } catch (error) {
                console.error("Error deleting team member:", error);
            }
        }
    };

    // Filter Logic
    const filteredTeams = teams.filter((team) => {
        const matchesSearch = 
            team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            team.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole ? team.role === selectedRole : true;
        return matchesSearch && matchesRole;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);
    const paginatedTeams = filteredTeams.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Reset page when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleRoleFilterChange = (key: string) => {
        setSelectedRole(key === "all" ? null : key);
        setCurrentPage(1);
    };

    const filterOptions = [
        { id: "all", label: "All Roles" },
        ...roleOptions
    ];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-display-sm font-semibold text-primary">Teams</h1>
                    <p className="text-md text-tertiary">Manage your team members and their roles.</p>
                 </div>
                 <Button color="primary" iconLeading={Plus} onClick={handleAdd}>Add Team Member</Button>
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
                        placeholder="Filter by role"
                        items={filterOptions}
                        selectedKey={selectedRole || "all"}
                        onSelectionChange={(key) => handleRoleFilterChange(key as string)}
                    >
                        {(item) => <SelectItem id={item.id} textValue={item.label}>{item.label}</SelectItem>}
                    </Select>
                </div>
            </div>

            <TableCard.Root>
                <Table aria-label="Teams table">
                    <Table.Header columns={columns}>
                        {(column) => <Table.Head isRowHeader={column.isRowHeader}>{column.name}</Table.Head>}
                    </Table.Header>
                    <Table.Body items={paginatedTeams}>
                        {(item) => (
                            <Table.Row id={item._id}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar 
                                            src={item.avatarUrl} 
                                            alt={item.name} 
                                            size="md" 
                                            initials={item.name.charAt(0)}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-primary">{item.name}</span>
                                            <span className="text-sm text-tertiary">{item.email}</span>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge color={roleBadgeColors[item.role] || "gray"} size="md">
                                        {roleOptions.find(opt => opt.id === item.role)?.label || item.role}
                                    </Badge>
                                </Table.Cell>
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
                
                {filteredTeams.length > 0 ? (
                    <PaginationCardMinimal
                        page={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                ) : (
                    <div className="p-6 text-center text-tertiary">
                        No team members found matching your criteria.
                    </div>
                )}
            </TableCard.Root>

            <AddEditTeamModal
                isOpen={isAddEditOpen}
                onClose={() => setIsAddEditOpen(false)}
                onSave={handleSaveTeam}
                initialData={editingTeam ? { name: editingTeam.name, email: editingTeam.email, role: editingTeam.role } : null}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Team Member"
                description={`Are you sure you want to delete "${teamToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
}
