import OrderManagementHeader from "@/components/moduels/Tailors/OrderManagement/OrderManagementHeader";
import OrderTable from "@/components/moduels/Tailors/OrderManagement/OrderTable";
import PageBackground from "@/components/shared/PageBackgroundColor";
import RefreshButton from "@/components/shared/RefreshButton";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllOrders } from "@/services/tailors/order.service";
import { Suspense } from "react";


const OrderManagementPage = async ({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj)

  const orderResult = await getAllOrders(queryString)
  const totalPages = Math.ceil((orderResult.meta?.total || 1) / (orderResult.meta?.limit || 1));

  return (
    <PageBackground className="bg-gradient-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
      <div className="space-y-6 p-5">
        <OrderManagementHeader />
        <div className="flex">
          <RefreshButton />
        </div>
        <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
          <OrderTable orders={orderResult.data} />
          <TablePagination
            currentPage={orderResult.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense>
      </div>
    </PageBackground>
  );
};

export default OrderManagementPage;