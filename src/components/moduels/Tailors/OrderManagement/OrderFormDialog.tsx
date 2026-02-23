/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const form = useForm<FormType>({
    defaultValues: {
      order: [],
    },
  });

  const { control, handleSubmit, setValue, getValues, watch, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "order",
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: FormType) => {
    try {
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
            value: m.value?.toString() || "",
          })),
          notes: item.notes?.map((n: any) => ({
            content: n.content,
          })),
        })),
      };

      console.log(payload)

    //   const result = await createOrder(payload);

    //   if (result.success) {
    //     toast.success(result.message);
    //     onSuccess();
    //     handleClose();
    //   } else {
    //     toast.error(result.message);
    //   }
    } catch (error) {
      console.log(error);
    }
  };

  const categoryList = categories?.data || [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center pb-3">
            🧵 Create Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="orderNumber"
              render={({ field }) => (
                <Input type="number" placeholder="Order Number" {...field} />
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

          {/* ORDER ITEMS */}
          {fields.map((item, index) => {
            const notes = watch(`order.${index}.notes`) || [];
            const measurements = watch(`order.${index}.measurements`) || [];

            return (
              <div
                key={item.id}
                className="border p-5 rounded-xl space-y-4 relative"
              >
                <X
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => remove(index)}
                />

                {/* CATEGORY + QUANTITY */}
                <div className="flex gap-4">
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

                  <Controller
                    control={control}
                    name={`order.${index}.quantity`}
                    render={({ field }) => (
                      <Input type="number" min={1} {...field} />
                    )}
                  />
                </div>

                {/* MEASUREMENTS */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {measurements.map((m: any, mIndex: number) => (
                    <div key={mIndex}>
                      <Label>
                        {
                          categoryList
                            .find(
                              (c: any) =>
                                c.id ===
                                getValues(
                                  `order.${index}.clothCategoryId`
                                )
                            )
                            ?.measurements.find(
                              (mm: any) =>
                                mm.id === m.measurementId
                            )?.name
                        }
                      </Label>

                      <Controller
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
                <div className="space-y-3">
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
                    <Plus className="w-4 h-4 mr-1" />
                    Add Note
                  </Button>

                  {notes.map((note: any, noteIndex: number) => (
                    <div key={noteIndex} className="flex gap-2">
                      <Controller
                        control={control}
                        name={`order.${index}.notes.${noteIndex}.content`}
                        render={({ field }) => (
                          <Input {...field} />
                        )}
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const updated = notes.filter(
                            (_: any, i: number) => i !== noteIndex
                          );
                          setValue(
                            `order.${index}.notes`,
                            updated
                          );
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
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

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <SubmitButton title="Create Order" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}