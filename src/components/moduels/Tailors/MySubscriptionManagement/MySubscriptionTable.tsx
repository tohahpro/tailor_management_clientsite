/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { mySubscriptionColumns } from "./mySubscriptionColumns";
import { useState } from "react";
import MySubscriptionViewDialog from "./MySubscriptionViewDialog";

interface MySubscriptionTableProps {
    subscriptions: any[];
}

const MySubscriptionTable = ({ subscriptions }: MySubscriptionTableProps) => {

    const [viewingSubscription, setViewingSubscription] = useState<any | null>(null);

    const handleView = (subscription: any) => {
        setViewingSubscription(subscription);
    };


    return (
        <>

            <ManagementTable
                data={subscriptions}
                columns={mySubscriptionColumns}
                onView={handleView}
                className="bg-white/70 rounded-md"
                getRowKey={(Order) => Order.id}
                emptyMessage="No Orders found"
            />

            {/* View Subscription Dialog */}
            <MySubscriptionViewDialog
                open={!!viewingSubscription}
                onClose={() => setViewingSubscription(null)}
                subscription={viewingSubscription}
            />

        </>
    );
};

export default MySubscriptionTable;