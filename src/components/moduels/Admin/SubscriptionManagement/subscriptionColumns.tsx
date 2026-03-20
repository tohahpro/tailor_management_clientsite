"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateCell, DateOnlyCell } from "@/components/shared/cell/DateCell";
import SubscriptionStatus from "./SubscriptionStatusBadge";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { capitalizeText } from "@/lib/formatters";

interface ISubscription {
    id: string;
    status: "ACTIVE" | "DEACTIVED" | "EXPIRED" | "LIMIT_EXPIRED" | "CANCELLED";
    startDate: string;
    endDate: string;
    totalPrice: number;
    maxOrderLimit: number;
    createdAt: string;
    plan: {
        name: string;
        duration: string;
    };
    tailor: {
        id: string;
        email: string;
        name: string;
        storeName: string;
        profilePhoto: string;
        contactNumber: string
    }
}

export const subscriptionColumns: Column<ISubscription>[] = [
    {
        header: "Tailor",
        accessor: (subscription) => (
            <UserInfoCell
                name={subscription.tailor?.name}
                email={subscription.tailor?.email}
                photo={subscription.tailor?.profilePhoto}
            />
        ),
    },

    {
        header: "Plan",
        accessor: (subscription) => (
            <div className="flex flex-col">
                <span className="font-medium">
                    {subscription.plan?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                    {capitalizeText(subscription.plan?.duration)}
                </span>
                
            </div>
        )
    },
    {
        header: "Contact Number",
        accessor: (subscription) => (
            <div className="flex flex-col">
                <span className="font-medium">
                    {subscription.tailor?.contactNumber || 'N/A'}
                </span>
            </div>
        ),
        sortKey: "planId",
    },
    {
        header: "Max Orders",
        accessor: (subscription) => (
            <div className="text-sm">
                <span className="font-medium">
                    {subscription.maxOrderLimit}
                </span>
            </div>
        ),
        sortKey: "maxOrderLimit"
    },

    {
        header: "Price",
        accessor: (subscription) => (
            <div className="text-sm font-medium">
                ৳ {subscription.totalPrice}
            </div>
        ),
        sortKey: "totalPrice",
    },

    {
        header: "Status",
        accessor: (subscription) => (
            <SubscriptionStatus
                subscriptionId={subscription.id}
                currentStatus={subscription.status}
            />
        ),
    },

    {
        header: "Start Date",
        accessor: (subscription) => (
            <DateOnlyCell date={subscription.startDate} />
        ),
        sortKey: "startDate",
    },

    {
        header: "End Date",
        accessor: (subscription) => (
            <DateCell date={subscription.endDate} />
        ),
        sortKey: "endDate",
    }
];