/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { updateCategory } from "@/services/tailors/category.service";
import { IEditCategoryPayload, IEditClothCategory } from "../../../../../types/category.interface";
import SubmitButton from "@/components/shared/SubmitButton";


interface IEditCategoryDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category: IEditClothCategory | null;
}

const CategoryEditFormDialog = ({
    open,
    onClose,
    onSuccess,
    category,
}: IEditCategoryDialogProps) => {
    const form = useForm<IEditCategoryPayload>({
        defaultValues: {
            name: "",
            measurements: [{ name: "" }],
        },
    });

    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { control, register, handleSubmit, reset, setValue } = form;

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "measurements",
    });

    // ✅ Load default values
    useEffect(() => {
        if (category) {
            setValue("name", category.name);
            replace(
                category.measurements.map((measurment: any) => ({
                    id: measurment.id, name: measurment.name,
                }))
            );
        }
    }, [category, setValue, replace]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: IEditCategoryPayload) => {
        if (!category) return;

        try {
            setIsLoading(true);
            const payload = {
                name: data.name,
                measurements: data.measurements.map((measurment) =>
                    measurment.id ? { id: measurment.id, name: measurment.name } : { name: measurment.name }
                ),
                file: selectedFile || undefined,
            };
            const result = await updateCategory(category.id, payload);

            if (result.success) {
                toast.success("Category updated successfully");
                setIsLoading(false)
                onSuccess();
                handleClose();
            } else {
                setIsLoading(false)
                toast.error(result.message);
                return;
            }

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };

    if (!category) return null;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <Field>
                        <FieldLabel>Category Name</FieldLabel>
                        <Input {...register("name", { required: true })} />
                    </Field>

                    {/* Image */}
                    <Field>
                        <FieldLabel>Change Image (Optional)</FieldLabel>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} // <-- set state
                        />
                    </Field>

                    {/* Measurements */}
                    <Field>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-lg">Measurements</p>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => append({ name: "" })}
                            >
                                <Plus size={18} />
                            </Button>
                        </div>

                        <div className="">
                            <div className="space-y-3 grid md:grid-cols-2 gap-2">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2 items-center">
                                        <Input
                                            {...register(`measurements.${index}.name`, {
                                                required: true,
                                            })}
                                        />

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Field>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" className="hover:cursor-pointer" onClick={handleClose}>
                            Cancel
                        </Button>
                        <SubmitButton
                            isLoading={isLoading}
                            loadingText="Updating..."
                            className="w-1/3 h-8.5 text-white text-sm font-medium rounded-md hover:cursor-pointer"
                            title="Update Category"
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryEditFormDialog;
