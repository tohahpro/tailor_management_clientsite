"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Ruler, Shirt } from "lucide-react";
import { format } from "date-fns";
import { IClothCategory } from "../../../../../types/category.interface";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ICategoryViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    category: IClothCategory | null;
}

const CategoryViewDetailDialog = ({
    open,
    onClose,
    category,
}: ICategoryViewDetailDialogProps) => {
    if (!category) {
        return null;
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-3xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Category Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 rounded-xl">

                        {/* Image / Icon */}
                        <Avatar className="h-32 w-32 rounded-xl shadow-md">
                            {category.image ? (
                                <AvatarImage
                                    src={category.image}
                                    alt={category.name}
                                    className="object-cover"
                                />
                            ) : (
                                <AvatarFallback className="bg-white dark:bg-muted flex items-center justify-center">
                                    <Shirt className="h-10 w-10 text-purple-600" />
                                </AvatarFallback>
                            )}
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-2">
                                {category.name}
                            </h2>

                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <Badge variant="secondary" className="text-sm">
                                    <Ruler className="h-3 w-3 mr-1" />
                                    {category.measurements.length} Measurements
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Measurements Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Ruler className="h-5 w-5 text-purple-600" />
                            <h3 className="font-semibold text-lg">
                                Measurements
                            </h3>
                        </div>

                        {category.measurements.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {category.measurements.map((measurement) => (
                                    <Badge
                                        key={measurement.id}
                                        variant="outline"
                                        className="px-4 py-2 text-sm"
                                    >
                                        {measurement.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-sm">
                                No measurements available
                            </p>
                        )}
                    </div>

                    <Separator />

                    {/* Metadata Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-lg">
                                Category Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Created At</p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(new Date(category.createdAt), "PPP p")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Last Updated</p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(new Date(category.updatedAt), "PPP p")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryViewDetailDialog;
