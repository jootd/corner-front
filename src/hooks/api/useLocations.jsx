// hooks/usePartners.js
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const fetchLocation = async (locale) => {
  const res = await fetch(`https://datafull.me/api/locations?locale=${locale}`);
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }
  return res.json();
};

const useLocations = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  return useQuery({
    queryKey: ["locations", currentLocale],
    queryFn: () => fetchLocation(currentLocale),
    refetchOnWindowFocus: false, // optional
    staleTime: 1000 * 60 * 5, // optional: cache for 5 min
  });
};

export default useLocations;
