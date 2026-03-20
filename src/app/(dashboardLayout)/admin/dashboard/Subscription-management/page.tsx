import SubscriptionFilters from "@/components/moduels/Admin/SubscriptionManagement/SubscriptionFilters";
import SubscriptionManagementHeader from "@/components/moduels/Admin/SubscriptionManagement/SubscriptionManagementHeader";
import SubscriptionTable from "@/components/moduels/Admin/SubscriptionManagement/SubscriptionTable";
import PageBackground from "@/components/shared/PageBackgroundColor";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllSubscriptions } from "@/services/admin/subscriptionManagement";
import { Suspense } from "react";


const SubscriptionManagementPage = async ({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj)

  const SubscriptionResult = await getAllSubscriptions(queryString)
  const totalPages = Math.ceil((SubscriptionResult.meta?.total || 1) / (SubscriptionResult.meta?.limit || 1));
  console.log(SubscriptionResult)

  return (
    <PageBackground className="bg-linear-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
      <div className="space-y-6 p-5">
        <SubscriptionManagementHeader />
        <SubscriptionFilters />

        <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>          
            <SubscriptionTable subscriptions={SubscriptionResult.data} />          
          <TablePagination
            currentPage={SubscriptionResult.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense>
      </div>
    </PageBackground>
  );
};

export default SubscriptionManagementPage;