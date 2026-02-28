import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

export type ValentineSender = {
  id?: string;
  _id?: string;
  fullName: string;
  email: string;
  phone?: string;
};

export type AdminValentine = {
  id?: string;
  _id?: string;
  sender: ValentineSender;
  reference: string;
  loversName: string;
  pickupLine?: string | null;
  thankYouMessage?: string | null;
  sendAirtime: boolean;
  airtimeAmount: number;
  status: string;
  expiresAt: string;
  acceptedAt?: string | null;
  createdAt: string;
};

type ValentinesResponse = {
  valentines: AdminValentine[];
  total: number;
  page: number;
  limit: number;
};

export function useAdminValentines(page = 1, limit = 20) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "valentines", page, limit],
    queryFn: async () => {
      const res = await api.get<ValentinesResponse>("/v1/admin/valentines", {
        params: { page, limit },
      });
      return res.data;
    },
  });
  return {
    valentines: data?.valentines ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? limit,
    loading: isLoading,
    error,
    refetch,
  };
}
