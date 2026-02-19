/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { CategoryPayload, IEditCategoryPayload } from "../../../types/category.interface";


// ✅ Create Category
export async function createCategory(payload: CategoryPayload) {
    const formData = new FormData();
    const data = {
        name: payload.name,
        measurements: payload.mesurments || [],
    };
    formData.append("data", JSON.stringify(data));

    // Append the file separately
    if (payload.file) {
        formData.append("file", payload.file);
    }

    console.log(formData)
    const response = await serverFetch.post("/category", {
        body: formData,
    });

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.message || "Category creation failed");
    }
    return result;
}

// ✅ Get All Categories
export async function getAllCategories(query?: string) {
    try {
        const response = await serverFetch.get(`/category${query ? `?${query}` : ""}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to fetch categories",
        };
    }
}

// ✅ Get Category By Id
export async function getCategoryById(id: string) {
    try {
        const response = await serverFetch.get(`/category/${id}`);

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to fetch category",
        };
    }
}

// ✅ Update Category 
export async function updateCategory(categoryId: string, payload: IEditCategoryPayload) {

    const formData = new FormData();

    const data = {
        name: payload.name,
        measurements: payload.measurements || [],
    };
    formData.append("data", JSON.stringify(data));

    // Append file if provided
    if (payload.file && payload.file instanceof File) {
        formData.append("file", payload.file);
    }

    const response = await serverFetch.patch(`/category/${categoryId}`, {
        body: formData,
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Category update failed");
    }

    return result;
}

// ✅ Delete Category
export async function deleteCategory(id: string) {
    try {
        const response = await serverFetch.delete(`/category/${id}`);

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
