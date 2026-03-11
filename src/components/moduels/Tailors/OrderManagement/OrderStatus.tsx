/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (newStatus: OrderStatus) => {
    if (newStatus === status) return; 

    const previousStatus = status;
    setStatus(newStatus); 
    setIsLoading(true);

    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error: any) {
      setStatus(previousStatus); 
      console.error(error);
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (s: OrderStatus) => {
    switch (s) {
      case "PENDING":
        return "bg-yellow-500";
      case "CUTTING":
        return "bg-indigo-500";
      case "SEWING":
        return "bg-purple-500";
      case "COMPLETED":
        return "bg-green-500";
      case "DELIVERED":
        return "bg-blue-500";
    }
  };

  return (
    <Select value={status} onValueChange={handleChange} disabled={isLoading}>
      <SelectTrigger
        className={`ml-2 px-3 py-1 rounded-lg text-white text-sm ${getStatusColor(
          status
        )} ${isLoading ? "opacity-50 cursor-wait" : ""}`}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">PENDING</SelectItem>
        <SelectItem value="CUTTING">CUTTING</SelectItem>
        <SelectItem value="SEWING">SEWING</SelectItem>
        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
        <SelectItem value="DELIVERED">DELIVERED</SelectItem>
      </SelectContent>
    </Select>
  );
}