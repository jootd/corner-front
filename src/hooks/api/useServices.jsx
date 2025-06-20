import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const fetchServices = async (locale) => {
  const res = await fetch(`https://datafull.me/api/services?locale=${locale}`);
  if (!res.ok) {
    throw new Error("Failed to fetch partners");
  }
  return res.json();
};

const useServices = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return useQuery({
    queryKey: ["services", currentLocale],
    queryFn: () => fetchServices(currentLocale),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useServices;
