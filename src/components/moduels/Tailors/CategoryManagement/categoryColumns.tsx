"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/ManagementTable";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Shirt } from "lucide-react";

export interface IMeasurement {
  id: string;
  name: string;
}

export interface IClothCategory {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  measurements: IMeasurement[];
}

export const categoryColumns: Column<IClothCategory>[] = [
  {
    header: "Category Name",
    accessor: (category) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 rounded-xl shadow-md">
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
        <span className="font-medium">{category.name}</span>
      </div>
    ),
    sortKey: "name",
  },

  {
    header: "Measurements",
    accessor: (category) => {
      if (!category.measurements || category.measurements.length === 0) {
        return (
          <span className="text-xs text-gray-500">
            No measurements
          </span>
        );
      }

      return (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {category.measurements.map((m) => (
            <span
              key={m.id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              {m.name}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    header: "Created",
    accessor: (category) => (
      <DateCell date={category.createdAt} />
    ),
    sortKey: "createdAt",
  },
];
