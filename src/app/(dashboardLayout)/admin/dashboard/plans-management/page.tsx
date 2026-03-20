
import { Suspense } from "react";
import PlanManagementHeader from "@/components/moduels/Admin/PlanManagement/PlanManagementHeader";
import PlanTable from "@/components/moduels/Admin/PlanManagement/PlanTable";
import PageBackground from "@/components/shared/PageBackgroundColor";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllPlans } from "@/services/admin/planManagement";
import RefreshButton from "@/components/shared/RefreshButton";


const PlanManagementPage = async () => {

    const PlanResult = await getAllPlans()

    return (
        <PageBackground className="bg-linear-to-br from-[#fcf9ff] via-[#f0e4ff] to-[#d0abfd]">
            <div className="space-y-6 p-5">
                <PlanManagementHeader />
                <RefreshButton />
                <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                    <PlanTable plans={PlanResult.data} />
                </Suspense>
            </div>
        </PageBackground>
    );
};

export default PlanManagementPage;