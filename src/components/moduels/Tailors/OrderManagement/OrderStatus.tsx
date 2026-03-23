/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/services/tailors/order.service";

type OrderStatus = "PENDING" | "CUTTING" | "SEWING" | "COMPLETED" | "DELIVERED";

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
}

export default function OrderStatusBadgeDropdown({ orderId, currentStatus }: Props) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleChange = async (newStatus: OrderStatus) => {
    if (newStatus === status) return;

    const previousStatus = status;
    setStatus(newStatus);
    setIsLoading(true);

    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (!result.success) throw new Error(result.message);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error: any) {
      setStatus(previousStatus);
      toast.error(error?.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeColor = (s: OrderStatus) => {
    switch (s) {
      case "PENDING":
        // return "bg-[#FEE8DB] text-[#70370c]";
        return "bg-amber-100 text-amber-900";
      case "CUTTING":
        // return "bg-[#E0E7FF] text-[#4F46E5]";
        return "bg-[#FEE8DB] text-[#70370c]";
      case "SEWING":
        return "bg-[#E8D5FF] text-[#7C3AED]";
        // return "bg-emerald-100 text-emerald-800";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      case "DELIVERED":
        // return "bg-stone-100 text-stone-800";
        return "bg-[#C4D9FF] text-[#0D1A63]";
    }
  };

  return (
    <Select value={status} onValueChange={handleChange} disabled={isLoading}>
      <SelectTrigger
        className={`flex items-center justify-center rounded-md text-sm font-medium transition ${
          isLoading ? "opacity-50 cursor-wait" : getBadgeColor(status)
        }`}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="CUTTING">Cutting</SelectItem>
        <SelectItem value="SEWING">Sewing</SelectItem>
        <SelectItem value="COMPLETED">Completed</SelectItem>
        <SelectItem value="DELIVERED">Delivered</SelectItem>
      </SelectContent>
    </Select>
  );
}