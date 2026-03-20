/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

// Get All Tailors
export async function getAllTailors(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tailors${queryString ? `?${queryString}` : ""}`);

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to fetch tailors",
        };
    }
}


// Update Tailor Profile
export async function updateTailorProfile(
    id: string,
    formData: FormData
) {
    try {
        const payload = {
            name: formData.get("name"),
            storeName: formData.get("storeName"),
            contactNumber: formData.get("contactNumber"),
            address: formData.get("address"),
        };

        const response = await serverFetch.patch(`/tailors/${id}`, {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message,
                formData: Object.fromEntries(formData),
            };
        }

        return {
            success: true,
            message: result.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Update failed",
            formData: Object.fromEntries(formData),
        };
    }
}