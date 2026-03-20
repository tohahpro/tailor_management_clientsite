"use client";

import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, capitalizeText } from "@/lib/formatters";

import {
    Calendar,
    DollarSign,
    Layers,
    FileText,
    CheckCircle,
} from "lucide-react";

interface IPlan {
    id: string;
    name: string;
    baseprice: number;
    duration: string;
    isActive: boolean;
    description: string;
    maximumOder: number;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    plan: IPlan | null;
}

const PlanViewDialog = ({ open, onClose, plan }: Props) => {
    if (!plan) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="lg:min-w-3xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Plan Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">

                    {/* Header */}
                    <div className="flex flex-col gap-4 p-6 rounded-lg mb-6">
                        <h2 className="text-2xl font-bold">
                            {plan.name}
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={plan.isActive ? "default" : "destructive"}
                                className="text-sm"
                            >
                                {plan.isActive ? "ACTIVE" : "INACTIVE"}
                            </Badge>

                            <Badge variant="secondary" className="text-sm">
                                {capitalizeText(plan.duration)}
                            </Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">

                        {/* Plan Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Plan Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Plan Name" value={plan.name} />
                                <InfoRow label="Duration" value={capitalizeText(plan.duration)} />
                                <InfoRow label="Max Orders" value={plan.maximumOder} />
                            </div>
                        </div>

                        <Separator />

                        {/* Pricing */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-lg">Pricing</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Base Price" value={`৳${plan.baseprice}`} />
                            </div>
                        </div>

                        <Separator />

                        {/* Description */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="h-5 w-5 text-indigo-600" />
                                <h3 className="font-semibold text-lg">Description</h3>
                            </div>

                            <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                                {plan.description}
                            </div>
                        </div>

                        <Separator />

                        {/* Dates */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold text-lg">Timeline</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Created At"
                                    value={formatDateTime(plan.createdAt)}
                                />
                                <InfoRow
                                    label="Last Updated"
                                    value={formatDateTime(plan.updatedAt)}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Status */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="h-5 w-5 text-orange-600" />
                                <h3 className="font-semibold text-lg">Status</h3>
                            </div>

                            <div className="bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Current Status"
                                    value={plan.isActive ? "ACTIVE" : "INACTIVE"}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PlanViewDialog;