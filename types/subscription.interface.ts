export interface ISubscription {
  id: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "DEACTIVED" | "EXPIRED" | "LIMIT_EXPIRED" | "CANCELLED";
  planPrice: number;
  maxOrderPrice?: number | null;
  totalPrice: number;
  maxOrderLimit: number;
  createdAt: string;
  updatedAt: string;

  plan: {
    name: string;
    duration: string;
    maximumOder: number;
  };
}