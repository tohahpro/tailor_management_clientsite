"use client";


import InfoRow from "@/components/shared/InfoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import {
  Mail,
  MapPin,
  Phone,
  Store,
  User,
  Calendar,
} from "lucide-react";

interface ITailor {
  id: string;
  name?: string;
  storeName?: string;
  email: string;
  profilePhoto?: string;
  address?: string;
  contactNumber?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    role?: string;
    status?: string;
  };
}

interface Props {
  open: boolean;
  onClose: () => void;
  tailor: ITailor | null;
}

const TailorViewDetailDialog = ({ open, onClose, tailor }: Props) => {
  if (!tailor) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Tailor Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">

          {/* 🔹 Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={tailor.profilePhoto} />
              <AvatarFallback className="text-2xl">
                {getInitials(tailor.name || "T")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">
                {tailor.name || "No Name"}
              </h2>

              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {tailor.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={tailor.isDeleted ? "destructive" : "default"}
                >
                  {tailor.isDeleted ? "Inactive" : "Active"}
                </Badge>

                {tailor.user?.role && (
                  <Badge variant="secondary">{tailor.user.role}</Badge>
                )}

                {tailor.user?.status && (
                  <Badge variant="outline">{tailor.user.status}</Badge>
                )}
              </div>
            </div>
          </div>

          {/* 🔹 Information */}
          <div className="space-y-6">

            {/* Shop Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Store className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Shop Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Store className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Store Name"
                    value={tailor.storeName || "Not provided"}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Owner Name"
                    value={tailor.name || "Not provided"}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Phone"
                    value={tailor.contactNumber || "Not provided"}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Email"
                    value={tailor.email}
                  />
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Address"
                    value={tailor.address || "Not provided"}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Meta Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Other Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Created At"
                  value={formatDateTime(tailor.createdAt)}
                />
                <InfoRow
                  label="Updated At"
                  value={formatDateTime(tailor.updatedAt)}
                />
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TailorViewDetailDialog;