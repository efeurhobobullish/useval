import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

export type Valentine = {
  id: string;
  recipientName: string;
  status: "pending" | "accepted" | "rejected" | "failed";
  sendAirtime: boolean;
  createdAt: string;
  reference: string;
};

const fetchMyValentines = async (): Promise<Valentine[]> => {
  const { data } = await api.get("/v1/valentine/me");
  return data.valentines;
};

export const useMyValentines = () => {
  return useQuery({
    queryKey: ["my-valentines"],
    queryFn: fetchMyValentines,
  });
};