// hooks/usePartners.js
import { useQuery } from "@tanstack/react-query";

const fetchPartners = async () => {
  const res = await fetch("https://datafull.me/api/partners");
  if (!res.ok) {
    throw new Error("Failed to fetch partners");
  }
  return res.json();
};

const usePartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: fetchPartners,
    refetchOnWindowFocus: false, // optional
    staleTime: 1000 * 60 * 5,     // optional: cache for 5 min
  });
};

export default usePartners;
