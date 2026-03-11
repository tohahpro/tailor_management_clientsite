import { z } from "zod";

const measurementSchema = z.object({
  measurementId: z.string(),
  value: z.string().min(1, "Measurement required"),
});

const noteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty"),
});

const orderItemSchema = z.object({
  clothCategoryId: z.string().min(1, "Category required"),
  quantity: z.string().min(1, "Quantity required"),
  measurements: z.array(measurementSchema),
  notes: z.array(noteSchema).optional(),
});

export const orderFormSchema = z.object({
  orderNumber: z.string().min(1, "Order number required"),
  customerName: z.string().min(1),
  phoneNumber: z.string().min(6),
  deliveryDate: z.date(),
  totalAmount: z.string().min(1),
  paidAmount: z.string().optional(),
  order: z.array(orderItemSchema).min(1),
});