/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div className="max-w-5xl mx-auto py-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* BASIC INFO */}

                <div className="grid md:grid-cols-2 gap-4">

                    <Controller
                        control={control}
                        name="orderNumber"
                        render={({ field }) => (
                            <Input disabled type="number" placeholder="Order Number" {...field} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="customerName"
                        render={({ field }) => (
                            <Input placeholder="Customer Name" {...field} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <Input placeholder="Phone Number" {...field} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="deliveryDate"
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value
                                            ? format(field.value, "PPP")
                                            : "Pick delivery date"}
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

                    <Controller
                        control={control}
                        name="totalAmount"
                        render={({ field }) => (
                            <Input type="number" placeholder="Total Amount" {...field} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="paidAmount"
                        render={({ field }) => (
                            <Input type="number" placeholder="Paid Amount" {...field} />
                        )}
                    />

                </div>

                {/* ITEMS */}

                {fields.map((item, index) => {
                    const notes = watch(`order.${index}.notes`) || [];
                    const measurements = watch(`order.${index}.measurements`) || [];

                    return (
                        <div key={item.id} className="border p-5 rounded-xl space-y-4 relative">

                            <X
                                className="absolute -top-1 -right-1 cursor-pointer w-4 h-4 bg-red-400 rounded-full p-0.5 text-white"
                                onClick={() => remove(index)}
                            />

                            {/* CATEGORY */}

                            <div className="flex gap-4">

                                <div className="flex-1">
                                    <Label className="pb-1">Cloth Category</Label>
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
                                                <SelectTrigger>
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

                                <div>
                                    <Label className="pb-1">Quantity</Label>

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

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                                {measurements.map((m: any, mIndex: number) => (
                                    <div key={mIndex}>
                                        <Label className="pb-1.5">
                                            {
                                                categoryList
                                                    .find((c: any) => c.id === getValues(`order.${index}.clothCategoryId`))
                                                    ?.measurements.find((mm: any) => mm.id === m.measurementId)?.name
                                            }
                                        </Label>
                                        <Controller
                                            key={mIndex}
                                            control={control}
                                            name={`order.${index}.measurements.${mIndex}.value`}
                                            render={({ field }) => (
                                                <Input placeholder="Size" {...field} />
                                            )}
                                        />
                                    </div>

                                ))}

                            </div>

                            {/* NOTES */}

                            <div className="space-y-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    className="bg-[#8b43e3] hover:bg-[#7437be] text-white"
                                    onClick={() => {
                                        const current = getValues(`order.${index}.notes`) || [];
                                        setValue(`order.${index}.notes`, [...current, { content: "" }]);
                                    }}
                                >
                                    <Plus className="w-4 h-4 mr-1" /> Add Note
                                </Button>

                                {notes.map((note: any, noteIndex: number) => (
                                    <div key={noteIndex} className="relative">
                                        <button
                                            type="button"
                                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center"
                                            onClick={() => {
                                                const updated = notes.filter((_: any, i: number) => i !== noteIndex);
                                                setValue(`order.${index}.notes`, updated);
                                            }}
                                        >
                                            <X className="w-4 h-4 text-white p-0.5" />
                                        </button>
                                        <Controller
                                            control={control}
                                            name={`order.${index}.notes.${noteIndex}.content`}
                                            render={({ field }) => (
                                                <Textarea placeholder="Write your note..." {...field} />
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* ADD ITEM */}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        append({
                            clothCategoryId: "",
                            quantity: 1,
                            measurements: [],
                            notes: [],
                        })
                    }
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add More Dress
                </Button>

                <SubmitButton
                    className="w-full h-9 rounded-lg"
                    isLoading={isLoading}
                    title="Update Order"
                    loadingText="Updating..."
                />

            </form>
        </div>
    );
}