import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

export type AdminUser = {
  id?: string;
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  wallet: number;
  isVerified: boolean;
  isAdmin?: boolean;
  isBlocked?: boolean;
  createdAt: string;
};

type UsersResponse = {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
};

export function useAdminUsers(page = 1, limit = 20) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "users", page, limit],
    queryFn: async () => {
      const res = await api.get<UsersResponse>("/v1/admin/users", {
        params: { page, limit },
      });
      return res.data;
    },
  });
  return {
    users: data?.users ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? limit,
    loading: isLoading,
    error,
    refetch,
  };
}
