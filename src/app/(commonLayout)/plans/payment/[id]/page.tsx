import SubscriptionPayment from "@/components/moduels/Tailors/Subscription/SubscriptionPayment";
import { getSinglePlan } from "@/services/admin/planManagement";

interface PaymentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
    
    const { id } = await params;
    const result = await getSinglePlan(id);

    console.log(id)

    if (!result.success) {
        return <div>Plan not found</div>;
    }

    return (
        <div className="py-10">
            <SubscriptionPayment plan={result.data} />
        </div>
    );
}