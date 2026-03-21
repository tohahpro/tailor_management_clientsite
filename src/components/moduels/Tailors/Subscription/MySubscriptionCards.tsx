"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import MySubscriptionViewDialog from "../MySubscriptionManagement/MySubscriptionViewDialog";
import Link from "next/link";

interface Props {
    subscriptions: any[];
}

const getStatusStyle = (status: string) => {
    switch (status) {
        case "ACTIVE":
            return "bg-green-100 text-green-700";
        case "EXPIRED":
            return "bg-gray-100 text-gray-700";
        case "LIMIT_EXPIRED":
            return "bg-yellow-100 text-yellow-700";
        case "CANCELLED":
            return "bg-red-100 text-red-700";
        default:
            return "bg-blue-100 text-blue-700";
    }
};

export default function MySubscriptionCards({ subscriptions }: Props) {
    const [viewingSubscription, setViewingSubscription] = useState<any | null>(null);

    return (
        <>
            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriptions.map((sub) => (
                    <Card
                        key={sub.id}
                        className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {sub.plan?.name || "N/A"}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    {sub.plan?.duration}
                                </p>
                            </div>

                            <Badge className={getStatusStyle(sub.status)}>
                                {sub.status}
                            </Badge>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <p className="text-2xl font-bold text-primary">
                                ৳{sub.totalPrice}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Total Payment
                            </p>
                        </div>

                        {/* Info */}
                        <div className="space-y-1 text-sm mb-4">
                            <div className="flex justify-between">
                                <span>Max Orders</span>
                                <span>{sub.maxOrderLimit}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Start</span>
                                <span>
                                    {format(new Date(sub.startDate), "dd MMM yyyy")}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>End</span>
                                <span>
                                    {format(new Date(sub.endDate), "dd MMM yyyy")}
                                </span>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1 flex items-center gap-2"
                                onClick={() => setViewingSubscription(sub)}
                            >
                                <Eye className="h-4 w-4" />
                                View Details
                            </Button>
                            {sub.status === "DEACTIVED" &&
                                <Link href={`/plans/payment/${sub.plan?.id}`}>
                                    <Button
                                        variant="outline"
                                        className="flex-1 flex items-center gap-2"
                                    >
                                        Premium Access
                                    </Button>
                                </Link>

                            }
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty */}
            {subscriptions.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No subscriptions found
                </div>
            )}

            {/* Dialog */}
            <MySubscriptionViewDialog
                open={!!viewingSubscription}
                onClose={() => setViewingSubscription(null)}
                subscription={viewingSubscription}
            />
        </>
    );
}