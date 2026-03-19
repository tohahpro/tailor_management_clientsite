"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateOnlyCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { ITailor } from "../../../../../types/tailor.interface";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";


export const tailorColumns: Column<ITailor>[] = [
    {
        header: "Tailor",
        accessor: (tailor) => (
            <UserInfoCell
                name={tailor.name || 'N/A'}
                email={tailor.email}
                photo={tailor.profilePhoto}
            />
        )        
    },   
    {
        header: "Address",
        accessor: (tailor) => (
            <span className="text-xs font-light text-wrap">
                {tailor.address || 'N/A'}
            </span>
        ),
    },
    {
        header: "Store Name",
        accessor: (tailor) => (
            <span className="font-medium text-wrap">
                {tailor.storeName || 'N/A'}
            </span>
        ),
    },

    {
        header: "Status",
        accessor: (tailor) => (
            <StatusBadgeCell isDeleted={tailor.isDeleted} />
        ),
    },

    {
        header: "Auth Type",
        accessor: (tailor) => (
            <span className="text-xs text-muted-foreground">
                {tailor.user.authtype !== 'LOCAL' ? 'Social Login' : 'Email/Password'}
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