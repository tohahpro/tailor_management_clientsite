import TailorManagementHeader from "@/components/moduels/Admin/TailorManagement/TailorManagementHeader";
import TailrosTable from "@/components/moduels/Admin/TailorManagement/TailorsTable";
import PageBackground from "@/components/shared/PageBackgroundColor";
import RefreshButton from "@/components/shared/RefreshButton";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTailors } from "@/services/admin/tailor.service";
import { Suspense } from "react";


const TailorManagementPage = async ({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj)

  const TailorResult = await getAllTailors(queryString)
  const totalPages = Math.ceil((TailorResult.meta?.total || 1) / (TailorResult.meta?.limit || 1));

  return (
    <PageBackground className="bg-gradient-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
      <div className="space-y-6 p-5">
        <TailorManagementHeader />
        <div className="flex">
          <RefreshButton />
        </div>
        <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>          
            <TailrosTable tailors={TailorResult.data} />          
          <TablePagination
            currentPage={TailorResult.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense>
      </div>
    </PageBackground>
  );
};

export default TailorManagementPage;