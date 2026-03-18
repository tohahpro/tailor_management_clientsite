"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateOnlyCell } from "@/components/shared/cell/DateCell";

export interface ITailor {
    id: string;
    name?: string;
    storeName?: string;
    email: string;
    role: string;
    status: string;
    authtype: string;
    profilePhoto?: string;
    isPasswordChange: boolean;
    user: {
        role?: string;
        status?: string;
        authtype?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export const tailorColumns: Column<ITailor>[] = [
    {
        header: "Name",
        accessor: (tailor) => (
            <span className="font-medium">{tailor.name || "N/A"}</span>
        ),
        sortKey: "name",
    },
    {
        header: "Email",
        accessor: (tailor) => (
            <span className="font-medium">{tailor.email}</span>
        ),
        sortKey: "email",
    },

    {
        header: "Role",
        accessor: (tailor) => (
            <span className="text-xs py-1 rounded-full bg-blue-100 text-blue-800">
                {tailor.user.role}
            </span>
        ),
        sortKey: "role",
    },

    {
        header: "Status",
        accessor: (tailor) => (
            <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                    tailor.user.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                }`}
            >
                {tailor.user.status}
            </span>
        ),
        sortKey: "status",
    },

    {
        header: "Auth Type",
        accessor: (tailor) => (
            <span className="text-xs text-muted-foreground">
                {tailor.user.authtype}
            </span>
        ),
    },
    {
        header: "Created",
        accessor: (tailor) => (
            <DateOnlyCell date={tailor.createdAt} />
        ),
        sortKey: "createdAt",
    },

    {
        header: "Updated",
        accessor: (tailor) => (
            <DateOnlyCell date={tailor.updatedAt} />
        ),
        sortKey: "updatedAt",
    },
];