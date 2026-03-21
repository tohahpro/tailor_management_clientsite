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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createPlan, updatePlan } from "@/services/admin/planManagement";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IPlan {
    id?: string;
    name: string;
    baseprice: number;
    tranding: string;
    duration: string;
    description: string;
    maximumOder: number;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    plan?: IPlan;
}

const PlanFormDialog = ({ open, onClose, onSuccess, plan }: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!plan?.id;

    const [state, formAction, isPending] = useActionState(
        isEdit ? updatePlan.bind(null, plan?.id as string) : createPlan,
        null
    );

    const prevStateRef = useRef(state);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Plan saved successfully");
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess]);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Edit Plan" : "Create Plan"}</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

                        {/* Plan Name */}
                        <Field>
                            <FieldLabel htmlFor="name">Plan Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Standard Plan"
                                required
                                defaultValue={String(state?.formData?.name || plan?.name || "")}
                            />
                        </Field>

                        {/* Base Price */}
                        <Field>
                            <FieldLabel htmlFor="baseprice">Base Price</FieldLabel>
                            <Input
                                id="baseprice"
                                name="baseprice"
                                type="number"
                                min={0}
                                placeholder="390"
                                defaultValue={
                                    state?.formData?.baseprice || plan?.baseprice || ""
                                }
                            />
                        </Field>

                        {/* Duration (Select) */}
                        <Field>
                            <FieldLabel htmlFor="duration">Duration</FieldLabel>
                            <Select
                                name="duration"
                                defaultValue={String(
                                    state?.formData?.duration ?? plan?.duration ?? "MONTHLY"
                                )}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MONTHLY">Monthly</SelectItem>
                                    <SelectItem value="YEARLY">Yearly</SelectItem>
                                    <SelectItem value="WEEKLY">Weekly</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Trending */}
                        <Field>
                            <FieldLabel htmlFor="tranding">Trending</FieldLabel>

                            <Select
                                name="tranding"
                                defaultValue={String(
                                    state?.formData?.tranding ?? plan?.tranding ?? "false"
                                )}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Max Orders */}
                        <Field>
                            <FieldLabel htmlFor="maximumOder">Max Order Limit</FieldLabel>
                            <Input
                                id="maximumOder"
                                name="maximumOder"
                                type="number"
                                min={0}
                                placeholder="1000"
                                defaultValue={
                                    state?.formData?.maximumOder || plan?.maximumOder || ""
                                }
                            />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe the plan..."
                                defaultValue={
                                    String(state?.formData?.description || plan?.description || "")
                                }
                            />
                        </Field>

                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "Saving..."
                                : isEdit
                                    ? "Update Plan"
                                    : "Create Plan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PlanFormDialog;