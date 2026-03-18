/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import { updateTailorProfile } from "@/services/admin/tailor.service";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ITailor {
    id?: string;
    name?: string;
    storeName?: string;
    email: string;
    profilePhoto?: string;
    address?: string;
    contactNumber?: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    tailor?: ITailor;
}

const TailorFormDialog = ({
    open,
    onClose,
    onSuccess,
    tailor,
}: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!tailor;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const [state, formAction, pending] = useActionState(
        async (prevState: any, formData: FormData) => {
            if (!isEdit) return null;

            return await updateTailorProfile(
                tailor!.id!,
                formData
            );
        },
        null
    );

    const prevStateRef = useRef(state);

    const handleClose = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedFile(null);
        formRef.current?.reset();
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message);
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {isEdit ? "Edit Tailor" : "Add Tailor"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

                        {/* Name */}
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input
                                name="name"
                                placeholder="Tailor name"
                                defaultValue={tailor?.name || ""}
                            />
                        </Field>

                        {/* Store Name */}
                        <Field>
                            <FieldLabel>Store Name</FieldLabel>
                            <Input
                                name="storeName"
                                placeholder="Store name"
                                defaultValue={tailor?.storeName || ""}
                            />
                        </Field>

                        {/* Email */}
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                name="email"
                                type="email"
                                defaultValue={tailor?.email || ""}
                                disabled
                            />
                        </Field>

                        {/* Contact */}
                        <Field>
                            <FieldLabel>Contact Number</FieldLabel>
                            <Input
                                name="contactNumber"
                                defaultValue={tailor?.contactNumber || ""}
                            />
                        </Field>

                        {/* Address */}
                        <Field>
                            <FieldLabel>Address</FieldLabel>
                            <Input
                                name="address"
                                defaultValue={tailor?.address || ""}
                            />
                        </Field>

                        {/* Profile Photo */}
                        <Field>
                            <FieldLabel>Profile Photo</FieldLabel>

                            {(selectedFile || tailor?.profilePhoto) && (
                                <Image
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : tailor?.profilePhoto!
                                    }
                                    alt="Preview"
                                    width={60}
                                    height={60}
                                    className="rounded-full mb-2"
                                />
                            )}

                            <Input
                                ref={fileInputRef}
                                name="file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Field>
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Update Tailor"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TailorFormDialog;