"use client";

import InfoRow from "@/components/shared/InfoRow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";

import {
  Calendar,
  DollarSign,
  Layers,
  Timer,
} from "lucide-react";
import SubscriptionStatus from "./SubscriptionStatus";
import { ISubscription } from "../../../../../types/subscription.interface";


interface Props {
  open: boolean;
  onClose: () => void;
  subscription: ISubscription | null;
}

const MySubscriptionViewDialog = ({
  open,
  onClose,
  subscription,
}: Props) => {
  if (!subscription) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="lg:min-w-3xl max-h-[90vh] flex flex-col p-0">
        
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Subscription Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">

          {/* Top Summary */}
          <div className="flex flex-col gap-4 p-6 rounded-lg mb-6 bg-muted/40">
            <h2 className="text-2xl font-bold">
              {subscription.plan?.name} Plan
            </h2>

            <div className="flex flex-wrap gap-2">
              <SubscriptionStatus status={subscription.status} />

              <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                <Timer className="h-3 w-3" />
                {subscription.plan?.duration}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">

            {/* Plan Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Plan Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Plan Name" value={subscription.plan?.name} />
                <InfoRow label="Duration" value={subscription.plan?.duration} />
                <InfoRow
                  label="Max Orders (Plan)"
                  value={subscription.plan?.maximumOder}
                />
                <InfoRow
                  label="Max Order Limit (User)"
                  value={subscription.maxOrderLimit}
                />
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">Pricing</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Plan Price"
                  value={`৳${subscription.planPrice}`}
                />
                <InfoRow
                  label="Extra Order Price"
                  value={`৳${subscription.maxOrderPrice || 0}`}
                />
                <InfoRow
                  label="Total Price"
                  value={`৳${subscription.totalPrice}`}
                />
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">
                  Subscription Timeline
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Start Date"
                  value={formatDateTime(subscription.startDate)}
                />
                <InfoRow
                  label="End Date"
                  value={formatDateTime(subscription.endDate)}
                />
                <InfoRow
                  label="Created At"
                  value={formatDateTime(subscription.createdAt)}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(subscription.updatedAt)}
                />
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MySubscriptionViewDialog;