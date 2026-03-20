"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { updatePlanStatus } from "@/services/admin/planManagement";

interface Props {
  planId: string;
  currentStatus: boolean; // isActive
}

export default function PlanStatusBadge({
  planId,
  currentStatus,
}: Props) {
  const [isActive, setIsActive] = useState<boolean>(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsActive(currentStatus);
  }, [currentStatus]);

  const handleToggle = async () => {
    const previousStatus = isActive;

    setIsActive(!isActive);
    setIsLoading(true);

    try {
      const result = await updatePlanStatus(planId);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("Plan status updated");
    } catch (error: any) {
      setIsActive(previousStatus);
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const getVariant = () => {
    return isActive ? "default" : "secondary";
  };


  const getCustomStyle = () => {
    if (isActive) {
      return "bg-green-500 text-white hover:bg-green-600";
    }
    return "bg-gray-200 text-gray-700";
  };

  return (
    <Badge
      variant={getVariant()}
      onClick={handleToggle}
      className={`transition cursor-pointer
        ${isLoading ? "opacity-50 cursor-wait" : ""}
        ${getCustomStyle()}
      `}
    >
      {isLoading ? "Updating..." : isActive ? "ACTIVE" : "INACTIVE"}
    </Badge>
  );
}