import { z } from "zod";

const measurementSchema = z.object({
  measurementId: z.string().min(1),
  value: z.string().min(1, "Measurement required"),
});

const noteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty"),
});

const orderItemSchema = z.object({
  clothCategoryId: z.string().min(1, "Category is required"),
  quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1"),
  measurements: z.array(measurementSchema),
  notes: z.array(noteSchema).optional(),
});

export const createOrderSchema = z.object({
  orderNumber: z.coerce
    .number()
    .min(1, "Order number is required"),

  customerName: z
    .string()
    .min(1, "Customer name is required"),

  phoneNumber: z
    .string()
    .min(6, "Phone number is required"),

  deliveryDate: z
    .date()
    .refine((date) => date instanceof Date, {
      message: "Delivery date is required",
    }),

  totalAmount: z.coerce
    .number()
    .min(1, "Total amount is required"),

  paidAmount: z.coerce
    .number()
    .min(0, "Paid amount cannot be negative"),

  order: z
    .array(orderItemSchema)
    .min(1, "At least one dress item is required"),
});

export type CreateOrderFormType = z.infer<typeof createOrderSchema>;