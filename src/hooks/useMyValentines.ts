import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Valentine = {
  id: string;
  recipientName: string;
  status: "pending" | "accepted" | "rejected" | "failed";
  sendAirtime: boolean;
  createdAt: string;
  reference: string;
};

const fetchMyValentines = async (): Promise<Valentine[]> => {
  const { data } = await axios.get("/v1/valentine/me", {
    withCredentials: true,
  });

  return data.valentines;
};

export const useMyValentines = () => {
  return useQuery({
    queryKey: ["my-valentines"],
    queryFn: fetchMyValentines,
  });
};