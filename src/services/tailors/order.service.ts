/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { serverFetch } from "@/lib/server-fetch";
import { IUpdateOrderPayload } from "../../../types/order.interface";

// ✅ Create Order
export async function createOrder(payload: any) {
    const response = await serverFetch.post("/order", {
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Order creation failed");
    }

    return result;
}

// ✅ Get All Orders
export async function getAllOrders(query?: string) {
    try {
        const response = await serverFetch.get(`/order${query ? `?${query}` : ""}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to fetch orders",
        };
    }
}

// ✅ Get Order By ID
export async function getOrderById(id: string) {
    try {
        const response = await serverFetch.get(`/order/${id}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to fetch order",
        };
    }
}

// ✅ Update Order
export async function updateOrder(orderId: string, payload: IUpdateOrderPayload) {
    const response = await serverFetch.patch(`/order/${orderId}`, {
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Order update failed");
    }

    return result;
}

// ✅ Delete Order
export async function deleteOrder(id: string) {
    try {
        const response = await serverFetch.delete(`/order/${id}`);
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Delete failed");
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Delete failed",
        };
    }
}
