import SubscriptionConfirmation from "@/components/moduels/Tailors/Subscription/SubscriptionConfirmation";
import { getSinglePlan } from "@/services/admin/planManagement";

interface BookAppointmentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BookAppointmentPage({ params }: BookAppointmentPageProps) {
    
    const { id } = await params;
    const result = await getSinglePlan(id);

    console.log(id)

    if (!result.success) {
        return <div>Plan not found</div>;
    }

    return (
        <SubscriptionConfirmation plan={result.data} />
    );
}