/* eslint-disable @typescript-eslint/no-explicit-any */

export interface OrderProps {
    categories: any;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface INoteInput {
    content: string;
}

export interface FormType {
    orderNumber?: number;
    customerName: string;
    phoneNumber: string;
    deliveryDate: Date | undefined;
    totalAmount: number;
    paidAmount: number;
    order: {
        clothCategoryId: string;
        quantity: number;
        measurements: { id: string; value: string }[];
        notes: INoteInput[];
    }[];
};

export interface IOrderMeasurement {
    measurementId: string;
    value: string | number;
}

export interface IOrderItem {
    id?: string;
    clothCategoryId: string;
    quantity?: number;
    price?: number;
    clothCategory: {
        id: string;
        name: string;
    };
    measurements?: IOrderMeasurement[];
}

export interface IOrderNote {
    id?: string;
    content: string;
}

export interface ICreateOrderPayload {
    orderNumber?: number;
    customerName: string;
    phoneNumber: string;
    deliveryDate?: Date | undefined;
    totalAmount: number;
    paidAmount?: number;
    items: IOrderItem[];
    // notes?: IOrderNote[];
}

export interface IUpdateOrderPayload extends Partial<ICreateOrderPayload> {
    status?: "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELLED";
}

export interface IOrder {
    id: string;
    orderNumber: number;
    customerName: string;
    phoneNumber: string;
    deliveryDate: string;
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    status: "PENDING" | "COMPLETED" | "CANCELLED";
    createdAt: string;
    items: IOrderItem[];
}