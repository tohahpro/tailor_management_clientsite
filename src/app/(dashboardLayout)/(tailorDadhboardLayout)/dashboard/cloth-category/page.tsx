import CategoryManagementHeader from "@/components/moduels/Tailors/CategoryManagement/CategoryManagementHeader";
import CategoryTable from "@/components/moduels/Tailors/CategoryManagement/CategoryTable";
import RefreshButton from "@/components/shared/RefreshButton";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllCategories } from "@/services/tailors/category.service";
import { Suspense } from "react";


const CategoryManagementPage = async ({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj)

  const categoryResult = await getAllCategories(queryString)
  const totalPages = Math.ceil((categoryResult.meta?.total || 1) / (categoryResult.meta?.limit || 1));

  return (
    <div className="space-y-6 p-5">
      <CategoryManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <CategoryTable categories={categoryResult.data} />
        <TablePagination
          currentPage={categoryResult.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default CategoryManagementPage;