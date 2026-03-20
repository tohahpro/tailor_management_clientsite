"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { changeSubscriptionStatus } from "@/services/admin/subscriptionManagement";

type SubscriptionStatus =
  | "ACTIVE"
  | "DEACTIVED"
  | "EXPIRED"
  | "LIMIT_EXPIRED"
  | "CANCELLED";

interface Props {
  subscriptionId: string;
  currentStatus: SubscriptionStatus;
}

export default function SubscriptionStatusBadge({
  subscriptionId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState<SubscriptionStatus>(
    currentStatus
  );
  const [isLoading, setIsLoading] = useState(false);

  // ✅ keep state in sync with props
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleToggle = async () => {
    // ❌ block invalid states
    if (
      status === "EXPIRED" ||
      status === "LIMIT_EXPIRED" ||
      status === "CANCELLED"
    ) {
      toast.error("This subscription cannot be changed");
      return;
    }

    const previousStatus = status;
    const newStatus = status === "ACTIVE" ? "DEACTIVED" : "ACTIVE";

    // ✅ optimistic update
    setStatus(newStatus);
    setIsLoading(true);

    try {
      const result = await changeSubscriptionStatus(subscriptionId);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Subscription status updated");
    } catch (error: any) {
      setStatus(previousStatus);
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ variant mapping
  const getVariant = () => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "DEACTIVED":
        return "secondary";
      case "EXPIRED":
      case "LIMIT_EXPIRED":
        return "destructive";
      case "CANCELLED":
        return "outline";
      default:
        return "secondary";
    }
  };

  const isClickable =
    status === "ACTIVE" || status === "DEACTIVED";

  // ✅ custom color (optional override)
  const getCustomStyle = () => {
    if (status === "ACTIVE") {
      return "bg-green-500 text-white hover:bg-green-600";
    }
    return "";
  };

  return (
    <Badge
      variant={getVariant()}
      onClick={isClickable ? handleToggle : undefined}
      className={`transition 
        ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-70"}
        ${isLoading ? "opacity-50 cursor-wait" : ""}
        ${getCustomStyle()}
      `}
    >
      {isLoading ? "Updating..." : status}
    </Badge>
  );
}