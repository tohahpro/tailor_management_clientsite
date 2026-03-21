/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";


// CREATE PLAN
export async function createPlan(prevState: any, formData: FormData) {
    const payload = {
        name: formData.get("name"),
        baseprice: Number(formData.get("baseprice")),
        tranding: formData.get("tranding") === "true",
        duration: formData.get("duration"),
        maximumOder: Number(formData.get("maximumOder")),
        description: formData.get("description"),
    };

    try {
        const response = await serverFetch.post("/plan", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("plans-list", { expire: 0 });
        }

        return {
            success: result.success,
            message: result.message,
            formData: !result.success ? payload : undefined,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to create plan",
            formData: payload,
        };
    }
}


// GET ALL PLANS
export async function getAllPlans() {
    try {
        const response = await serverFetch.get("/plan", {
            cache: "no-cache",
        });

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch plans",
        };
    }
}

export async function getAllActivePlans() {
    try {
        const response = await serverFetch.get("/plan/active", {
            cache: "no-cache",
        });

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch plans",
        };
    }
}


// GET SINGLE PLAN
export async function getSinglePlan(planId: string) {
    try {
        const response = await serverFetch.get(`/plan/${planId}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch plan",
        };
    }
}


// UPDATE PLAN (useActionState compatible)
export async function updatePlan(
    planId: string,
    prevState: any,
    formData: FormData
) {
    const payload = {
        name: formData.get("name"),
        baseprice: Number(formData.get("baseprice")),
        duration: formData.get("duration"),
        tranding: formData.get("tranding") === "true",
        maximumOder: Number(formData.get("maximumOder")),
        description: formData.get("description"),
    };

    try {
        const response = await serverFetch.patch(`/plan/${planId}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("plans-list", { expire: 0 });
        }

        return {
            success: result.success,
            message: result.message,
            formData: !result.success ? payload : undefined,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update plan",
            formData: payload,
        };
    }
}


// UPDATE PLAN STATUS
export async function updatePlanStatus(planId: string) {
    try {
        const response = await serverFetch.patch(`/plan/status/${planId}`);
        const result = await response.json();

        if (result.success) {
            revalidateTag("plans-list", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update status",
        };
    }
}


// DELETE PLAN
export async function deletePlan(planId: string) {
    try {
        const response = await serverFetch.delete(`/plan/${planId}`);
        const result = await response.json();

        if (result.success) {
            revalidateTag("plans-list", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to delete plan",
        };
    }
}