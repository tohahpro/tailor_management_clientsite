"use client";

import { Column } from "@/components/shared/ManagementTable";
import { IAdmin } from "../../../../../types/admin.interface";
import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";

export const adminsColumns: Column<IAdmin>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <UserInfoCell
        name={admin.name}
        email={admin.email}
        photo={admin.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (admin) => (
      <div className="flex flex-col">
        <span className="text-sm">{admin.contactNumber || 'N/A'}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (admin) => <StatusBadgeCell isDeleted={admin.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (admin) => <DateCell date={admin.createdAt} />,
    sortKey: "createdAt",
  },
];