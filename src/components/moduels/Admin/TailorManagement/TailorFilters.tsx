"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const TailorFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Inputs
  const [statusInput, setStatusInput] = useState(
    () => searchParams.get("status") || ""
  );
  const [startDateInput, setStartDateInput] = useState(
    () => searchParams.get("startDate") || ""
  );
  const [endDateInput, setEndDateInput] = useState(
    () => searchParams.get("endDate") || ""
  );

  // Debounce
  const debouncedStatus = useDebounce(statusInput, 300);
  const debouncedStartDate = useDebounce(startDateInput, 500);
  const debouncedEndDate = useDebounce(endDateInput, 500);

  // Update URL on filter change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedStatus) params.set("status", debouncedStatus);
    else params.delete("status");

    if (debouncedStartDate) params.set("startDate", debouncedStartDate);
    else params.delete("startDate");

    if (debouncedEndDate) params.set("endDate", debouncedEndDate);
    else params.delete("endDate");

    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debouncedStatus, debouncedStartDate, debouncedEndDate, searchParams, router]);

  // Clear all filters
  const clearFilters = () => {
    setStatusInput("");
    setStartDateInput("");
    setEndDateInput("");

    startTransition(() => {
      router.push(window.location.pathname);
    });
  };

  const activeFiltersCount =
    (statusInput ? 1 : 0) +
    (startDateInput ? 1 : 0) +
    (endDateInput ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Row 1: Search + Refresh */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search by name, email, store, contact..."
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Status</Label>
          <Select
            value={statusInput}
            onValueChange={(val) => setStatusInput(val === "all" ? "" : val)}
            disabled={isPending}
          >
            <SelectTrigger className="min-w-40 h-10 bg-white placeholder:font-medium">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="DEACTIVED">Deactive</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Start Date</Label>
          <Input
            type="date"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
            disabled={isPending}
            className="h-10 w-44 bg-white shadow-sm"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">End Date</Label>
          <Input
            type="date"
            value={endDateInput}
            onChange={(e) => setEndDateInput(e.target.value)}
            disabled={isPending}
            className="h-10 w-44 bg-white shadow-sm"
          />
        </div>

        {/* Clear Filters */}
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

export default TailorFilters;