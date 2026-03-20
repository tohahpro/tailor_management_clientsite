/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Label } from "@/components/ui/label";

const AdminFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [roleInput, setRoleInput] = useState(() => searchParams.get("role") || "");
  const [statusInput, setStatusInput] = useState(() => searchParams.get("status") || "");
  

  const debouncedRole = useDebounce(roleInput, 300);
  const debouncedStatus = useDebounce(statusInput, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Role filter
    if (debouncedRole) params.set("role", debouncedRole);
    else params.delete("role");

    // Status filter
    if (debouncedStatus) params.set("status", debouncedStatus);
    else params.delete("status");


    params.set("page", "1");

    const newQuery = params.toString();

    // Prevent unnecessary reload
    if (newQuery !== searchParams.toString()) {
      startTransition(() => {
        router.push(`?${newQuery}`);
      });
    }
  }, [debouncedRole, debouncedStatus]);

  const clearFilters = () => {
    setRoleInput("");
    setStatusInput("");

    startTransition(() => {
      router.push(window.location.pathname);
    });
  };

  const activeFiltersCount =
    (roleInput ? 1 : 0) +
    (statusInput ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search by name, email or contact..."
        />
        <RefreshButton />
      </div>

      {/* Row 2 */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Role</Label>
          <Select
            value={roleInput}
            onValueChange={(val) => setRoleInput(val === "all" ? "" : val)}
            disabled={isPending}
          >
            <SelectTrigger className="min-w-40 h-10 bg-white placeholder:font-medium">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>              
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Status</Label>
          <Select
            value={statusInput}
            onValueChange={(val) => setStatusInput(val === "all" ? "" : val)}
            disabled={isPending}
          >
            <SelectTrigger className="min-w-40 h-10 bg-white placeholder:font-medium">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="DELETED">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>       

        {/* Clear */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            disabled={isPending}
            className="h-10 px-3 mt-6 cursor-pointer"
          >
            <X className="h-4 w-4 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminFilters;