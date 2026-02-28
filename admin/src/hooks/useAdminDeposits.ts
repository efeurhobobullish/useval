import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/config/api";

export type DepositUser = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  wallet: number;
};

export type Deposit = {
  _id?: string;
  id?: string;
  user: DepositUser;
  type: string;
  amount: number;
  oldBalance: number;
  newBalance: number;
  reference: string;
  status: string;
  createdAt: string;
};

export function useAdminDeposits() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "deposits"],
    queryFn: async () => {
      const res = await api.get<{ deposits: Deposit[] }>("/v1/admin/deposits");
      return res.data.deposits;
    },
  });
  return { deposits: data ?? [], loading: isLoading, error, refetch };
}

export function useApproveDeposit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (depositId: string) =>
      api.patch(`/v1/admin/deposits/${depositId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "deposits"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useRejectDeposit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (depositId: string) =>
      api.patch(`/v1/admin/deposits/${depositId}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "deposits"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
