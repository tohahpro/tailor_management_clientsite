

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

// ✅ CREATE SUBSCRIPTION
export async function createSubscription(formData: FormData) {
    try {
        const payload = {
            planId: formData.get("planId"),
            maxOrderLimit: formData.get("maxOrderLimit")
                ? Number(formData.get("maxOrderLimit"))
                : undefined,
        };

        const response = await serverFetch.post("/subscription", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
            // ✅ revalidate subscription list
            revalidateTag("subscriptions-list", { expire: 0 });
            revalidateTag("my-subscriptions", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to create subscription",
            formData: Object.fromEntries(formData),
        };
    }
}