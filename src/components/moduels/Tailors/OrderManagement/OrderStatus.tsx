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
import { Loader2, Clock, Scissors, Ruler, CheckCircle, Truck } from "lucide-react";

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

  const statusConfig: Record<OrderStatus, { bg: string; text: string; icon: any }> = {
    PENDING: { bg: "bg-amber-100", text: "text-amber-900", icon: Clock },
    CUTTING: { bg: "bg-[#FEE8DB]", text: "text-[#70370c]", icon: Scissors },
    SEWING: { bg: "bg-[#E8D5FF]", text: "text-[#7C3AED]", icon: Ruler },
    COMPLETED: { bg: "bg-emerald-100", text: "text-emerald-800", icon: CheckCircle },
    DELIVERED: { bg: "bg-[#C4D9FF]", text: "text-[#0D1A63]", icon: Truck },
  };

  return (
    <Select value={status} onValueChange={handleChange} disabled={isLoading}>
      <SelectTrigger
        className={`
          flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200
          ${isLoading ? "opacity-50 cursor-wait" : statusConfig[status].bg + " " + statusConfig[status].text}
          hover:scale-105 hover:shadow-md
        `}
      >
        {isLoading ?
          <Loader2 className="w-4 h-4 animate-spin" />
          :
          <SelectValue placeholder="Select status" />
        }
      </SelectTrigger>

      <SelectContent className="rounded-xl border shadow-lg">
        {Object.keys(statusConfig).map((key) => {
          const s = key as OrderStatus;
          const IconComp = statusConfig[s].icon;
          return (
            <SelectItem
              key={s}
              value={s}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              <IconComp className="w-4 h-4" />
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}