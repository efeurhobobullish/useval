import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

export type AdminStats = {
  users: number;
  valentines: number;
  transactions: number;
  pendingDeposits: number;
};

export function useAdminStats() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const res = await api.get<{ stats: AdminStats }>("/v1/admin/stats");
      return res.data.stats;
    },
  });
  return { stats: data, loading: isLoading, error, refetch };
}
