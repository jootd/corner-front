import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const fetchMembers = async (locale) => {
  const res = await fetch(`https://datafull.me/api/members?locale=${locale}`);
  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }
  return res.json();
};

const useTeam = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return useQuery({
    queryKey: ["team", currentLocale],
    queryFn: () => fetchMembers(currentLocale),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useTeam;
