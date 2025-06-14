import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const itemRes = await axiosInstance.get("/items");
      return itemRes.data;
    },
  });
};
