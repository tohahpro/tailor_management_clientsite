import CategoryTable from "@/components/moduels/Tailors/CategoryManagement/CategoryTable";
import OrderManagementHeader from "@/components/moduels/Tailors/OrderManagement/OrderManagementHeader";
import PageBackground from "@/components/shared/PageBackgroundColor";
import RefreshButton from "@/components/shared/RefreshButton";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllCategories } from "@/services/tailors/category.service";
import { Suspense } from "react";


const OrderManagementPage = async ({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj)

  const categoryResult = await getAllCategories(queryString)
  const totalPages = Math.ceil((categoryResult.meta?.total || 1) / (categoryResult.meta?.limit || 1));

  return (
    <PageBackground className="bg-gradient-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
      <div className="space-y-6 p-5">
        <OrderManagementHeader />
        <div className="flex">
          <RefreshButton />
        </div>
        {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
          <CategoryTable categories={categoryResult.data} />
          <TablePagination
            currentPage={categoryResult.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense> */}
      </div>
    </PageBackground>
  );
};

export default OrderManagementPage;