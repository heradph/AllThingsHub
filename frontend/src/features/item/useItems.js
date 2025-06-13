import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

export const useItems = () => {
  const [items, setItems] = useState([]); //menyimpan data respons GET items
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const itemResponse = await axiosInstance.get("/items");

        console.log(itemResponse.data);
        setItems(itemResponse.data);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    data: items,
    isLoading,
  };
};
