/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/shared/SubmitButton";
import { toast } from "sonner";
import { updateOrder } from "@/services/tailors/order.service";
import { Label } from "@/components/ui/label";

export default function OrderEditForm({ order, categories }: any) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<any>({
        defaultValues: {
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            phoneNumber: order.phoneNumber,
            deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : null,
            totalAmount: order.totalAmount,
            paidAmount: order.paidAmount,
            order: [],
        },
    });

    const { control, handleSubmit, setValue, getValues, watch, reset } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "order",
    });

    const categoryList = categories?.data || [];

    // 🔹 Prefill items
    useEffect(() => {
        if (!order?.items) return;

        const formatted = order.items.map((item: any) => ({
            clothCategoryId: item.clothCategoryId,
            quantity: item.quantity,
            measurements: item.measurements.map((m: any) => ({
                measurementId: m.measurementId,
                value: m.value,
            })),
            notes: item.notes.map((n: any) => ({
                content: n.content,
            })),
        }));

        reset({
            ...order,
            deliveryDate: order.deliveryDate
                ? new Date(order.deliveryDate)
                : null,
            order: formatted,
        });
    }, [order, reset]);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);

            const payload = {
                orderNumber: data.orderNumber,
                customerName: data.customerName,
                phoneNumber: data.phoneNumber,
                deliveryDate: data.deliveryDate
                    ? new Date(data.deliveryDate).toISOString()
                    : null,
                totalAmount: Number(data.totalAmount),
                paidAmount: Number(data.paidAmount),
                items: data.order.map((item: any) => ({
                    quantity: Number(item.quantity),
                    clothCategoryId: item.clothCategoryId,
                    measurements: item.measurements.map((m: any) => ({
                        measurementId: m.measurementId,
                        value: m.value,
                    })),
                    notes: item.notes?.map((n: any) => ({
                        content: n.content,
                    })),
                })),
            };
            console.log("Payload:", payload);

            const result = await updateOrder(order.id, payload);

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }

            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b pb-6">
                    <div>
                        <h1 className="text-3xl font-semibold flex items-center gap-2">
                            ✂️ Edit Order #{order.orderNumber}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Update customer details and garments
                        </p>
                    </div>
                </div>

                {/* TOP GRID */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* CUSTOMER CARD */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
                        <h2 className="font-medium text-lg">Customer Details</h2>

                        <div>
                            <Label className="text-sm pb-1">Customer Name</Label>
                            <Controller
                                control={control}
                                name="customerName"
                                render={({ field }) => (
                                    <Input placeholder="Enter customer name" {...field} />
                                )}
                            />
                        </div>

                        <div>
                            <Label className="text-sm pb-1">Phone Number</Label>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <Input placeholder="Enter phone number" {...field} />
                                )}
                            />
                        </div>

                        <div>
                            <Label className="text-sm pb-1">Delivery Date</Label>
                            <Controller
                                control={control}
                                name="deliveryDate"
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value
                                                    ? format(field.value, "PPP")
                                                    : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                        </div>
                    </div>

                    {/* PAYMENT CARD */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
                        <h2 className="font-medium text-lg">Payment Info</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm pb-1">Total Amount</Label>
                                <Controller
                                    control={control}
                                    name="totalAmount"
                                    render={({ field }) => (
                                        <Input type="number" placeholder="Total amount" {...field} />
                                    )}
                                />
                            </div>

                            <div>
                                <Label className="text-sm pb-1">Paid Amount</Label>
                                <Controller
                                    control={control}
                                    name="paidAmount"
                                    render={({ field }) => (
                                        <Input type="number" placeholder="Paid amount" {...field} />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-gray-50 flex justify-between text-sm">
                            <span className="font-medium">Remaining Balance</span>
                            <span className="font-semibold">
                                {Number(watch("totalAmount") || 0) -
                                    Number(watch("paidAmount") || 0)}
                            </span>
                        </div>
                    </div>

                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Garments</h2>
                        <span className="text-sm text-muted-foreground">
                            {fields.length} items
                        </span>
                    </div>

                    {fields.map((item, index) => {
                        const measurements = watch(`order.${index}.measurements`) || [];
                        const notes = watch(`order.${index}.notes`) || [];

                        return (
                            <div
                                key={item.id}
                                className="border rounded-xl overflow-hidden shadow-sm"
                            >
                                {/* CARD HEADER */}
                                <div className="flex justify-between items-center bg-[#FAF9F5] px-4 py-2">
                                    <span className="font-medium">Item #{index + 1}</span>
                                    <X
                                        className="w-4 h-4 cursor-pointer text-red-500"
                                        onClick={() => remove(index)}
                                    />
                                </div>

                                <div className="p-4 space-y-4 bg-[#FFFFFF]">
                                    {/* CATEGORY + QTY */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex-1">
                                            <Controller
                                                control={control}
                                                name={`order.${index}.clothCategoryId`}
                                                render={({ field }) => (
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(value) => {
                                                            field.onChange(value);

                                                            const selected = categoryList.find(
                                                                (c: any) => c.id === value
                                                            );

                                                            if (!selected) return;

                                                            setValue(
                                                                `order.${index}.measurements`,
                                                                selected.measurements.map((m: any) => ({
                                                                    measurementId: m.id,
                                                                    value: "",
                                                                }))
                                                            );
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-full md:w-[70%]">
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categoryList.map((cat: any) => (
                                                                <SelectItem key={cat.id} value={cat.id}>
                                                                    {cat.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Controller
                                                control={control}
                                                name={`order.${index}.quantity`}
                                                render={({ field }) => (
                                                    <Input type="number" min={1} {...field} />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* MEASUREMENTS */}
                                    {measurements.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {measurements.map((m: any, mIndex: number) => {
                                                const label =
                                                    categoryList
                                                        .find((c: any) => c.id === getValues(`order.${index}.clothCategoryId`))
                                                        ?.measurements.find((mm: any) => mm.id === m.measurementId)?.name;

                                                return (
                                                    <div key={mIndex}>
                                                        <Label className="text-sm pb-1">{label || "Measurement"}</Label>
                                                        <Controller
                                                            control={control}
                                                            name={`order.${index}.measurements.${mIndex}.value`}
                                                            render={({ field }) => (
                                                                <Input placeholder="Enter size" {...field} />
                                                            )}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* NOTES */}
                                    <div className="space-y-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => {
                                                const current =
                                                    getValues(`order.${index}.notes`) || [];
                                                setValue(`order.${index}.notes`, [
                                                    ...current,
                                                    { content: "" },
                                                ]);
                                            }}
                                        >
                                            + Add Note
                                        </Button>

                                        {notes.map((note: any, noteIndex: number) => (
                                            <div key={noteIndex} className="flex gap-2 relative">
                                                <Controller
                                                    control={control}
                                                    name={`order.${index}.notes.${noteIndex}.content`}
                                                    render={({ field }) => (
                                                        <Textarea {...field} />
                                                    )}
                                                />
                                                <X
                                                    className="absolute -right-1.5 -top-1.5 w-4 h-4 cursor-pointer text-white bg-red-500 rounded-full p-0.5 font-bold"
                                                    onClick={() => {
                                                        const updated = notes.filter(
                                                            (_: any, i: number) => i !== noteIndex
                                                        );
                                                        setValue(
                                                            `order.${index}.notes`,
                                                            updated
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ADD BUTTON */}
                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-32 shadow border-dashed border-spacing-2 border-2 rounded-lg cursor-pointer"
                    onClick={() =>
                        append({
                            clothCategoryId: "",
                            quantity: 1,
                            measurements: [],
                            notes: [],
                        })
                    }
                >
                    <Plus />
                    Add Garment
                </Button>

                {/* SUBMIT FIXED BAR */}
                <SubmitButton
                    isLoading={isLoading}
                    title="Update Order"
                    loadingText="Updating..."
                    className="w-full h-10 rounded-lg"
                />

            </form>
        </div>
    );
}