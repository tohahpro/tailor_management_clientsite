import MySubscriptionFilters from "@/components/moduels/Tailors/MySubscriptionManagement/MySubscriptionFilters";
import MySubscriptionManagementHeader from "@/components/moduels/Tailors/MySubscriptionManagement/MySubscriptionManagementHeader";
import MySubscriptionCards from "@/components/moduels/Tailors/Subscription/MySubscriptionCards";
import PageBackground from "@/components/shared/PageBackgroundColor";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMySubscriptions } from "@/services/admin/subscriptionManagement";
import { Suspense } from "react";


const MySubscriptionManagementPage = async ({
    searchParams
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj)

    const subscriptionResult = await getMySubscriptions(queryString)
    const totalPages = Math.ceil((subscriptionResult.meta?.total || 1) / (subscriptionResult.meta?.limit || 1));

    return (
        <PageBackground className="bg-linear-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
            <div className="space-y-6 p-5">
                <MySubscriptionManagementHeader />

                <MySubscriptionFilters />
                <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                    <MySubscriptionCards subscriptions={subscriptionResult.data} />
                    <div className="">
                        <TablePagination
                            currentPage={subscriptionResult.meta?.page || 1}
                            totalPages={totalPages || 1}
                        />
                    </div>
                </Suspense>
            </div>
        </PageBackground>
    );
};

export default MySubscriptionManagementPage;