"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateSubscription } from "@/services/admin/subscriptionManagement";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type SubscriptionStatus =
  | "ACTIVE"
  | "DEACTIVED"
  | "EXPIRED"
  | "LIMIT_EXPIRED"
  | "CANCELLED";

type DurationType = "WEAKLY" | "MONTHLY" | "YEARLY";

interface ISubscription {
  id: string;
  status: SubscriptionStatus;
  maxOrderLimit: number;
  totalPrice: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subscription?: ISubscription;
}

const SubscriptionFormDialog = ({
  open,
  onClose,
  onSuccess,
  subscription,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!subscription;

  const [status, setStatus] = useState<SubscriptionStatus>(
    subscription?.status || "ACTIVE"
  );

  const [duration, setDuration] = useState<DurationType>("MONTHLY");

  const [state, formAction, pending] = useActionState(
    async (_prev: any, formData: FormData) => {
      if (!isEdit) return null;

      return await updateSubscription(subscription.id, formData);
    },
    null
  );

  const prevStateRef = useRef(state);

  const handleClose = () => {
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
          <DialogTitle>Update Subscription</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            
            {/* Status */}
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Input name="status" type="hidden" value={status} />
              <Select value={status} onValueChange={(v) => setStatus(v as SubscriptionStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="DEACTIVED">DEACTIVED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Duration */}
            <Field>
              <FieldLabel>Duration</FieldLabel>
              <Input name="duration" type="hidden" value={duration} />
              <Select value={duration} onValueChange={(v) => setDuration(v as DurationType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WEAKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Max Order Limit */}
            <Field>
              <FieldLabel>Max Order Limit</FieldLabel>
              <Input
                name="maxOrderLimit"
                type="number"
                defaultValue={subscription?.maxOrderLimit}
                min="0"
              />
            </Field>

            {/* Price */}
            <Field>
              <FieldLabel>Total Price</FieldLabel>
              <Input
                name="price"
                type="number"
                defaultValue={subscription?.totalPrice}
                min="0"
              />
            </Field>
          </div>

          {/* Footer */}
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
              {pending ? "Updating..." : "Update Subscription"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionFormDialog;