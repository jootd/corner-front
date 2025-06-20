import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const fetchProjects = async (locale) => {
  const res = await fetch(`https://datafull.me/api/projects?locale=${locale}`);
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
};

const useProjects = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  return useQuery({
    queryKey: ["projects", currentLocale],
    queryFn: () => fetchProjects(currentLocale),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useProjects;
