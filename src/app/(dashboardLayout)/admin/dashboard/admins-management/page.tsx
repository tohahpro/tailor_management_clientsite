import AdminsManagementHeader from "@/components/moduels/Admin/AdminManagement/AdminManagementHeader";
import AdminsTable from "@/components/moduels/Admin/AdminManagement/AdminsTable";
import PageBackground from "@/components/shared/PageBackgroundColor";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAdmins } from "@/services/admin/adminsManagement";

import { Suspense } from "react";

const AdminManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const adminsResult = await getAdmins(queryString);

    const totalPages = Math.ceil(
        (adminsResult?.meta?.total || 1) / (adminsResult?.meta?.limit || 1)
    );

    return (
        <PageBackground className="bg-gradient-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
            <div className="space-y-6 p-5">
                <AdminsManagementHeader />

                <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                    <AdminsTable admins={adminsResult?.data || []} />
                    <TablePagination
                        currentPage={adminsResult?.meta?.page || 1}
                        totalPages={totalPages || 1}
                    />
                </Suspense>
            </div>
        </PageBackground>
    );
};

export default AdminManagementPage;