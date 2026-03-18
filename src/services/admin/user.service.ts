/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

// Create Tailor
export async function createTailor(payload: any) {
    const response = await serverFetch.post("/user/create-tailor", {
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Tailor creation failed");
    }

    return result;
}

// Create Admin
export async function createAdmin(payload: any) {
    const response = await serverFetch.post("/user/create-admin", {
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Admin creation failed");
    }

    return result;
}

// Get All Users
export async function getAllUsers(query?: string) {
    try {
        const response = await serverFetch.get(
            `/user${query ? `?${query}` : ""}`
        );

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to fetch users",
        };
    }
}

// Change User Profile Status
export async function changeUserStatus(id: string, payload: { status: string }) {
    const response = await serverFetch.patch(`/user/${id}/status`, {
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Status update failed");
    }

    return result;
}