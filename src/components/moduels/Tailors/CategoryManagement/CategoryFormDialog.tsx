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

import { useRef, useState } from "react";
import { toast } from "sonner";

import { useForm, useFieldArray } from "react-hook-form";
import { createCategory } from "@/services/tailors/category.service";
import SubmitButton from "@/components/shared/SubmitButton";

interface ICategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CategoryPayload {
  name: string;
  mesurments: { name: string }[];
  file?: File;
}

const CategoryFormDialog = ({
  open,
  onClose,
  onSuccess,
}: ICategoryFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // React Hook Form Setup
  const form = useForm<CategoryPayload>({
    defaultValues: {
      name: "",
      mesurments: [{ name: "" }],
    },
  });

  const { control, register, handleSubmit, reset } = form;

  // Field Array for dynamic measurements
  const { fields, append, remove } = useFieldArray({
    control,
    name: "mesurments",
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CategoryPayload) => {
    try {
      const payload: CategoryPayload = {
        name: data.name,
        mesurments: data.mesurments,
        file: selectedFile || undefined, // optional
      };
      setIsLoading(true)
      const result = await createCategory(payload);
      if (result.success) {
        setIsLoading(false)
        toast.success(result.message);
        onSuccess();
        handleClose();
        reset();
      } else {
        setIsLoading(false)
        toast.error(result.message);
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Category Name */}
          <Field>
            <FieldLabel htmlFor="name">Category Title</FieldLabel>
            <Input
              id="name"
              placeholder="Shirt"
              {...register("name", { required: true })}
            />

          </Field>

          {/* File Upload */}
          <Field>
            <FieldLabel htmlFor="file">Category Image (Optional)</FieldLabel>
            <Input
              id="file"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} // <-- set state
            />
          </Field>

          {/* Dynamic Measurement Fields */}
          <Field>
            <div className="flex justify-between items-center">
              <FieldLabel className="text-md">Measurement Fields</FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => append({ name: "" })}
              >
                <Plus size={18} />
              </Button>
            </div>

            <div className="space-y-3 mt-3">
              {fields.map((field: any, index: any) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    placeholder="measurement name"
                    {...register(`mesurments.${index}.name`, {
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
          </Field>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="hover:cursor-pointer" onClick={handleClose}>
              Cancel
            </Button>
            <SubmitButton
              isLoading={isLoading}
              loadingText="Creating..."
              className="w-2/7 h-8.5 text-white text-sm font-medium rounded-md hover:cursor-pointer"
              title="Save Category"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
