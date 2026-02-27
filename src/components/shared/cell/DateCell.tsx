"use client";

import { formatDate, formatDateTime } from "@/lib/formatters";


interface DateCellProps {
  date?: string | Date;
}

export function DateCell({ date }: DateCellProps) {
  return <span className="text-sm">{formatDateTime(date!)}</span>;
}

export function DateOnlyCell({ date }: DateCellProps) {
  return <span className="text-sm">{formatDate(date!)}</span>;
}
