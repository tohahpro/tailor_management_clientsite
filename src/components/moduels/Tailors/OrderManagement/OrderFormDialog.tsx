/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { FormType, OrderProps } from "../../../../../types/order.interface";
import { createOrder } from "@/services/tailors/order.service";
import { toast } from "sonner";




export default function OrderFormDialog({
    categories = [],
    open,
    onClose,
    onSuccess,
}: OrderProps) {

    const form = useForm<FormType>();

    const { control, watch, setValue, handleSubmit, reset } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "order",
    });

    const {
        fields: noteFields,
        append: appendNote,
        remove: removeNote,
    } = useFieldArray({
        control,
        name: `notes`,
    });

    const watchOrder = watch("order");

    const handleClose = () => {
        reset();
        onClose();
    };
console.log(categories)
    // যখন category select হবে → measurements auto set হবে
    useEffect(() => {
        const categoryList = categories?.data || [];
        const orderList = watchOrder || []; // ✅ fallback

        orderList.forEach((item, index) => {
            const selected = categoryList.find((c: any) => c.id === item?.clothCategoryId);
            if (!selected) return;

            if (item?.measurements?.length > 0) return;

            setValue(
                `order.${index}.measurements`,
                selected.measurements.map((m: any) => ({
                    measurementId: m.id, // backend অনুযায়ী
                    value: "",
                }))
            );
        });
    }, [watchOrder, categories, setValue]);


    const onSubmit = async (data: FormType) => {
        try {
            const payload = {
                orderNumber: data.orderNumber,
                customerName: data.customerName,
                phoneNumber: data.phoneNumber,
                deliveryDate: data.deliveryDate ? new Date(data.deliveryDate).toISOString() : null,
                totalAmount: Number(data.totalAmount),
                paidAmount: Number(data.paidAmount),

                items: data.order.map((item: any) => ({
                    quantity: Number(item.quantity),
                    clothCategoryId: item.clothCategoryId,
                    measurements: item.measurements.map((m: any) => ({
                        measurementId: m.measurementId,
                        value: m.value.toString(),
                    })),
                    notes: item.notes?.map((n: any) => ({
                        content: n.content,
                    })),
                }))
            };
            console.log("Final Payload", payload);
            const result = await createOrder(payload);
            if (result.success) {
                toast.success(result.message);
                onSuccess();
                handleClose();
                reset();
            } else {
                toast.error(result.message);
            }

        } catch (error: any) {
            console.log("Error Payload", error);
        }

    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center pb-3">🧵 Create Order</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Order Number */}
                        <div>
                            <Label className="pb-1.5 font-semibold">Order Number</Label>
                            <Controller
                                control={control}
                                name="orderNumber"
                                render={({ field }) => (
                                    <Input type="number" placeholder="Enter orderNumber" {...field} />
                                )}
                            />
                        </div>

                        {/* Customer Name */}
                        <div>
                            <Label className="pb-1.5 font-semibold">Customer Name</Label>
                            <Controller
                                control={control}
                                name="customerName"
                                render={({ field }) => (
                                    <Input placeholder="Enter customer name" {...field} />
                                )}
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <Label className="pb-1.5 font-semibold">Phone Number</Label>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <Input placeholder="Enter phone number" {...field} />
                                )}
                            />
                        </div>

                        {/* Delivery Date */}
                        <div>
                            <Label className="pb-1.5 font-semibold">Delivery Date</Label>
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
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("2000-01-01")
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                        </div>

                        {/* Total Amount */}
                        <div>
                            <Label className="pb-1.5 font-semibold">Total Amount</Label>
                            <Controller
                                control={control}
                                name="totalAmount"
                                render={({ field }) => (
                                    <Input type="number" placeholder="Total amount" {...field} />
                                )}
                            />
                        </div>

                        {/* Paid Amount */}
                        <div>
                            <Label className="pb-1.5 font-semibold">Paid Amount</Label>
                            <Controller
                                control={control}
                                name="paidAmount"
                                render={({ field }) => (
                                    <Input type="number" placeholder="Paid amount" {...field} />
                                )}
                            />
                        </div>
                    </div>

                    {/* ================= ORDER ITEMS ================= */}
                    {fields.map((field, index) => {
                        const categoryList = categories?.data || [];
                        const selectedCategory = categoryList.find(
                            (c: any) => c.id === watchOrder[index]?.clothCategoryId
                        );

                        return (
                            <div
                                key={field.id}
                                className="border p-5 rounded-xl shadow-sm space-y-4 relative"
                            >
                                <p
                                    className="absolute -top-1.5 -right-1.5 bg-red-400 rounded-full p-1 cursor-pointer"
                                    onClick={() => remove(index)}
                                >
                                    <X className="w-3 h-3 text-white" />
                                </p>
                                {/* CATEGORY SELECT */}
                                <div className="flex justify-between items-end">
                                    <div className="w-full">
                                        <Label className="text-sm font-semibold pb-1.5">
                                            Cloth Category
                                        </Label>
                                        <Controller
                                            control={control}
                                            name={`order.${index}.clothCategoryId`}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Cloth Category" />
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

                                    {/* quantity  */}
                                    <div className="">
                                        <Label className="pb-1.5 font-semibold">Quantity</Label>
                                        <Controller
                                            control={control}
                                            name={`order.${index}.quantity`}
                                            render={({ field }) => (
                                                <Input type="number" className="" min={1} placeholder="Quantity" {...field} />
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* MEASUREMENTS */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {selectedCategory?.measurements?.map((m: any, mIndex: number) => (
                                        <div key={m.id}>
                                            <Label className="text-sm font-semibold">{m.name}</Label>

                                            {/* Hidden measurement ID */}
                                            <Controller
                                                control={control}
                                                name={`order.${index}.measurements.${mIndex}.id`}
                                                render={({ field }) => <input type="hidden" {...field} />}
                                            />
                                        

                                            {/* Measurement Value */}
                                            <Controller
                                                control={control}
                                                name={`order.${index}.measurements.${mIndex}.value`}
                                                render={({ field }) => (
                                                    <Input placeholder={`${m.name} size`} {...field} />
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Label>Notes</Label>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => appendNote({ content: "" })}
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Note
                                        </Button>
                                    </div>

                                    {noteFields.map((note, noteIndex) => (
                                        <div key={note.id} className="flex gap-2">
                                            <Controller
                                                control={control}
                                                name={`order.${index}.notes.${noteIndex}.content`}
                                                render={({ field }) => (
                                                    <Input placeholder="Write note..." {...field} />
                                                )}
                                            />

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeNote(noteIndex)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* ADD MORE */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            append({ clothCategoryId: "", measurements: [], quantity: 1, notes: [] })
                        }
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add More Dress
                    </Button>

                    <div className="flex justify-between">
                        <Button type="button" variant="outline" className="hover:cursor-pointer" onClick={handleClose}>
                            Cancel
                        </Button>
                        <SubmitButton className="w-fit h-8.5 px-4 rounded-md" title="Create Order" />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}