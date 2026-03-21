/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";


// ✅ GET ALL SUBSCRIPTIONS (ADMIN)
export async function getAllSubscriptions(queryString?: string) {
    try {

        const response = await serverFetch.get(
            `/subscription/all-subscriptions${queryString ? `?${queryString}` : ""}`,
            {
                cache: "no-store",
            }
        );

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch subscriptions",
        };
    }
}

export async function getMySubscriptions(queryString?: string) {
    try {
        const response = await serverFetch.get(`/subscription/my-subscriptions${queryString ? `?${queryString}` : ""}`,
            { cache: "no-store" }
        );

        const result = await response.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch my subscriptions",
        };
    }
}


// ✅ UPDATE SUBSCRIPTION (PLAN / MAX ORDER / STATUS)
export async function updateSubscription(
    id: string,
    formData: FormData
) {
    try {
        const payload = {
            planId: formData.get("planId"),
            maxOrderLimit: formData.get("maxOrderLimit"),
            status: formData.get("status"),
            duration: formData.get("duration"),
            price: formData.get("price")
        };

        const response = await serverFetch.patch(`/subscription/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update subscription",
            formData: Object.fromEntries(formData),
        };
    }
}


// ✅ CHANGE STATUS (ACTIVE / DEACTIVED)
export async function changeSubscriptionStatus(id: string) {
    try {
        const response = await serverFetch.patch(
            `/subscription/status/${id}`
        );

        const result = await response.json();

        if (result.success) {
            revalidateTag("subscriptions-list", { expire: 0 });
            revalidateTag("subscriptions-page-1", { expire: 0 });
        }


        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to change status",
        };
    }
}


// ✅ DELETE SUBSCRIPTION
export async function deleteSubscription(id: string) {
    try {
        const response = await serverFetch.delete(`/subscription/${id}`);

        const result = await response.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to delete subscription",
        };
    }
}